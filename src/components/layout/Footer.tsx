import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { company } from "@/data/company";
import { Icon } from "../ui/Icon";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const legal = useTranslations("legal");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-night text-white">
      <div className="fx-container grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="text-xl font-bold">Fluxia Consulting</div>
          <p className="mt-2 text-sm text-white/70">{t("rights")}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">{t("navTitle")}</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li><Link href="/">{nav("home")}</Link></li>
            <li><Link href="/services">{nav("services")}</Link></li>
            <li><Link href="/industries">{nav("industries")}</Link></li>
            <li><Link href="/about">{nav("about")}</Link></li>
            <li><Link href="/contact">{nav("contact")}</Link></li>
            <li><Link href="/book">{nav("book")}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">{t("contactTitle")}</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <Icon name="MapPin" size={16} className="mt-0.5" />
              <span>{company.address.full}</span>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="Phone" size={16} />
              <a href={`tel:${company.phone.e164}`} className="hover:underline">
                {company.phone.display}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="Mail" size={16} />
              <a href={`mailto:${company.email}`} className="hover:underline">
                {company.email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">{t("legalNav")}</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li><Link href="/impressum">{legal("impressumTitle")}</Link></li>
            <li><Link href="/privacy">{legal("privacyTitle")}</Link></li>
            <li><Link href="/cookies">{legal("cookiesTitle")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="fx-container py-4 text-xs text-white/50">
          © {year} Fluxia Consulting — {company.address.city}, Deutschland
        </div>
      </div>
    </footer>
  );
}
