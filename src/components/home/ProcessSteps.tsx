import { useTranslations } from "next-intl";
import { Icon } from "../ui/Icon";

export function ProcessSteps() {
  const t = useTranslations("home.process");
  const steps = [
    { n: 1, title: t("step1Title"), desc: t("step1Desc"), icon: "MessageCircle" },
    { n: 2, title: t("step2Title"), desc: t("step2Desc"), icon: "FileText" },
    { n: 3, title: t("step3Title"), desc: t("step3Desc"), icon: "Rocket" },
  ];

  return (
    <section className="bg-pale py-20 md:py-24">
      <div className="fx-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-night">{t("title")}</h2>
        </div>
        <div className="relative mt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px fx-timeline-rail md:block"
          />
          <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
            {steps.map((s) => (
              <li
                key={s.n}
                className="relative flex flex-col items-start rounded-2xl border border-line/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative mb-5 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-petrol to-petrol-700 text-white shadow-md ring-4 ring-pale">
                    <Icon name={s.icon} size={20} />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-petrol/70">
                    {String(s.n).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-night">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
