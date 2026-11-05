import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { solutionSlugs, solutionIcons } from "@/data/services";
import { Icon } from "../ui/Icon";

export function SolutionsHighlight() {
  const section = useTranslations("home.solutionsHighlight");
  const solutions = useTranslations("solutions");

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="fx-container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-night">
            {section("title")}
          </h2>
          <p className="mt-3 text-muted">{section("subtitle")}</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {solutionSlugs.map((slug) => (
            <Link
              key={slug}
              href={`/solutions/${slug}`}
              className="group rounded-card border border-line bg-pale-200 p-5 transition duration-200 ease-out hover:-translate-y-1 hover:border-petrol hover:bg-white hover:shadow-float"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-petrol text-white transition-transform group-hover:scale-110">
                <Icon name={solutionIcons[slug]} size={20} />
              </div>
              <h3 className="mt-3 text-base font-semibold text-night break-words hyphens-auto">
                {solutions(`${slug}.name`)}
              </h3>
              <p className="mt-1 text-sm text-muted break-words hyphens-auto">
                {solutions(`${slug}.short`)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
