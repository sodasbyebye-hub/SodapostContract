"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppFloatingButton() {
  return (
    <a
      href="https://wa.me/8618743131857"
      target="_blank"
      rel="noreferrer"
      aria-label="Contact SodaPost on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-13 items-center justify-center rounded-lg bg-[#f26f21] text-white shadow-xl shadow-orange-500/30 transition hover:-translate-y-1 hover:bg-[#d95e17]"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
