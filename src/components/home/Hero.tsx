import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Icon } from "../ui/Icon";

export function Hero() {
  const t = useTranslations("home.hero");
  const sidePanel = t.raw("sidePanel") as string[];

  return (
    <section className="relative overflow-hidden bg-night text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 fx-grid-bg" />
      <div aria-hidden className="pointer-events-none absolute inset-0 fx-noise mix-blend-overlay" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-20%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-petrol/30 via-petrol/10 to-transparent blur-3xl"
      />
      <div className="fx-container relative grid gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div className="fx-reveal">
          <span className="fx-badge-dark">
            <Icon name="Sparkles" size={14} className="mr-1" />
            {t("badge")}
          </span>
          <h1 className="mt-6 text-white">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75 md:text-xl leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/book" className="fx-btn-primary group">
              <Icon name="CalendarCheck" size={18} />
              <span>{t("ctaPrimary")}</span>
              <Icon
                name="ArrowRight"
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link href="/services" className="fx-btn-ghost-light group">
              <span>{t("ctaSecondary")}</span>
              <Icon
                name="ChevronRight"
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-3 border-t border-white/10 pt-6 sm:grid-cols-3 text-sm text-white/70">
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
          className="fx-reveal relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 backdrop-blur-xl shadow-2xl"
          style={{ "--fx-reveal-delay": "160ms" } as CSSProperties}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-petrol/10 via-transparent to-transparent opacity-50"
          />
          <h2 className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-petrol-400">
            {t("sidePanelTitle")}
          </h2>
          <ul className="relative mt-5 space-y-2.5">
            {sidePanel.map((item, i) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3.5 transition-colors hover:bg-white/[0.06]"
                style={{ "--fx-reveal-delay": `${240 + i * 60}ms` } as CSSProperties}
              >
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-petrol/20 text-petrol-400">
                  <Icon name="Check" size={12} />
                </span>
                <span className="text-sm text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
