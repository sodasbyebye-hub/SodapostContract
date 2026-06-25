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
    <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(242,111,33,0.28),transparent_26rem),radial-gradient(circle_at_88%_74%,rgba(20,132,145,0.2),transparent_30rem)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-10 size-64 rounded-full border border-orange-300/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300" />
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-200">
            <Icon className="size-3.5" />
            {eyebrow}
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{description}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {highlights.map((highlight) => (
              <span
                key={highlight}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-medium text-slate-200"
              >
                <Check className="size-3.5 text-orange-300" />
                {highlight}
              </span>
            ))}
          </div>

          <Link
            href={primaryHref}
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 bg-[#f26f21] px-5 text-white shadow-lg shadow-orange-950/30 hover:bg-[#d95e17]"
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
          className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.07] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-300/80 to-transparent" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">{panelLabel}</p>
          <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.025em] text-white sm:text-3xl">
            {panelTitle}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">{panelDescription}</p>
          <div className="mt-7 space-y-3">
            {panelItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.28 + index * 0.09 }}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/35 p-4"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-300/10 text-xs font-semibold text-orange-200">
                  0{index + 1}
                </span>
                <p className="text-sm font-medium leading-6 text-slate-100">{item}</p>
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
          ? "border-white/10 bg-white/[0.055] text-white hover:border-orange-300/35 hover:bg-white/[0.08]"
          : "border-slate-200 bg-white/80 shadow-sm shadow-slate-950/5 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10"
      )}
    >
      {index !== undefined ? (
        <span className={cn("text-xs font-semibold tracking-[0.18em]", dark ? "text-orange-300" : "text-[#f26f21]")}>
          0{index + 1}
        </span>
      ) : null}
      <h3 className={cn("mt-5 text-lg font-semibold leading-snug", dark ? "text-white" : "text-slate-950")}>
        {title}
      </h3>
      <p className={cn("mt-3 text-sm leading-7", dark ? "text-slate-300" : "text-slate-600")}>{description}</p>
      {meta ? (
        <p className={cn("mt-5 border-t pt-4 text-xs font-semibold", dark ? "border-white/10 text-orange-200" : "border-slate-200 text-[#d95e17]")}>
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
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/15 sm:p-10 lg:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_20%,rgba(242,111,33,0.2),transparent_24rem)]" />
        <div className="relative">
          <EditorialHeading title={title} description={description} />
          <div className="mt-10">{children}</div>
        </div>
      </div>
    </section>
  );
}
