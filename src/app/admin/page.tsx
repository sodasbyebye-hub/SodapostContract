"use client";

import { AdminLeadTable } from "@/components/admin-lead-table";
import { PageHeader } from "@/components/section";
import { useI18n } from "@/lib/i18n";

export default function AdminPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHeader
        eyebrow={t.footer.adminDemo}
        title={t.pages.adminTitle}
        description={t.pages.adminDescription}
      />
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AdminLeadTable />
        </div>
      </section>
    </>
  );
}
