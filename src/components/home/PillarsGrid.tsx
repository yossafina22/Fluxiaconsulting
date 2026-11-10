import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { pillarSlugs, pillarIcons, type PillarSlug } from "@/data/services";
import { Icon } from "../ui/Icon";

export function PillarsGrid() {
  const home = useTranslations("home.pillars");
  const pillars = useTranslations("pillars");
  const common = useTranslations("common");

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="fx-container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-night">{home("title")}</h2>
          <p className="mt-4 text-lg text-muted">{home("subtitle")}</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pillarSlugs.map((slug: PillarSlug, i) => (
            <Link
              key={slug}
              href={`/services/${slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-petrol/40 hover:shadow-xl"
            >
              <span
                aria-hidden
                className="absolute right-4 top-4 text-[11px] font-bold tabular-nums tracking-wider text-muted/40"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative mb-5 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-pale to-pale/60 text-petrol transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-petrol group-hover:to-petrol-700 group-hover:text-white group-hover:shadow-lg group-hover:shadow-petrol/30">
                <Icon name={pillarIcons[slug]} size={22} />
              </div>
              <h3 className="text-base font-semibold text-night break-words hyphens-auto">
                {pillars(`${slug}.name`)}
              </h3>
              <p className="mt-2 flex-grow text-sm leading-relaxed text-muted break-words hyphens-auto">
                {pillars(`${slug}.short`)}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-petrol">
                <span className="relative">
                  {common("readMore")}
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-px w-0 bg-petrol transition-all duration-300 group-hover:w-full"
                  />
                </span>
                <Icon
                  name="ArrowRight"
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
