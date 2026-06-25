"use client";

import { FileText } from "lucide-react";

import {
  EditorialHeading,
  InsightCard,
  MarketingHero,
} from "@/components/marketing-page";
import { Reveal } from "@/components/reveal";
import { SourcingRequestForm } from "@/components/sourcing-request-form";
import { getInnerPageContent } from "@/lib/inner-page-content";
import { useI18n } from "@/lib/i18n";
import type { PricingPlanValue } from "@/lib/site-data";

export function SourcingRequestPageContent({
  initialServicePlan,
}: {
  initialServicePlan: PricingPlanValue | "";
}) {
  const { locale, t } = useI18n();
  const content = getInnerPageContent(locale).request;

  return (
    <>
      <MarketingHero
        eyebrow={t.common.submitSourcingRequest}
        title={t.pages.requestTitle}
        description={t.pages.requestDescription}
        icon={FileText}
        highlights={content.hero.highlights}
        panelLabel={content.hero.panelLabel}
        panelTitle={content.hero.panelTitle}
        panelDescription={content.hero.panelDescription}
        panelItems={content.hero.panelItems}
        primaryLabel={t.common.submitSourcingRequest}
        primaryHref="#sourcing-request-form"
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.74fr_1.26fr]">
          <div>
            <EditorialHeading
              title={content.prepTitle}
              description={content.prepDescription}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {content.prepItems.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.04}>
                  <InsightCard index={index} {...item} />
                </Reveal>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50/80 p-5">
              <p className="font-semibold text-orange-950">{content.privacyTitle}</p>
              <p className="mt-2 text-sm leading-6 text-orange-900/80">{content.privacyDescription}</p>
            </div>
          </div>
          <Reveal delay={0.08}>
            <SourcingRequestForm initialServicePlan={initialServicePlan} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
