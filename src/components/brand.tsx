"use client";

import Link from "next/link";

import { useI18n } from "@/lib/i18n";

export function Brand() {
  const { t } = useI18n();

  return (
    <Link href="/" className="flex items-center gap-3" aria-label="SodaPost home">
      <span className="flex size-10 items-center justify-center rounded-lg bg-[#f26f21] text-base font-black text-white shadow-lg shadow-orange-500/20">
        SP
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-semibold text-slate-950">SodaPost</span>
        <span className="text-xs font-medium text-slate-500">{t.brandSubtitle}</span>
      </span>
    </Link>
  );
}
