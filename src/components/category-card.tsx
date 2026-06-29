import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import type { Category } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function CategoryCard({
  category,
  featured = false,
  index,
}: {
  category: Category;
  featured?: boolean;
  index?: number;
}) {
  return (
    <article className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/88 shadow-xl shadow-slate-950/8 ring-1 ring-slate-950/5 backdrop-blur-xl transition duration-500 hover:-translate-y-1.5 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/15">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-orange-50/40 opacity-0 transition duration-500 group-hover:opacity-100" />
      {category.image ? (
        <div className={cn("relative overflow-hidden bg-slate-100", featured ? "aspect-[16/9]" : "aspect-[4/3]")}>
          <Image
            src={category.image}
            alt={category.title}
            fill
            sizes={featured ? "(min-width: 1280px) 46vw, (min-width: 768px) 50vw, 100vw" : "(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"}
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.055]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/78 via-slate-950/20 to-white/0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(242,111,33,0.28),transparent_34%)] opacity-80" />
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/25 bg-white/92 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-800 shadow-sm backdrop-blur">
            <span className="size-1.5 rounded-full bg-[#f26f21]" />
            Product Category
          </div>
          {index ? (
            <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-slate-950/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              {String(index).padStart(2, "0")}
            </div>
          ) : null}
          <div className={cn("absolute inset-x-0 bottom-0", featured ? "p-6" : "p-5")}>
            <h3 className={cn("max-w-sm font-semibold text-white drop-shadow-sm", featured ? "text-2xl" : "text-xl")}>
              {category.title}
            </h3>
          </div>
        </div>
      ) : null}

      <div className="relative p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            {!category.image ? <h3 className="text-xl font-semibold text-slate-950">{category.title}</h3> : null}
            <p className={cn("text-sm leading-6 text-slate-600", featured ? "max-w-2xl" : "")}>{category.description}</p>
          </div>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#f26f21] shadow-sm transition duration-300 group-hover:rotate-12 group-hover:bg-[#f26f21] group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        {category.subcategories?.length ? (
          <ul className={cn("mt-5 grid gap-2 text-xs leading-5 text-slate-700", featured ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2")}>
            {category.subcategories.map((subcategory) => (
              <li
                key={subcategory}
                className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50/85 px-3 py-2 transition duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50/75 hover:text-orange-950"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#f26f21] shadow-[0_0_0_3px_rgba(242,111,33,0.12)]" />
                <span>{subcategory}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
