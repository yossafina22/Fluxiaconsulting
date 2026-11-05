import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function LocalizedNotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="fx-container py-24 text-center">
      <h1 className="text-3xl font-bold text-night">{t("title")}</h1>
      <p className="mt-3 text-muted">{t("body")}</p>
      <Link href="/" className="fx-btn-primary mt-6 inline-flex">
        {t("cta")}
      </Link>
    </section>
  );
}
