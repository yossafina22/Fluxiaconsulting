"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { routing, type Locale } from "@/i18n/routing";

const flags: Record<Locale, string> = { de: "DE", fr: "FR", en: "EN" };

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const [isPending, startTransition] = useTransition();

  return (
    <div
      role="group"
      aria-label={t("languageLabel")}
      className="inline-flex items-center gap-1 rounded-full border border-line bg-white p-1"
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            disabled={active || isPending}
            onClick={() => {
              startTransition(() => {
                router.replace(pathname, { locale: l });
              });
            }}
            aria-pressed={active}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              active
                ? "bg-petrol text-white"
                : "text-night hover:bg-pale"
            }`}
          >
            {flags[l]}
          </button>
        );
      })}
    </div>
  );
}
