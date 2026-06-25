"use client";

import Image from "next/image";
import { Globe2 } from "lucide-react";

import {
  localeFlags,
  localeLabels,
  locales,
  type Locale,
  useI18n,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className={cn("flex items-center gap-2 text-sm text-slate-600", compact && "w-full")}>
      <Globe2 className="size-4 text-[#f26f21]" />
      <span className="sr-only">{t.nav.language}</span>
      <Select
        value={locale}
        onValueChange={(value) => value && setLocale(value as Locale)}
      >
        <SelectTrigger
          aria-label={t.nav.language}
          className={cn(
            "h-10 border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:border-orange-300 focus-visible:ring-orange-200/60",
            compact ? "w-full" : "w-44"
          )}
        >
          <FlagLabel locale={locale} />
        </SelectTrigger>
        <SelectContent align="end" className="max-h-80 min-w-52 p-1">
          {locales.map((item) => (
            <SelectItem key={item} value={item} className="py-2">
              <FlagLabel locale={item} />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function FlagLabel({ locale }: { locale: Locale }) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="relative h-4 w-6 shrink-0 overflow-hidden rounded-[3px] bg-white shadow-sm ring-1 ring-slate-950/15">
        <Image
          src={localeFlags[locale]}
          alt=""
          fill
          sizes="24px"
          className="object-cover"
        />
      </span>
      <span className="truncate">{localeLabels[locale]}</span>
    </span>
  );
}
