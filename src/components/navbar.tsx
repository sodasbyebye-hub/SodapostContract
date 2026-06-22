"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Brand } from "@/components/brand";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/services", key: "services" },
  { href: "/how-it-works", key: "howItWorks" },
  { href: "/product-categories", key: "categories" },
  { href: "/pricing", key: "pricing" },
  { href: "/case-studies", key: "caseStudies" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Navbar() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/78 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/sourcing-request"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-[#f26f21] px-5 text-white hover:bg-[#d95e17]"
            )}
          >
            {t.nav.submitRequest}
          </Link>
        </div>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" size="icon-lg" className="lg:hidden" />}>
            <Menu />
            <span className="sr-only">{t.nav.openNavigation}</span>
          </SheetTrigger>
          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle>
                <Brand />
              </SheetTitle>
              <SheetDescription>{t.nav.mobileDescription}</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <SheetClose key={link.href} render={<Link href={link.href} />}>
                  <span className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100">
                    {t.nav[link.key]}
                  </span>
                </SheetClose>
              ))}
            </nav>
            <div className="space-y-4 px-4">
              <LanguageSwitcher compact />
              <SheetClose render={<Link href="/sourcing-request" />}>
                <span className="flex h-11 items-center justify-center rounded-lg bg-[#f26f21] px-4 text-sm font-semibold text-white">
                  {t.nav.submitSourcingRequest}
                </span>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
