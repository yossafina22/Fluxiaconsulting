import { company } from "@/data/company";
import { siteUrl } from "./metadata";

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: company.name,
    url: siteUrl(),
    telephone: company.phone.e164,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressCountry: company.address.country,
    },
    areaServed: company.serviceCountryCodes.map((code) => ({
      "@type": "Country",
      name: code,
    })),
    inLanguage: company.languages,
  } as const;
}
