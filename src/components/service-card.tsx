import type { Service } from "@/lib/site-data";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <article className="group rounded-lg border border-white/70 bg-white/70 p-6 shadow-sm shadow-slate-950/5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10">
      <div className="flex size-12 items-center justify-center rounded-lg bg-orange-100 text-[#f26f21] transition group-hover:bg-[#f26f21] group-hover:text-white">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-950">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
    </article>
  );
}
