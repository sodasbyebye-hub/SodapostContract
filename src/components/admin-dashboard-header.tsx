"use client";

import { LogOut } from "lucide-react";

import { logoutAdmin } from "@/app/admin/login/actions";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export function AdminDashboardHeader() {
  const { t } = useI18n();

  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f26f21]">SodaPost Admin</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{t.pages.adminTitle}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{t.pages.adminDescription}</p>
      </div>
      <form action={logoutAdmin}>
        <Button type="submit" variant="outline">
          <LogOut />
          {t.admin.logout}
        </Button>
      </form>
    </div>
  );
}
