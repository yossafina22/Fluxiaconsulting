import { useTranslations } from "next-intl";

export function ProcessSteps() {
  const t = useTranslations("home.process");
  const steps = [
    { n: 1, title: t("step1Title"), desc: t("step1Desc") },
    { n: 2, title: t("step2Title"), desc: t("step2Desc") },
    { n: 3, title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <section className="bg-pale py-16 md:py-20">
      <div className="fx-container">
        <h2 className="text-center text-2xl md:text-4xl font-bold text-night">
          {t("title")}
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="fx-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-petrol text-white font-bold">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-night">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
