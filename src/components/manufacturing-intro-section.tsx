"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessagesSquare,
  Route,
  SearchCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const advantageImages = [
  "/images/china-manufacturing-automation.png",
  "/images/china-manufacturing-quality.png",
  "/images/china-trade-logistics.png",
] as const;

const agencyVisualImages = [
  "/images/sodapost-source-value.webp",
  "/images/sodapost-fast-sampling.webp",
  "/images/sodapost-logistics-support.webp",
] as const;

const reasonIcons = [SearchCheck, MessagesSquare, Route, ShieldCheck] as const;

export function ManufacturingIntroSection() {
  const { t } = useI18n();
  const content = t.manufacturingIntro;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [agencyVisualActive, setAgencyVisualActive] = useState(0);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % content.advantages.length),
      5500
    );
    return () => window.clearInterval(timer);
  }, [content.advantages.length, paused]);

  const selectSlide = (index: number) => {
    setActive(index);
    setPaused(true);
  };

  const moveSlide = (direction: number) => {
    setActive(
      (current) =>
        (current + direction + content.advantages.length) % content.advantages.length
    );
    setPaused(true);
  };

  return (
    <section className="relative overflow-hidden bg-[#f3f0ea] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] [background-size:80px_80px]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid overflow-hidden rounded-[2rem] border border-white/70 bg-white/72 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:grid-cols-[0.72fr_1.28fr]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex flex-col p-7 sm:p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f26f21]">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-4xl">
              {content.title}
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              {content.description}
            </p>

            <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
              {content.advantages.map((advantage, index) => {
                const isActive = active === index;
                return (
                  <button
                    key={advantage.title}
                    type="button"
                    onClick={() => selectSlide(index)}
                    aria-pressed={isActive}
                    className="group grid w-full grid-cols-[2.25rem_1fr] items-center gap-3 py-4 text-left"
                  >
                    <span
                      className={`text-xs font-semibold transition ${
                        isActive ? "text-[#f26f21]" : "text-slate-400"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span
                      className={`text-sm font-semibold transition ${
                        isActive ? "translate-x-1 text-slate-950" : "text-slate-500 group-hover:text-slate-800"
                      }`}
                    >
                      {advantage.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-auto flex items-center justify-between pt-7">
              <span className="text-xs font-medium tracking-[0.12em] text-slate-400">
                0{active + 1} / 0{content.advantages.length}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => moveSlide(-1)}
                  aria-label="Previous slide"
                  className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-[#f26f21] hover:text-[#f26f21]"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveSlide(1)}
                  aria-label="Next slide"
                  className="flex size-10 items-center justify-center rounded-full bg-slate-950 text-white transition hover:bg-[#f26f21]"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative min-h-[25rem] overflow-hidden bg-slate-900 sm:min-h-[31rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.04, x: 18 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.985, x: -12 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={advantageImages[active]}
                  alt={content.advantages[active].title}
                  fill
                  sizes="(min-width: 1024px) 62vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/5 to-transparent" />
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.55 }}
                  className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">
                    / 0{active + 1}
                  </p>
                  <h3 className="mt-3 max-w-2xl text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                    {content.advantages[active].title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate-200">
                    {content.advantages[active].description}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {!paused ? (
              <motion.div
                key={active}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5.5, ease: "linear" }}
                className="absolute inset-x-0 bottom-0 z-10 h-1 origin-left bg-[#f26f21]"
              />
            ) : null}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="relative mt-10 overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 text-white shadow-[0_30px_80px_rgba(15,23,42,0.22)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(242,111,33,0.24),transparent_28rem),radial-gradient(circle_at_88%_84%,rgba(20,132,145,0.16),transparent_24rem)]" />
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />

          <div className="relative grid lg:grid-cols-[0.92fr_1.08fr]">
            <div className="border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">
                <Sparkles className="size-3.5" />
                {content.agencyEyebrow}
              </div>
              <h3 className="mt-6 max-w-xl text-3xl font-semibold leading-[1.12] tracking-[-0.035em] sm:text-4xl">
                {content.agencyTitle}
              </h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                {content.agencyDescription}
              </p>

              <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">
                <p className="text-sm font-semibold text-white">{content.agencyCommitment.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {content.agencyCommitment.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {content.agencySignals.map((signal) => (
                  <span
                    key={signal}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-200"
                  >
                    <Check className="size-3.5 text-orange-300" />
                    {signal}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/sourcing-request"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-[#f26f21] px-5 text-white shadow-lg shadow-orange-950/30 hover:bg-[#d95e17]"
                  )}
                >
                  {content.agencyCta}
                  <ArrowRight />
                </Link>
                <Link
                  href="/how-it-works"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-white/15 bg-white/[0.04] px-5 text-white hover:bg-white/10 hover:text-white"
                  )}
                >
                  {content.agencySecondaryCta}
                </Link>
              </div>
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-7 lg:p-9">
              {content.reasons.map((reason, index) => {
                const Icon = reasonIcons[index] ?? ShieldCheck;

                return (
                  <motion.article
                    key={reason.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.16 + index * 0.07 }}
                    className="group relative min-h-56 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-300/35 hover:bg-white/[0.085]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex size-11 items-center justify-center rounded-xl border border-orange-300/20 bg-orange-300/10 text-orange-200">
                        <Icon className="size-5" />
                      </span>
                      <span className="text-xs font-semibold tracking-[0.18em] text-slate-500">
                        0{index + 1}
                      </span>
                    </div>
                    <h4 className="mt-7 text-lg font-semibold leading-snug tracking-[-0.02em] text-white">
                      {reason.title}
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {reason.description}
                    </p>
                    <div className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#f26f21] to-orange-200 transition-transform duration-300 group-hover:scale-x-100" />
                  </motion.article>
                );
              })}
            </div>
          </div>

          <div className="relative border-t border-white/10 p-5 sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">
                  {content.agencyVisualEyebrow}
                </p>
                <h4 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-white sm:text-3xl">
                  {content.agencyVisualTitle}
                </h4>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {content.agencyVisualDescription}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2" aria-label={content.agencyVisualEyebrow}>
                {content.agencyVisuals.map((visual, index) => {
                  const isActive = agencyVisualActive === index;

                  return (
                    <button
                      key={visual.title}
                      type="button"
                      onClick={() => setAgencyVisualActive(index)}
                      aria-pressed={isActive}
                      className={cn(
                        "min-w-0 rounded-xl border px-3 py-3 text-left transition sm:min-w-36",
                        isActive
                          ? "border-orange-300/50 bg-orange-300/12 text-white"
                          : "border-white/10 bg-white/[0.04] text-slate-400 hover:border-white/20 hover:text-white"
                      )}
                    >
                      <span className="block text-[10px] font-semibold tracking-[0.18em] text-orange-300">
                        0{index + 1}
                      </span>
                      <span className="mt-1 block truncate text-xs font-semibold sm:text-sm">
                        {visual.shortTitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
              <div className="relative aspect-[1672/941] overflow-hidden bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={agencyVisualActive}
                    initial={{ opacity: 0, scale: 1.015 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={agencyVisualImages[agencyVisualActive]}
                      alt={content.agencyVisuals[agencyVisualActive].title}
                      fill
                      sizes="(min-width: 1280px) 1180px, (min-width: 640px) 90vw, 100vw"
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="grid gap-4 bg-slate-900 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
                <div>
                  <h5 className="text-base font-semibold text-white sm:text-lg">
                    {content.agencyVisuals[agencyVisualActive].title}
                  </h5>
                  <p className="mt-1.5 max-w-3xl text-sm leading-6 text-slate-300">
                    {content.agencyVisuals[agencyVisualActive].description}
                  </p>
                </div>
                <span className="text-xs font-semibold tracking-[0.18em] text-orange-300">
                  0{agencyVisualActive + 1} / 0{content.agencyVisuals.length}
                </span>
              </div>
            </div>

            <p className="mt-4 flex gap-2 text-xs leading-5 text-slate-400">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-orange-300" />
              {content.agencyVisualNote}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
