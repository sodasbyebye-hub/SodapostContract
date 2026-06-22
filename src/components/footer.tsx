"use client";

import Link from "next/link";

import { Brand } from "@/components/brand";
import { useI18n } from "@/lib/i18n";

const navLinks = [
  { href: "/services", key: "services" },
  { href: "/how-it-works", key: "howItWorks" },
  { href: "/product-categories", key: "categories" },
  { href: "/pricing", key: "pricing" },
  { href: "/case-studies", key: "caseStudies" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <Brand />
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-600">{t.footer.intro}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-950">{t.footer.pages}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-slate-600 hover:text-[#f26f21]">
                {t.nav[link.key]}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-950">{t.footer.buyerActions}</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link href="/sourcing-request" className="text-slate-600 hover:text-[#f26f21]">
              {t.nav.submitSourcingRequest}
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-[#f26f21]">
              {t.footer.getQuote}
            </Link>
            <Link href="/admin" className="text-slate-600 hover:text-[#f26f21]">
              {t.footer.adminDemo}
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 px-4 py-5 text-center text-xs text-slate-500">
        {t.footer.copyright}
      </div>
    </footer>
  );
}
