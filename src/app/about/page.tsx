"use client";

import Image from "next/image";
import { Compass } from "lucide-react";

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

export default function AboutPage() {
  const { locale, t } = useI18n();
  const content = getInnerPageContent(locale).about;

  return (
    <>
      <MarketingHero
        eyebrow={t.nav.about}
        title={t.pages.aboutTitle}
        description={t.pages.aboutDescription}
        icon={Compass}
        highlights={content.hero.highlights}
        panelLabel={content.hero.panelLabel}
        panelTitle={content.hero.panelTitle}
        panelDescription={content.hero.panelDescription}
        panelItems={content.hero.panelItems}
        primaryLabel={t.common.submitSourcingRequest}
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <EditorialHeading
              eyebrow={content.sectionEyebrow}
              title={content.sectionTitle}
              description={content.sectionDescription}
            />
            <Reveal delay={0.08} className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/70 p-3 shadow-xl shadow-slate-950/8">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                <Image
                  src="/images/sodapost-brand-hero-16x9.png"
                  alt="SodaPost sourcing coordination"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover transition duration-700 hover:scale-[1.02]"
                />
              </div>
            </Reveal>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {content.principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.05}>
                <InsightCard index={index} {...principle} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DarkEditorialBand title={content.modelTitle} description={content.modelDescription}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.modelItems.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <InsightCard index={index} {...item} dark />
            </Reveal>
          ))}
        </div>
      </DarkEditorialBand>
      <CtaBand />
    </>
  );
}
