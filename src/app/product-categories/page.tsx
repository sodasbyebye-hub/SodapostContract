"use client";

import { Boxes, SearchCheck } from "lucide-react";

import { CategoryCard } from "@/components/category-card";
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

export default function ProductCategoriesPage() {
  const { locale, t } = useI18n();
  const content = getInnerPageContent(locale).categories;

  return (
    <>
      <MarketingHero
        eyebrow={t.common.productCategories}
        title={t.pages.categoriesTitle}
        description={t.pages.categoriesDescription}
        icon={Boxes}
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
          <div className="relative mt-10">
            <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-slate-300/35 blur-3xl" />
            <div className="relative grid gap-6 lg:grid-cols-6">
              {t.categories.map((category, index) => (
                <Reveal
                  key={category.title}
                  delay={index * 0.04}
                  className={index < 2 ? "lg:col-span-3" : "lg:col-span-2"}
                >
                  <CategoryCard category={category} index={index + 1} featured={index < 2} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DarkEditorialBand title={content.assessmentTitle} description={content.assessmentDescription}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.assessmentItems.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <InsightCard index={index} {...item} dark />
            </Reveal>
          ))}
        </div>
      </DarkEditorialBand>

      <section className="px-4 pb-6 sm:px-6 lg:px-8">
        <Reveal className="mx-auto flex max-w-7xl gap-4 rounded-2xl border border-orange-200 bg-orange-50/75 p-6 sm:p-8">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#f26f21] shadow-sm">
            <SearchCheck className="size-5" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-orange-950">{content.noteTitle}</h2>
            <p className="mt-2 max-w-4xl text-sm leading-7 text-orange-900/80">{content.noteDescription}</p>
          </div>
        </Reveal>
      </section>
      <CtaBand />
    </>
  );
}
