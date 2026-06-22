"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CategoryCard } from "@/components/category-card";
import { CategoryImageGallery } from "@/components/category-image-gallery";
import { HeroSection } from "@/components/hero-section";
import { ManufacturingIntroSection } from "@/components/manufacturing-intro-section";
import { Reveal } from "@/components/reveal";
import { CtaBand, SectionHeading } from "@/components/section";
import { ServiceCard } from "@/components/service-card";
import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { services as serviceDefinitions } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export default function Home() {
  const { t } = useI18n();
  const localizedServices = t.services.map((service, index) => ({
    ...service,
    icon: serviceDefinitions[index].icon,
  }));

  return (
    <>
      <HeroSection />
      <section className="relative overflow-hidden bg-[#fbfaf7] px-4 py-20 sm:px-6 lg:px-8">
        <Image
          src="/images/china-sourcing-map-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none select-none object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fbfaf7]/92 via-[#fbfaf7]/55 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={t.pages.homeServicesEyebrow}
            title={t.pages.homeServicesTitle}
            description={t.pages.homeServicesDescription}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {localizedServices.slice(0, 6).map((service, index) => (
              <Reveal key={service.title} delay={index * 0.04}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ManufacturingIntroSection />
      <section className="soft-grid bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <SectionHeading
              eyebrow={t.common.productCategories}
              title={t.pages.homeCategoriesTitle}
              description={t.pages.homeCategoriesDescription}
            />
            <Link
              href="/product-categories"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-7 bg-white")}
            >
              {t.common.exploreCategories}
              <ArrowRight />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/80 bg-white/65 p-3 shadow-xl shadow-slate-950/8 backdrop-blur-xl">
              <CategoryImageGallery categories={t.categories} />
            </div>
          </Reveal>
        </div>
        <div className="mx-auto mt-10 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {t.categories.slice(0, 5).map((category, index) => (
            <Reveal key={category.title} delay={index * 0.04}>
              <CategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            centered
            eyebrow={t.common.howItWorks}
            title={t.pages.homeProcessTitle}
            description={t.pages.homeProcessDescription}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {t.processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <article className="min-h-64 rounded-lg border border-slate-200 bg-white/75 p-6 shadow-sm shadow-slate-950/5 backdrop-blur-xl">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-6 text-lg font-semibold text-slate-950">{step.title}</h3>
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
