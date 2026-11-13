import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import { industrySlugs, industryIcons, industryImages } from "@/data/industries";
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
          {industrySlugs.map((slug) => {
            const img = industryImages[slug];
            return (
              <div
                key={slug}
                className="group overflow-hidden rounded-card bg-white border border-line shadow-card transition duration-200 ease-out hover:-translate-y-1 hover:border-petrol hover:shadow-float"
              >
                {img && (
                  <div className="relative h-40 w-full overflow-hidden bg-pale">
                    <Image
                      src={img}
                      alt={t(`${slug}.name`)}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pale text-petrol transition-colors group-hover:bg-petrol group-hover:text-white">
                    <Icon name={industryIcons[slug]} size={20} />
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-night break-words hyphens-auto">
                    {t(`${slug}.name`)}
                  </h2>
                  <p className="mt-2 text-sm text-muted break-words hyphens-auto">
                    {t(`${slug}.desc`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
