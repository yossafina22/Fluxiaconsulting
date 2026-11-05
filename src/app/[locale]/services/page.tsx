import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import { PillarsGrid } from "@/components/home/PillarsGrid";
import { SolutionsHighlight } from "@/components/home/SolutionsHighlight";
import { FinalCTA } from "@/components/home/FinalCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.pillars" });
  return buildMetadata({
    locale,
    path: "/services",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home.pillars" });
  return (
    <>
      <section className="bg-night py-12 text-white md:py-16">
        <div className="fx-container">
          <h1 className="text-3xl font-bold text-white md:text-5xl">{t("title")}</h1>
          <p className="mt-3 max-w-2xl text-white/80">{t("subtitle")}</p>
        </div>
      </section>
      <PillarsGrid />
      <SolutionsHighlight />
      <FinalCTA />
    </>
  );
}
