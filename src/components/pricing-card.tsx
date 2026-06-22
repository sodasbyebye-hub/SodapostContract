"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import type { PricingPlan } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  const { t } = useI18n();

  return (
    <article
      className={cn(
        "flex min-h-full flex-col rounded-lg border bg-white/78 p-6 shadow-sm shadow-slate-950/5 backdrop-blur-xl",
        plan.highlighted ? "border-orange-200 shadow-xl shadow-orange-500/10" : "border-slate-200"
      )}
    >
      {plan.highlighted ? (
        <span className="mb-4 w-fit rounded-md bg-orange-100 px-3 py-1 text-xs font-semibold text-[#d95e17]">
          {t.common.popular}
        </span>
      ) : null}
      <h3 className="text-lg font-semibold text-slate-950">{plan.name}</h3>
      <p className="mt-3 text-3xl font-semibold text-slate-950">{plan.price}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{plan.description}</p>
      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm text-slate-700">
            <Check className="mt-0.5 size-4 text-[#f26f21]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/sourcing-request"
        className={cn(
          buttonVariants({ size: "lg", variant: plan.highlighted ? "default" : "outline" }),
          "mt-7",
          plan.highlighted && "bg-[#f26f21] text-white hover:bg-[#d95e17]"
        )}
      >
        {t.common.startOption}
      </Link>
    </article>
  );
}
