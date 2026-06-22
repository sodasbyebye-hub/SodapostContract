"use client";

import { CategoryCard } from "@/components/category-card";
import { CategoryImageGallery } from "@/components/category-image-gallery";
import { Reveal } from "@/components/reveal";
import { CtaBand, PageHeader, SectionHeading } from "@/components/section";
import { useI18n } from "@/lib/i18n";

export default function ProductCategoriesPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHeader
        eyebrow={t.common.productCategories}
        title={t.pages.categoriesTitle}
        description={t.pages.categoriesDescription}
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              title={t.pages.categoriesSectionTitle}
              description={t.pages.categoriesSectionDescription}
            />
            <div className="mt-8 rounded-2xl border border-white/80 bg-white/70 p-3 shadow-xl shadow-slate-950/8 backdrop-blur-xl">
              <CategoryImageGallery categories={t.categories} />
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {t.categories.map((category, index) => (
              <Reveal key={category.title} delay={index * 0.03}>
                <CategoryCard category={category} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
