"use client";

import { SourcingRequestForm } from "@/components/sourcing-request-form";
import { PageHeader, SectionHeading } from "@/components/section";
import { useI18n } from "@/lib/i18n";
import type { PricingPlanValue } from "@/lib/site-data";

export function SourcingRequestPageContent({
  initialServicePlan,
}: {
  initialServicePlan: PricingPlanValue | "";
}) {
  const { t } = useI18n();

  return (
    <>
      <PageHeader
        eyebrow={t.common.submitSourcingRequest}
        title={t.pages.requestTitle}
        description={t.pages.requestDescription}
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <SectionHeading
              title={t.pages.requestSectionTitle}
              description={t.pages.requestSectionDescription}
            />
            <div className="mt-8 rounded-lg border border-orange-200 bg-orange-50 p-5 text-sm leading-6 text-orange-950">
              {t.pages.requestNotice}
            </div>
          </div>
          <SourcingRequestForm initialServicePlan={initialServicePlan} />
        </div>
      </section>
    </>
  );
}
