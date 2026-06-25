"use client";

import { BadgeDollarSign } from "lucide-react";

import {
  DarkEditorialBand,
  EditorialHeading,
  InsightCard,
  MarketingHero,
} from "@/components/marketing-page";
import { PricingCard } from "@/components/pricing-card";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/section";
import { getInnerPageContent } from "@/lib/inner-page-content";
import { useI18n } from "@/lib/i18n";
import { pricingPlans } from "@/lib/site-data";

export default function PricingPage() {
  const { locale, t } = useI18n();
  const content = getInnerPageContent(locale).pricing;

  return (
    <>
      <MarketingHero
        eyebrow={t.nav.pricing}
        title={t.pages.pricingTitle}
        description={t.pages.pricingDescription}
        icon={BadgeDollarSign}
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
          <p className="mt-4 max-w-2xl text-sm font-medium text-[#d95e17]">{t.pages.pricingContactNote}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {t.pricingPlans.map((plan, index) => (
              <Reveal key={pricingPlans[index].value} delay={index * 0.04}>
                <PricingCard plan={plan} planValue={pricingPlans[index].value} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EditorialHeading title={content.factorsTitle} description={content.factorsDescription} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.factors.map((factor, index) => (
              <Reveal key={factor.title} delay={index * 0.05}>
                <InsightCard index={index} {...factor} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DarkEditorialBand title={content.principlesTitle} description={t.pages.pricingSectionDescription}>
        <div className="grid gap-4 lg:grid-cols-3">
          {content.principles.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 0.06}>
              <InsightCard index={index} {...principle} dark />
            </Reveal>
          ))}
        </div>
      </DarkEditorialBand>
      <CtaBand />
    </>
  );
}
