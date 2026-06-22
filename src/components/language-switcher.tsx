"use client";

import { Globe2 } from "lucide-react";

import { localeLabels, locales, type Locale, useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <label className={cn("flex items-center gap-2 text-sm text-slate-600", compact && "w-full")}>
      <Globe2 className="size-4 text-[#f26f21]" />
      <span className="sr-only">{t.nav.language}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        className={cn(
          "h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-orange-300 focus:ring-3 focus:ring-orange-200/60",
          compact ? "w-full" : "w-38"
        )}
        aria-label={t.nav.language}
      >
        {locales.map((item) => (
          <option key={item} value={item}>
            {localeLabels[item]}
          </option>
        ))}
      </select>
    </label>
  );
}
