"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(242,111,33,0.32),transparent_28%),radial-gradient(circle_at_15%_80%,rgba(45,120,140,0.24),transparent_32%)]" />
      <div className="relative mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-200">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{description}</p>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#f26f21]">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}

export function CtaBand({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  const { t } = useI18n();
  const displayTitle = title ?? t.common.readyTitle;
  const displayDescription = description ?? t.common.readyDescription;

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/15 sm:p-10 lg:flex lg:items-center lg:justify-between">
        <div>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight">{displayTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">{displayDescription}</p>
        </div>
        <Link
          href="/sourcing-request"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-6 bg-[#f26f21] px-5 text-white hover:bg-[#d95e17] lg:mt-0"
          )}
        >
          {t.common.submitSourcingRequest}
          <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
