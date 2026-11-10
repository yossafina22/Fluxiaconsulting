import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Icon } from "../ui/Icon";

export function FinalCTA() {
  const t = useTranslations("home.finalCta");

  return (
    <section className="relative overflow-hidden bg-night py-20 text-white md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 fx-aurora opacity-80" />
      <div aria-hidden className="pointer-events-none absolute inset-0 fx-noise mix-blend-overlay" />
      <div aria-hidden className="pointer-events-none absolute inset-0 fx-grid-bg opacity-60" />
      <div className="fx-container relative text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-petrol-400 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-petrol-400" />
            Fluxia Consulting
          </span>
          <h2 className="mt-5 text-white">{t("title")}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">{t("subtitle")}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/book" className="fx-btn-primary group">
              <Icon name="CalendarCheck" size={18} />
              <span>{t("primary")}</span>
              <Icon
                name="ArrowRight"
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link href="/contact" className="fx-btn-ghost-light group">
              <Icon name="MessageSquare" size={18} />
              <span>{t("secondary")}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
