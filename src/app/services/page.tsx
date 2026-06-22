"use client";

import { Reveal } from "@/components/reveal";
import { CtaBand, PageHeader, SectionHeading } from "@/components/section";
import { ServiceCard } from "@/components/service-card";
import { useI18n } from "@/lib/i18n";
import { services as serviceDefinitions } from "@/lib/site-data";

export default function ServicesPage() {
  const { t } = useI18n();
  const localizedServices = t.services.map((service, index) => ({
    ...service,
    icon: serviceDefinitions[index].icon,
  }));

  return (
    <>
      <PageHeader
        eyebrow={t.common.services}
        title={t.pages.servicesTitle}
        description={t.pages.servicesDescription}
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
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
      <CtaBand />
    </>
  );
}
