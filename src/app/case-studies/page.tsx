"use client";

import { Layers3, ShieldCheck } from "lucide-react";

import {
  EditorialHeading,
  MarketingHero,
} from "@/components/marketing-page";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/section";
import { getInnerPageContent } from "@/lib/inner-page-content";
import { useI18n } from "@/lib/i18n";

export default function CaseStudiesPage() {
  const { locale, t } = useI18n();
  const content = getInnerPageContent(locale).scenarios;

  return (
    <>
      <MarketingHero
        eyebrow={t.common.caseStudies}
        title={t.pages.caseTitle}
        description={t.pages.caseDescription}
        icon={Layers3}
        highlights={content.hero.highlights}
        panelLabel={content.hero.panelLabel}
        panelTitle={content.hero.panelTitle}
        panelDescription={content.hero.panelDescription}
        panelItems={content.hero.panelItems}
        primaryLabel={t.common.submitSourcingRequest}
      />

      <section className="px-4 pt-16 sm:px-6 lg:px-8">
        <Reveal className="mx-auto flex max-w-7xl gap-4 rounded-2xl border border-orange-200 bg-orange-50/80 p-6 sm:p-8">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#f26f21] shadow-sm">
            <ShieldCheck className="size-5" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-orange-950">{content.noticeTitle}</h2>
            <p className="mt-2 max-w-4xl text-sm leading-7 text-orange-900/80">{content.noticeDescription}</p>
          </div>
        </Reveal>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EditorialHeading
            eyebrow={content.sectionEyebrow}
            title={content.sectionTitle}
            description={content.sectionDescription}
          />
          <div className="mt-10 space-y-6">
            {content.scenarios.map((scenario, index) => (
              <Reveal key={scenario.title} delay={index * 0.05}>
                <article className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white/82 shadow-sm shadow-slate-950/5 transition hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10">
                  <div className="grid lg:grid-cols-[0.36fr_0.64fr]">
                    <div className="relative overflow-hidden bg-slate-950 p-7 text-white sm:p-9">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(242,111,33,0.24),transparent_15rem)]" />
                      <div className="relative">
                        <span className="text-xs font-semibold tracking-[0.2em] text-orange-300">SCENARIO 0{index + 1}</span>
                        <h2 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.025em]">{scenario.title}</h2>
                        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{content.buyerLabel}</p>
                        <p className="mt-2 text-sm leading-7 text-slate-200">{scenario.buyer}</p>
                      </div>
                    </div>
                    <div className="p-7 sm:p-9">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f26f21]">{content.challengeLabel}</p>
                          <p className="mt-3 text-sm leading-7 text-slate-700">{scenario.challenge}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f26f21]">{content.workflowLabel}</p>
                          <p className="mt-3 text-sm leading-7 text-slate-700">{scenario.workflow}</p>
                        </div>
                      </div>
                      <div className="mt-7 border-t border-slate-200 pt-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{content.deliverablesLabel}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {scenario.deliverables.map((deliverable) => (
                            <span key={deliverable} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                              {deliverable}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
