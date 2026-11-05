import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import { ContactForm } from "@/components/forms/ContactForm";
import { company } from "@/data/company";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return buildMetadata({
    locale,
    path: "/contact",
    title: t("pageTitle"),
    description: t("intro"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  return (
    <>
      <section className="bg-night py-12 text-white md:py-16">
        <div className="fx-container">
          <h1 className="text-3xl font-bold text-white md:text-5xl">{t("pageTitle")}</h1>
          <p className="mt-3 max-w-2xl text-white/80">{t("intro")}</p>
        </div>
      </section>
      <section className="fx-container grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr]">
        <ContactForm />
        <aside className="space-y-4">
          <div className="fx-card">
            <h2 className="text-base font-semibold text-night">
              {t("altContact", { email: company.email, phone: company.phone.display })}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ink">
              <li>{company.address.full}</li>
              <li>
                <a href={`mailto:${company.email}`} className="text-petrol hover:underline">
                  {company.email}
                </a>
              </li>
              <li>
                <a href={`tel:${company.phone.e164}`} className="text-petrol hover:underline">
                  {company.phone.display}
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
