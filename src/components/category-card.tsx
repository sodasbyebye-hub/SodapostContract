import { ArrowUpRight } from "lucide-react";

import type { Category } from "@/lib/site-data";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <article className="group flex min-h-44 flex-col justify-between rounded-lg border border-slate-200 bg-white/75 p-5 shadow-sm shadow-slate-950/5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/10">
      <div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base font-semibold text-slate-950">{category.title}</h3>
          <ArrowUpRight className="size-4 text-slate-400 transition group-hover:text-[#f26f21]" />
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">{category.description}</p>
      </div>
    </article>
  );
}
