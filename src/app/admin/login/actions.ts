"use server";

import { redirect } from "next/navigation";

import {
  clearAdminSession,
  createAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export type LoginState = { error: boolean };

export async function loginAdmin(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  try {
    const password = String(formData.get("password") ?? "");
    if (!password || !verifyAdminPassword(password)) {
      return { error: true };
    }

    await createAdminSession();
  } catch (error) {
    console.error("Unable to create admin session:", error);
    return { error: true };
  }

  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}
