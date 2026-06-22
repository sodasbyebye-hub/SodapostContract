"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="absolute inset-0 -z-10 animated-hero-bg" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <Reveal>
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-orange-200 bg-white/70 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-xl">
              <span className="size-2 rounded-full bg-[#f26f21]" />
              {t.hero.eyebrow}
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-slate-950 sm:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sourcing-request"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 bg-[#f26f21] px-5 text-white hover:bg-[#d95e17]"
              )}
            >
                {t.common.submitSourcingRequest}
                <ArrowRight />
              </Link>
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-12 bg-white/75 px-5")}
              >
                {t.common.getQuote}
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.trustHighlights.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="size-5 text-[#f26f21]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-5 rounded-lg bg-orange-200/30 blur-3xl" />
            <figure className="relative overflow-hidden rounded-xl border border-white/80 bg-white/85 p-3 shadow-2xl shadow-slate-950/12 backdrop-blur-xl">
              <Image
                src="/images/sodapost-brand-hero-16x9.png"
                alt="SodaPost orange brand image"
                width={1672}
                height={940}
                priority
                className="aspect-video w-full rounded-lg object-cover"
              />
              <figcaption className="px-3 pb-2 pt-4 text-center text-sm font-medium leading-6 text-slate-600">
                {t.pages.heroImageCaption}
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
      <div className="mx-auto mt-14 grid max-w-7xl gap-4 sm:grid-cols-3">
        {t.metrics.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 0.08}>
            <div className="rounded-lg border border-white/70 bg-white/68 p-5 shadow-sm shadow-slate-950/5 backdrop-blur-xl">
              <p className="text-3xl font-semibold text-slate-950">{metric.value}</p>
              <p className="mt-2 text-sm text-slate-600">{metric.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
