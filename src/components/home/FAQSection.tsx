"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Icon } from "../ui/Icon";

type Faq = { q: string; a: string };

export function FAQSection() {
  const t = useTranslations("home.faq");
  const faqsT = useTranslations();
  const faqs = faqsT.raw("faqs") as Faq[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="fx-container max-w-3xl">
        <h2 className="text-2xl md:text-4xl font-bold text-night">{t("title")}</h2>
        <ul className="mt-8 divide-y divide-line rounded-card border border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left hover:bg-pale-200"
                >
                  <span className="font-semibold text-night">{f.q}</span>
                  <Icon
                    name="ChevronDown"
                    size={18}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-sm text-muted">{f.a}</div>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-sm text-muted">
          {t("cta")}{" "}
          <Link href="/contact" className="font-semibold text-petrol hover:underline">
            →
          </Link>
        </p>
      </div>
    </section>
  );
}
