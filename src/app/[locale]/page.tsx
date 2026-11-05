import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import { Hero } from "@/components/home/Hero";
import { PillarsGrid } from "@/components/home/PillarsGrid";
import { SolutionsHighlight } from "@/components/home/SolutionsHighlight";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { IndustriesTeaser } from "@/components/home/IndustriesTeaser";
import { InternationalCoverage } from "@/components/home/InternationalCoverage";
import { FAQSection } from "@/components/home/FAQSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return buildMetadata({
    locale,
    path: "/",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <PillarsGrid />
      <SolutionsHighlight />
      <ProcessSteps />
      <IndustriesTeaser />
      <InternationalCoverage />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
