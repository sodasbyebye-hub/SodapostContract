import { redirect } from "next/navigation";

import { AdminLoginForm, AdminLoginHeader } from "@/components/admin-login-form";
import { hasAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await hasAdminSession()) {
    redirect("/admin");
  }

  return (
    <>
      <AdminLoginHeader />
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <AdminLoginForm />
      </section>
    </>
  );
}
