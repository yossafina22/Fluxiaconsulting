import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import { company } from "@/data/company";
import { Icon } from "@/components/ui/Icon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return buildMetadata({
    locale,
    path: "/about",
    title: t("pageTitle"),
    description: t("intro"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <section className="bg-night py-12 text-white md:py-16">
        <div className="fx-container">
          <h1 className="text-3xl font-bold text-white md:text-5xl">{t("pageTitle")}</h1>
          <p className="mt-3 max-w-2xl text-white/80">{t("intro")}</p>
        </div>
      </section>
      <section className="fx-container grid gap-10 py-14 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-night">
              {t("missionTitle")}
            </h2>
            <p className="mt-2 text-ink">{t("mission")}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-night">
              {t("areaTitle")}
            </h2>
            <p className="mt-2 text-ink">{t("area")}</p>
          </div>
        </div>
        <aside className="fx-card self-start">
          <h3 className="text-base font-semibold text-night">
            {t("contactTitle")}
          </h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-muted">{t("founder")}</dt>
              <dd className="font-semibold text-ink">{company.contact}</dd>
            </div>
            <div className="flex items-start gap-2">
              <Icon name="MapPin" size={16} className="mt-0.5 text-petrol" />
              <span>{company.address.full}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Phone" size={16} className="text-petrol" />
              <a href={`tel:${company.phone.e164}`} className="hover:underline">
                {company.phone.display}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Mail" size={16} className="text-petrol" />
              <a href={`mailto:${company.email}`} className="hover:underline">
                {company.email}
              </a>
            </div>
          </dl>
        </aside>
      </section>
    </>
  );
}
