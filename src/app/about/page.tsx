"use client";

import { Reveal } from "@/components/reveal";
import { CtaBand, PageHeader, SectionHeading } from "@/components/section";
import { useI18n } from "@/lib/i18n";
import { pageVisuals } from "@/lib/site-data";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHeader
        eyebrow={t.nav.about}
        title={t.pages.aboutTitle}
        description={t.pages.aboutDescription}
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              title={t.pages.aboutSectionTitle}
              description={t.pages.aboutSectionDescription}
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {pageVisuals.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.label} delay={index * 0.05}>
                  <article className="rounded-lg border border-slate-200 bg-white/75 p-6 shadow-sm backdrop-blur-xl">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-orange-100 text-[#f26f21]">
                      <Icon className="size-5" />
                    </div>
                    <h2 className="mt-5 text-lg font-semibold text-slate-950">{t.aboutVisuals[index]}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {t.aboutVisualDescription}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
