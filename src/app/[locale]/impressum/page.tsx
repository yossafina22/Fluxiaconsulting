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
    path: "/impressum",
    title: t("impressumTitle"),
    description: t("draftNotice"),
    noIndex: true,
  });
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  return (
    <section className="fx-container max-w-3xl py-14">
      <h1 className="text-3xl font-bold text-night">{t("impressumTitle")}</h1>
      <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
        {t("draftNotice")}
      </div>
      <p className="mt-6 whitespace-pre-line text-ink">{t("impressumBody")}</p>
      <p className="mt-10 text-[10px] text-muted">
        Bildmaterial: Unsplash (Lizenz)
      </p>
    </section>
  );
}
