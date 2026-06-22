import type { CaseStudy } from "@/lib/site-data";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white/75 p-6 shadow-sm shadow-slate-950/5 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10">
      <p className="text-sm font-semibold text-[#f26f21]">{study.category}</p>
      <h3 className="mt-3 text-xl font-semibold text-slate-950">{study.company}</h3>
      <p className="mt-4 rounded-lg bg-slate-950 px-4 py-3 text-sm font-medium text-white">
        {study.result}
      </p>
      <p className="mt-4 text-sm leading-6 text-slate-600">{study.summary}</p>
    </article>
  );
}
