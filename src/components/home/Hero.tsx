import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Icon } from "../ui/Icon";

export function Hero() {
  const t = useTranslations("home.hero");
  const sidePanel = t.raw("sidePanel") as string[];

  return (
    <section className="relative overflow-hidden bg-night text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-petrol/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-petrol/20 blur-3xl" />
      </div>
      <div className="fx-container relative grid gap-10 py-14 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <span className="fx-badge-dark">
            <Icon name="Sparkles" size={14} className="mr-1" />
            {t("badge")}
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl drop-shadow-sm">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book" className="fx-btn-primary">
              <Icon name="CalendarCheck" size={18} />
              <span>{t("ctaPrimary")}</span>
            </Link>
            <Link href="/services" className="fx-btn-ghost-light">
              <Icon name="ChevronRight" size={18} />
              <span>{t("ctaSecondary")}</span>
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-4 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <Icon name="Zap" size={16} className="text-petrol-400" />
              {t("benefit1")}
            </li>
            <li className="flex items-center gap-2">
              <Icon name="ShieldCheck" size={16} className="text-petrol-400" />
              {t("benefit2")}
            </li>
            <li className="flex items-center gap-2">
              <Icon name="Target" size={16} className="text-petrol-400" />
              {t("benefit3")}
            </li>
          </ul>
        </div>

        <aside
          aria-label={t("sidePanelTitle")}
          className="rounded-card border border-white/15 bg-white/5 p-6 backdrop-blur"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wide text-petrol-400">
            {t("sidePanelTitle")}
          </h2>
          <ul className="mt-4 space-y-3">
            {sidePanel.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg bg-white/5 p-3"
              >
                <Icon
                  name="Check"
                  size={18}
                  className="mt-0.5 flex-shrink-0 text-petrol-400"
                />
                <span className="text-sm text-white">{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
