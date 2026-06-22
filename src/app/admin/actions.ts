"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/lib/admin-auth";
import { isStoredSourcingRequestId, type LeadStatus } from "@/lib/leads";
import { statusOptions } from "@/lib/site-data";
import {
  updateSourcingRequestNotes,
  updateSourcingRequestStatus,
} from "@/lib/sourcing-requests";

export type AdminMutationResult = { ok: true } | { ok: false };

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
