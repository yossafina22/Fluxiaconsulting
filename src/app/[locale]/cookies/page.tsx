import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return buildMetadata({
    locale,
    path: "/cookies",
    title: t("cookiesTitle"),
    description: t("cookiesBody"),
    noIndex: true,
  });
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  return (
    <section className="fx-container max-w-3xl py-14">
      <h1 className="text-3xl font-bold text-night">{t("cookiesTitle")}</h1>
      <p className="mt-6 text-ink">{t("cookiesBody")}</p>
    </section>
  );
}
