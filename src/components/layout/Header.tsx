"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Icon } from "../ui/Icon";

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const links: ReadonlyArray<{ href: string; label: string }> = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/industries", label: t("industries") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="fx-container flex items-center justify-between py-3">
        <Link
          href="/"
          className="flex items-center gap-3 text-night"
          aria-label="Fluxia Consulting"
        >
          <Image
            src="/brand/logo.svg"
            alt="Fluxia Consulting"
            width={200}
            height={38}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav
          aria-label="primary"
          className="hidden items-center gap-6 md:flex"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-night hover:text-petrol"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Link href="/book" className="fx-btn-primary">
            <Icon name="CalendarCheck" size={18} />
            <span>{t("book")}</span>
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 rounded-lg hover:bg-pale"
          aria-label={open ? t("menuClose") : t("menuOpen")}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-white md:hidden">
          <div className="fx-container flex flex-col gap-3 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-2 text-base font-medium text-night"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="fx-btn-primary mt-2"
            >
              <Icon name="CalendarCheck" size={18} />
              <span>{t("book")}</span>
            </Link>
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
