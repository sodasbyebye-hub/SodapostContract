"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MarketingHero({
  eyebrow,
  title,
  description,
  icon: Icon,
  highlights,
  panelLabel,
  panelTitle,
  panelDescription,
  panelItems,
  primaryLabel,
  primaryHref = "/sourcing-request",
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
  panelLabel: string;
  panelTitle: string;
  panelDescription: string;
  panelItems: string[];
  primaryLabel: string;
  primaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#fbfaf7] px-4 py-10 text-slate-950 sm:px-6 lg:px-8 lg:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(242,111,33,0.16),transparent_24rem),radial-gradient(circle_at_88%_34%,rgba(148,163,184,0.22),transparent_28rem)]" />
      <div className="pointer-events-none absolute inset-0 opacity-55 [background-image:linear-gradient(rgba(15,23,42,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.055)_1px,transparent_1px)] [background-size:72px_72px]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-8 size-48 rounded-full border border-orange-300/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f26f21]" />
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#d95e17] shadow-sm backdrop-blur">
            <Icon className="size-3.5" />
            {eyebrow}
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-[2.85rem]">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {highlights.map((highlight) => (
              <span
                key={highlight}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm"
              >
                <Check className="size-3.5 text-[#f26f21]" />
                {highlight}
              </span>
            ))}
          </div>

          <Link
            href={primaryHref}
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-5 bg-[#f26f21] px-5 text-white shadow-lg shadow-orange-500/20 hover:bg-[#d95e17]"
            )}
          >
            {primaryLabel}
            <ArrowRight />
          </Link>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[1.5rem] border border-white/85 bg-white/78 p-4 shadow-2xl shadow-slate-950/10 ring-1 ring-slate-950/5 backdrop-blur-xl sm:p-5"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f26f21]/70 to-transparent" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d95e17]">{panelLabel}</p>
          <h2 className="mt-3 text-lg font-semibold leading-tight tracking-[-0.025em] text-slate-950 sm:text-xl">
            {panelTitle}
          </h2>
          {panelDescription ? <p className="mt-3 text-sm leading-7 text-slate-600">{panelDescription}</p> : null}
          <div className="mt-4 space-y-2.5">
            {panelItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.28 + index * 0.09 }}
                className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/80 p-2.5 shadow-sm transition hover:border-orange-200 hover:bg-orange-50/60"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-xs font-semibold text-[#d95e17]">
                  0{index + 1}
                </span>
                <p className="text-sm font-medium leading-6 text-slate-700">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

export function EditorialHeading({
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
    <Reveal className={cn("max-w-3xl", centered && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f26f21]">{eyebrow}</p>
      ) : null}
      <h2 className="mt-4 text-3xl font-semibold leading-[1.12] tracking-[-0.035em] text-slate-950 sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-5 text-base leading-8 text-slate-600">{description}</p> : null}
    </Reveal>
  );
}

export function InsightCard({
  index,
  title,
  description,
  meta,
  dark = false,
}: {
  index?: number;
  title: string;
  description: string;
  meta?: string;
  dark?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border p-6 transition duration-300 hover:-translate-y-1",
        dark
          ? "border-white/80 bg-white/75 text-slate-950 shadow-sm shadow-slate-950/5 hover:border-orange-200 hover:bg-white/90 hover:shadow-xl hover:shadow-orange-500/10"
          : "border-slate-200 bg-white/80 shadow-sm shadow-slate-950/5 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10"
      )}
    >
      {index !== undefined ? (
        <span className={cn("text-xs font-semibold tracking-[0.18em]", dark ? "text-[#d95e17]" : "text-[#f26f21]")}>
          0{index + 1}
        </span>
      ) : null}
      <h3 className="mt-5 text-lg font-semibold leading-snug text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      {meta ? (
        <p className="mt-5 border-t border-slate-200 pt-4 text-xs font-semibold text-[#d95e17]">
          {meta}
        </p>
      ) : null}
      <div className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#f26f21] to-orange-200 transition-transform duration-300 group-hover:scale-x-100" />
    </article>
  );
}

export function DarkEditorialBand({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/80 bg-[#fbfaf7] p-6 text-slate-950 shadow-2xl shadow-slate-950/8 ring-1 ring-slate-950/5 sm:p-10 lg:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_20%,rgba(242,111,33,0.14),transparent_24rem),radial-gradient(circle_at_8%_80%,rgba(148,163,184,0.2),transparent_24rem)]" />
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="relative">
          <EditorialHeading title={title} description={description} />
          <div className="mt-10">{children}</div>
        </div>
      </div>
    </section>
  );
}
