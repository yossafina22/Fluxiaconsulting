import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.fluxia-consulting.company";

const ogLocale: Record<Locale, string> = {
  de: "de_DE",
  fr: "fr_FR",
  en: "en_US",
};

const hreflang: Record<Locale, string> = {
  de: "de-DE",
  fr: "fr-FR",
  en: "en",
};

export function buildMetadata(params: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  noIndex?: boolean;
}): Metadata {
  const { locale, path, title, description, noIndex } = params;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonical = `${SITE_URL}/${locale}${cleanPath === "/" ? "" : cleanPath}`;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[hreflang[l]] = `${SITE_URL}/${l}${cleanPath === "/" ? "" : cleanPath}`;
  }
  languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${
    cleanPath === "/" ? "" : cleanPath
  }`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Fluxia Consulting",
      locale: ogLocale[locale],
      type: "website",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function siteUrl(path = ""): string {
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleaned}`;
}
