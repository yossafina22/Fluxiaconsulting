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
  const t = await getTranslations({ locale, namespace: "demos" });
  return buildMetadata({
    locale,
    path: "/demos",
    title: t("pageTitle"),
    description: t("intro"),
    noIndex: true,
  });
}

export default async function DemosPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "demos" });
  const blocks = [
    { title: t("chatTitle"), desc: t("chatDesc") },
    { title: t("leadsTitle"), desc: t("leadsDesc") },
    { title: t("documentTitle"), desc: t("documentDesc") },
    { title: t("reportTitle"), desc: t("reportDesc") },
  ];

  return (
    <>
      <section className="bg-night py-12 text-white md:py-16">
        <div className="fx-container">
          <h1 className="text-3xl font-bold text-white md:text-5xl">{t("pageTitle")}</h1>
          <p className="mt-3 max-w-2xl text-white/80">{t("intro")}</p>
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="fx-container grid gap-5 md:grid-cols-2">
          {blocks.map((b) => (
            <div key={b.title} className="fx-card">
              <h2 className="text-lg font-semibold text-night">{b.title}</h2>
              <p className="mt-2 text-sm text-muted">{b.desc}</p>
            </div>
          ))}
        </div>
        <p className="fx-container mt-6 text-sm italic text-muted">
          {t("disclaimer")}
        </p>
      </section>
    </>
  );
}
