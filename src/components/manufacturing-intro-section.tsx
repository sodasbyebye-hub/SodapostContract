"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { useI18n } from "@/lib/i18n";

const advantageImages = [
  "/images/china-manufacturing-automation.png",
  "/images/china-manufacturing-quality.png",
  "/images/china-trade-logistics.png",
] as const;

export function ManufacturingIntroSection() {
  const { t } = useI18n();
  const content = t.manufacturingIntro;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

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
          className="mt-8 grid overflow-hidden rounded-2xl bg-slate-950 text-white lg:grid-cols-[0.85fr_1.15fr]"
        >
          <div className="border-b border-white/10 p-7 sm:p-9 lg:border-b-0 lg:border-r">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">
              {content.agencyEyebrow}
            </p>
            <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.025em] sm:text-3xl">
              {content.agencyTitle}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {content.agencyDescription}
            </p>
          </div>
          <div className="grid sm:grid-cols-2">
            {content.reasons.map((reason, index) => (
              <motion.div
                key={reason}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="flex gap-3 border-white/10 p-6 sm:border-l sm:[&:nth-child(n+3)]:border-t"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-orange-400/50 text-orange-300">
                  <Check className="size-3" />
                </span>
                <p className="text-sm font-medium leading-6 text-slate-100">{reason}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
