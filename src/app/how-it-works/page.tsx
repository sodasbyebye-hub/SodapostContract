"use client";

import { Route } from "lucide-react";

import {
  DarkEditorialBand,
  EditorialHeading,
  InsightCard,
  MarketingHero,
} from "@/components/marketing-page";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/section";
import { getInnerPageContent } from "@/lib/inner-page-content";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function HowItWorksPage() {
  const { locale, t } = useI18n();
  const content = getInnerPageContent(locale).how;

  return (
    <>
      <MarketingHero
        eyebrow={t.common.howItWorks}
        title={t.pages.howTitle}
        description={t.pages.howDescription}
        icon={Route}
        highlights={content.hero.highlights}
        panelLabel={content.hero.panelLabel}
        panelTitle={content.hero.panelTitle}
        panelDescription={content.hero.panelDescription}
        panelItems={content.hero.panelItems}
        primaryLabel={t.common.submitSourcingRequest}
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EditorialHeading
            eyebrow={content.sectionEyebrow}
            title={content.sectionTitle}
            description={content.sectionDescription}
          />
          <div className="relative mt-12">
            <div className="absolute bottom-8 left-[1.45rem] top-8 hidden w-px bg-gradient-to-b from-[#f26f21] via-orange-200 to-slate-200 sm:block lg:left-1/2" />
            <div className="space-y-6 lg:space-y-10">
              {content.steps.map((step, index) => (
                <Reveal
                  key={step.title}
                  delay={index * 0.05}
                  className="relative grid gap-5 lg:grid-cols-2 lg:gap-16"
                >
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <article className="relative rounded-2xl border border-slate-200 bg-white/82 p-6 shadow-sm shadow-slate-950/5 sm:p-8">
                      <span
                        className={cn(
                          "absolute -left-3 top-7 flex size-10 items-center justify-center rounded-xl bg-[#f26f21] text-sm font-semibold text-white shadow-lg shadow-orange-500/25",
                          index % 2 === 1
                            ? "lg:-left-[5.3rem] lg:right-auto"
                            : "lg:left-auto lg:right-[-5.3rem]"
                        )}
                      >
                        0{index + 1}
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f26f21]">{step.meta}</p>
                      <h2 className="mt-4 text-2xl font-semibold tracking-[-0.025em] text-slate-950">{step.title}</h2>
                      <p className="mt-4 text-sm leading-7 text-slate-600">{step.description}</p>
                      <p className="mt-6 rounded-xl border border-orange-100 bg-orange-50/70 p-4 text-sm font-medium leading-6 text-orange-950">
                        {step.checkpoint}
                      </p>
                    </article>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DarkEditorialBand title={content.gatesTitle} description={content.gatesDescription}>
        <div className="grid gap-4 lg:grid-cols-3">
          {content.gates.map((gate, index) => (
            <Reveal key={gate.title} delay={index * 0.06}>
              <InsightCard index={index} {...gate} dark />
            </Reveal>
          ))}
        </div>
      </DarkEditorialBand>
      <CtaBand />
    </>
  );
}
