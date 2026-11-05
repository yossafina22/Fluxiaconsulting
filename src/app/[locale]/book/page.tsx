import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import { BookRequestForm } from "@/components/forms/BookRequestForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "book" });
  return buildMetadata({
    locale,
    path: "/book",
    title: t("pageTitle"),
    description: t("intro"),
  });
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "book" });
  return (
    <>
      <section className="bg-night py-12 text-white md:py-16">
        <div className="fx-container">
          <h1 className="text-3xl font-bold text-white md:text-5xl">{t("pageTitle")}</h1>
          <p className="mt-3 max-w-2xl text-white/80">{t("intro")}</p>
        </div>
      </section>
      <section className="fx-container py-14 max-w-2xl">
        <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          {t("noticeNoCalendar")}
        </div>
        <BookRequestForm />
      </section>
    </>
  );
}
