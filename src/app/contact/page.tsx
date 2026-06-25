"use client";

import Image from "next/image";
import { Mail, MessageCircle, MessagesSquare } from "lucide-react";

import {
  EditorialHeading,
  InsightCard,
  MarketingHero,
} from "@/components/marketing-page";
import { Reveal } from "@/components/reveal";
import { SourcingRequestForm } from "@/components/sourcing-request-form";
import { getInnerPageContent } from "@/lib/inner-page-content";
import { useI18n } from "@/lib/i18n";

export default function ContactPage() {
  const { locale, t } = useI18n();
  const content = getInnerPageContent(locale).contact;

  return (
    <>
      <MarketingHero
        eyebrow={t.nav.contact}
        title={t.pages.contactTitle}
        description={t.pages.contactDescription}
        icon={MessagesSquare}
        highlights={content.hero.highlights}
        panelLabel={content.hero.panelLabel}
        panelTitle={content.hero.panelTitle}
        panelDescription={content.hero.panelDescription}
        panelItems={content.hero.panelItems}
        primaryLabel={t.pages.openFullRequest}
        primaryHref="#sourcing-request-form"
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <EditorialHeading title={content.prepTitle} description={content.prepDescription} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.prepItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <InsightCard index={index} {...item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f1eb] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <EditorialHeading title={content.responseTitle} description={content.responseDescription} />
            <div className="mt-8 space-y-4">
              {content.responseItems.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <InsightCard index={index} {...item} />
                </Reveal>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <Reveal>
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
                  <Mail className="size-5 text-[#f26f21]" />
                  <h2 className="mt-4 font-semibold text-slate-950">{t.contact.email}</h2>
                  <a className="mt-2 block text-sm text-slate-600 hover:text-[#d95e17]" href="mailto:sodapost1@163.com">
                    sodapost1@163.com
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
                  <MessageCircle className="size-5 text-[#f26f21]" />
                  <h2 className="mt-4 font-semibold text-slate-950">{t.contact.whatsapp}</h2>
                  <Image
                    src="/images/whatsapp-qr-code.jpg"
                    alt="SodaPost WhatsApp QR code"
                    width={600}
                    height={600}
                    className="mt-4 w-full max-w-44 rounded-xl border border-slate-200 bg-white"
                  />
                </div>
              </Reveal>
            </div>
          </div>
          <Reveal delay={0.1}>
            <SourcingRequestForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
