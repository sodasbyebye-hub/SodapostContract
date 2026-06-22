"use client";

import { PricingCard } from "@/components/pricing-card";
import { Reveal } from "@/components/reveal";
import { CtaBand, PageHeader, SectionHeading } from "@/components/section";
import { useI18n } from "@/lib/i18n";
import { pricingPlans } from "@/lib/site-data";

export default function PricingPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHeader
        eyebrow={t.nav.pricing}
        title={t.pages.pricingTitle}
        description={t.pages.pricingDescription}
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title={t.pages.pricingSectionTitle}
            description={t.pages.pricingSectionDescription}
          />
          <p className="mt-4 max-w-2xl text-sm font-medium text-[#d95e17]">
            {t.pages.pricingContactNote}
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {t.pricingPlans.map((plan, index) => (
              <Reveal key={pricingPlans[index].value} delay={index * 0.04}>
                <PricingCard plan={plan} planValue={pricingPlans[index].value} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
