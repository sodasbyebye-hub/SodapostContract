"use client";

import { BriefcaseBusiness } from "lucide-react";

import {
  DarkEditorialBand,
  EditorialHeading,
  InsightCard,
  MarketingHero,
} from "@/components/marketing-page";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/section";
import { ServiceCard } from "@/components/service-card";
import { getInnerPageContent } from "@/lib/inner-page-content";
import { useI18n } from "@/lib/i18n";
import { services as serviceDefinitions } from "@/lib/site-data";

export default function ServicesPage() {
  const { locale, t } = useI18n();
  const content = getInnerPageContent(locale).services;
  const localizedServices = t.services.map((service, index) => ({
    ...service,
    icon: serviceDefinitions[index].icon,
  }));

  return (
    <>
      <MarketingHero
        eyebrow={t.common.services}
        title={t.pages.servicesTitle}
        description={t.pages.servicesDescription}
        icon={BriefcaseBusiness}
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
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {content.stages.map((stage, index) => (
              <Reveal key={stage.title} delay={index * 0.06}>
                <InsightCard index={index} {...stage} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fbfaf7] px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="relative mx-auto max-w-7xl">
          <EditorialHeading
            title={t.pages.servicesSectionTitle}
            description={t.pages.servicesSectionDescription}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {localizedServices.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.04}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DarkEditorialBand title={content.visibilityTitle} description={content.visibilityDescription}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.visibilityItems.map((item, index) => (
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
