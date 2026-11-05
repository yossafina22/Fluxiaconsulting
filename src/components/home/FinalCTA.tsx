import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Icon } from "../ui/Icon";

export function FinalCTA() {
  const t = useTranslations("home.finalCta");

  return (
    <section className="bg-night py-16 text-white md:py-20">
      <div className="fx-container text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white">{t("title")}</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/80">{t("subtitle")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/book" className="fx-btn-primary">
            <Icon name="CalendarCheck" size={18} />
            <span>{t("primary")}</span>
          </Link>
          <Link href="/contact" className="fx-btn-ghost-light">
            <Icon name="MessageSquare" size={18} />
            <span>{t("secondary")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
