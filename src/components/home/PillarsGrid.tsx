import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { pillarSlugs, pillarIcons, type PillarSlug } from "@/data/services";
import { Icon } from "../ui/Icon";

export function PillarsGrid() {
  const home = useTranslations("home.pillars");
  const pillars = useTranslations("pillars");
  const common = useTranslations("common");

  return (
    <section className="bg-pale-200 py-16 md:py-20">
      <div className="fx-container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-night">
            {home("title")}
          </h2>
          <p className="mt-3 text-muted">{home("subtitle")}</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pillarSlugs.map((slug: PillarSlug) => (
            <Link
              key={slug}
              href={`/services/${slug}`}
              className="fx-card fx-card-hover group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pale text-petrol transition-colors group-hover:bg-petrol group-hover:text-white">
                <Icon name={pillarIcons[slug]} size={24} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-night break-words hyphens-auto">
                {pillars(`${slug}.name`)}
              </h3>
              <p className="mt-2 text-sm text-muted break-words hyphens-auto">
                {pillars(`${slug}.short`)}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-petrol transition-transform group-hover:translate-x-1">
                {common("readMore")}
                <Icon name="ChevronRight" size={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
