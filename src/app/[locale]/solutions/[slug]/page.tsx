import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  solutionSlugs,
  solutionIcons,
  type SolutionSlug,
} from "@/data/services";
import { Icon } from "@/components/ui/Icon";
import { FinalCTA } from "@/components/home/FinalCTA";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of solutionSlugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!solutionSlugs.includes(slug as SolutionSlug)) return {};
  const t = await getTranslations({ locale, namespace: `solutions.${slug}` });
  return buildMetadata({
    locale,
    path: `/solutions/${slug}`,
    title: t("name"),
    description: t("short"),
  });
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!solutionSlugs.includes(slug as SolutionSlug)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: `solutions.${slug}` });
  const common = await getTranslations({ locale, namespace: "common" });
  const steps = t.raw("steps") as string[];

  return (
    <>
      <section className="bg-night py-12 text-white md:py-16">
        <div className="fx-container">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-petrol text-white">
              <Icon name={solutionIcons[slug as SolutionSlug]} size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white md:text-4xl">{t("name")}</h1>
              <p className="mt-1 text-white/80">{t("short")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="fx-container grid gap-10 py-14 md:py-20 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <p className="text-lg text-ink">{t("long")}</p>
          <div>
            <h2 className="text-xl font-semibold text-night">{common("sectionProblem")}</h2>
            <p className="mt-2 text-ink">{t("problem")}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-night">{common("sectionSolution")}</h2>
            <p className="mt-2 text-ink">{t("solution")}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-night">{common("sectionSteps")}</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-6 text-ink">
              {steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        </div>
        <aside className="fx-card self-start">
          <h3 className="text-base font-semibold text-night">{common("sectionLimits")}</h3>
          <p className="mt-2 text-sm text-muted">{t("limits")}</p>
          <div className="mt-6 flex flex-col gap-2">
            <Link href="/book" className="fx-btn-primary">
              {common("requestCall")}
            </Link>
            <Link href="/contact" className="fx-btn-secondary">
              {common("contactUs")}
            </Link>
          </div>
        </aside>
      </section>
      <FinalCTA />
    </>
  );
}
