import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { industrySlugs, industryIcons } from "@/data/industries";
import { Icon } from "../ui/Icon";

export function IndustriesTeaser() {
  const section = useTranslations("home.industries");
  const industries = useTranslations("industries");
  const common = useTranslations("common");

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="fx-container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-night">
              {section("title")}
            </h2>
            <p className="mt-2 text-muted">{section("subtitle")}</p>
          </div>
          <Link
            href="/industries"
            className="text-sm font-semibold text-petrol hover:underline"
          >
            {common("readMore")} →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industrySlugs.map((slug) => (
            <div key={slug} className="fx-card fx-card-hover group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pale text-petrol transition-colors group-hover:bg-petrol group-hover:text-white">
                <Icon name={industryIcons[slug]} size={20} />
              </div>
              <h3 className="mt-3 text-base font-semibold text-night break-words hyphens-auto">
                {industries(`${slug}.name`)}
              </h3>
              <p className="mt-1 text-sm text-muted break-words hyphens-auto">
                {industries(`${slug}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
