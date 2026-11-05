import { useTranslations } from "next-intl";
import { company } from "@/data/company";
import { Icon } from "../ui/Icon";

export function InternationalCoverage() {
  const t = useTranslations("home.international");

  return (
    <section className="bg-pale py-16 md:py-20">
      <div className="fx-container grid gap-10 md:grid-cols-2 md:items-center">
        <div
          aria-hidden
          className="relative h-64 overflow-hidden rounded-card bg-night p-6 shadow-card"
        >
          <svg
            viewBox="0 0 320 180"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Stylised Europe silhouette */}
            <path
              d="M40 90 Q60 50 100 55 Q140 30 175 50 Q210 40 230 65 Q260 60 275 85 Q290 110 260 130 Q230 150 200 140 Q170 150 140 135 Q110 145 85 130 Q55 125 40 90 Z"
              fill="#2a3f54"
              stroke="#4c99ac"
              strokeWidth="1"
            />
            {/* DE */}
            <circle cx="175" cy="85" r="8" fill="#176B80" />
            <circle cx="175" cy="85" r="14" fill="none" stroke="#4c99ac" strokeOpacity="0.6" />
            <text x="190" y="90" fill="white" fontSize="10" fontWeight="600">DE</text>
            {/* FR */}
            <circle cx="135" cy="110" r="6" fill="#4c99ac" />
            <text x="145" y="114" fill="white" fontSize="9">FR</text>
            {/* BE */}
            <circle cx="155" cy="80" r="5" fill="#4c99ac" />
            <text x="163" y="76" fill="white" fontSize="9">BE</text>
            {/* Lines */}
            <line x1="175" y1="85" x2="135" y2="110" stroke="#4c99ac" strokeOpacity="0.6" strokeWidth="1" />
            <line x1="175" y1="85" x2="155" y2="80" stroke="#4c99ac" strokeOpacity="0.6" strokeWidth="1" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-night">
            {t("title")}
          </h2>
          <ul className="mt-6 space-y-3">
            <li className="flex items-start gap-3">
              <Icon name="Check" size={18} className="mt-0.5 text-petrol" />
              <span className="text-ink">{t("point1")}</span>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="Check" size={18} className="mt-0.5 text-petrol" />
              <span className="text-ink">{t("point2")}</span>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="Check" size={18} className="mt-0.5 text-petrol" />
              <span className="text-ink">{t("point3")}</span>
            </li>
          </ul>
          <div className="mt-6 space-y-2 text-sm text-muted">
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={16} className="text-petrol" />
              <span>{company.address.full}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Phone" size={16} className="text-petrol" />
              <a href={`tel:${company.phone.e164}`} className="hover:underline">
                {company.phone.display}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Mail" size={16} className="text-petrol" />
              <a href={`mailto:${company.email}`} className="hover:underline">
                {company.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
