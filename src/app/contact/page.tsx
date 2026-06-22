"use client";

import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";

import { SourcingRequestForm } from "@/components/sourcing-request-form";
import { PageHeader, SectionHeading } from "@/components/section";
import { useI18n } from "@/lib/i18n";

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHeader
        eyebrow={t.nav.contact}
        title={t.pages.contactTitle}
        description={t.pages.contactDescription}
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <SectionHeading
              title={t.pages.contactSectionTitle}
            />
            <div className="mt-8 grid gap-4">
              <div className="rounded-lg border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-xl">
                <Mail className="size-5 text-[#f26f21]" />
                <h2 className="mt-4 font-semibold text-slate-950">{t.contact.email}</h2>
                <p className="mt-2 text-sm text-slate-600">sodapost1@163.com</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-xl">
                <MessageCircle className="size-5 text-[#f26f21]" />
                <h2 className="mt-4 font-semibold text-slate-950">{t.contact.whatsapp}</h2>
                <Image
                  src="/images/whatsapp-qr-code.jpg"
                  alt="SodaPost WhatsApp QR code"
                  width={600}
                  height={600}
                  className="mt-4 w-full max-w-56 rounded-md border border-slate-200 bg-white"
                />
              </div>
            </div>
          </div>
          <SourcingRequestForm />
        </div>
      </section>
    </>
  );
}
