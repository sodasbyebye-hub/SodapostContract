import { redirect } from "next/navigation";

import { AdminDashboardHeader } from "@/components/admin-dashboard-header";
import { AdminLeadTable } from "@/components/admin-lead-table";
import { hasAdminSession } from "@/lib/admin-auth";
import { listSourcingRequests } from "@/lib/sourcing-requests";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await hasAdminSession())) {
    redirect("/admin/login");
  }

  const leads = await listSourcingRequests();

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AdminDashboardHeader />
        <AdminLeadTable initialLeads={leads} />
      </div>
    </section>
  );
}
