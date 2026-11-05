import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import { industrySlugs, industryIcons } from "@/data/industries";
import { Icon } from "@/components/ui/Icon";
import { FinalCTA } from "@/components/home/FinalCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "industries" });
  return buildMetadata({
    locale,
    path: "/industries",
    title: t("pageTitle"),
    description: t("intro"),
  });
}

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "industries" });
  return (
    <>
      <section className="bg-night py-12 text-white md:py-16">
        <div className="fx-container">
          <h1 className="text-3xl font-bold text-white md:text-5xl">{t("pageTitle")}</h1>
          <p className="mt-3 max-w-2xl text-white/80">{t("intro")}</p>
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="fx-container grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industrySlugs.map((slug) => (
            <div key={slug} className="fx-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pale text-petrol">
                <Icon name={industryIcons[slug]} size={24} />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-night">
                {t(`${slug}.name`)}
              </h2>
              <p className="mt-2 text-sm text-muted">{t(`${slug}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
