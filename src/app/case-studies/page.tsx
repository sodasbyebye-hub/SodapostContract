"use client";

import Image from "next/image";

import { CaseStudyCard } from "@/components/case-study-card";
import { Reveal } from "@/components/reveal";
import { CtaBand, PageHeader, SectionHeading } from "@/components/section";
import { useI18n } from "@/lib/i18n";

export default function CaseStudiesPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHeader
        eyebrow={t.common.caseStudies}
        title={t.pages.caseTitle}
        description={t.pages.caseDescription}
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="overflow-hidden rounded-lg border border-white/80 bg-white/70 p-3 shadow-xl shadow-slate-950/8 backdrop-blur-xl">
              <Image
                src="/images/case-logistics.png"
                alt="Abstract sourcing case workflow"
                width={1400}
                height={900}
                className="rounded-md object-cover"
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              title={t.pages.caseSectionTitle}
              description={t.pages.caseSectionDescription}
            />
            <div className="mt-8 grid gap-5">
              {t.caseStudies.map((study, index) => (
                <Reveal key={study.company} delay={index * 0.04}>
                  <CaseStudyCard study={study} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
