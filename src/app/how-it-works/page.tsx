"use client";

import { Reveal } from "@/components/reveal";
import { CtaBand, PageHeader, SectionHeading } from "@/components/section";
import { useI18n } from "@/lib/i18n";

export default function HowItWorksPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHeader
        eyebrow={t.common.howItWorks}
        title={t.pages.howTitle}
        description={t.pages.howDescription}
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title={t.pages.howSectionTitle}
            description={t.pages.howSectionDescription}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {t.processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <article className="rounded-lg border border-slate-200 bg-white/78 p-6 shadow-sm backdrop-blur-xl">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-[#f26f21] font-semibold text-white">
                    {index + 1}
                  </span>
                  <h2 className="mt-6 text-xl font-semibold text-slate-950">{step.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
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
