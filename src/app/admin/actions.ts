"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/lib/admin-auth";
import { isStoredSourcingRequestId, type LeadStatus } from "@/lib/leads";
import { statusOptions } from "@/lib/site-data";
import {
  deleteSourcingRequests,
  updateSourcingRequestNotes,
  updateSourcingRequestStatus,
} from "@/lib/sourcing-requests";

export type AdminMutationResult = { ok: true } | { ok: false };
export type AdminDeleteResult = { ok: true; deletedIds: string[] } | { ok: false };

export async function updateLeadStatus(id: string, status: string): Promise<AdminMutationResult> {
  try {
    await requireAdminSession();
    if (!isStoredSourcingRequestId(id) || !statusOptions.includes(status as LeadStatus)) {
      return { ok: false };
    }

    const lead = await updateSourcingRequestStatus(id, status as LeadStatus);
    if (!lead) return { ok: false };
    revalidatePath("/admin");
    return { ok: true };
  } catch (error) {
    console.error("Unable to update sourcing request status:", error);
    return { ok: false };
  }
}

export async function updateLeadNotes(id: string, notes: string): Promise<AdminMutationResult> {
  try {
    await requireAdminSession();
    if (!isStoredSourcingRequestId(id) || typeof notes !== "string" || notes.length > 10_000) {
      return { ok: false };
    }

    const lead = await updateSourcingRequestNotes(id, notes);
    if (!lead) return { ok: false };
    revalidatePath("/admin");
    return { ok: true };
  } catch (error) {
    console.error("Unable to update sourcing request notes:", error);
    return { ok: false };
  }
}

export async function deleteLeads(ids: string[]): Promise<AdminDeleteResult> {
  try {
    await requireAdminSession();
    if (!Array.isArray(ids) || ids.length === 0 || ids.length > 500) {
      return { ok: false };
    }

    const uniqueIds = [...new Set(ids)];
    if (!uniqueIds.every(isStoredSourcingRequestId)) {
      return { ok: false };
    }

    const deletedIds = await deleteSourcingRequests(uniqueIds);
    revalidatePath("/admin");
    return { ok: true, deletedIds };
  } catch (error) {
    console.error("Unable to delete sourcing requests:", error);
    return { ok: false };
  }
}
