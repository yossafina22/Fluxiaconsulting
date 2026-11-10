import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { industrySlugs, industryIcons, type IndustrySlug } from "@/data/industries";
import { Icon } from "../ui/Icon";

const industryImages: Partial<Record<IndustrySlug, string>> = {
  restaurants: "/images/restaurant.jpg",
  hotels: "/images/hotel.jpg",
  trades: "/images/Artisan.jpg",
  retail: "/images/retail.jpg",
  services: "/images/sectorpro.jpg",
};

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
          {industrySlugs.map((slug) => {
            const img = industryImages[slug];
            return (
              <div
                key={slug}
                className="group overflow-hidden rounded-card bg-white border border-line shadow-card transition duration-200 ease-out hover:-translate-y-1 hover:border-petrol hover:shadow-float"
              >
                {img && (
                  <div className="relative h-40 w-full overflow-hidden bg-pale">
                    <Image
                      src={img}
                      alt={industries(`${slug}.name`)}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
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
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-xs text-muted">
          Photos: Unsplash
        </p>
      </div>
    </section>
  );
}
