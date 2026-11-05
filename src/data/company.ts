import facts from "../../config/company_facts.json";

export const company = {
  name: facts.company_name,
  contact: facts.contact_name,
  address: {
    street: "Schönebecker Straße 44",
    postalCode: "42283",
    city: "Wuppertal",
    country: "DE",
    full: facts.address,
  },
  phone: {
    display: facts.telephone_display,
    e164: facts.telephone_e164,
  },
  email: facts.email,
  website: facts.website,
  languages: facts.languages as ReadonlyArray<"de" | "fr" | "en">,
  defaultLanguage: facts.default_language as "de",
  serviceCountryCodes: ["DE", "FR", "BE"] as const,
} as const;

export type Company = typeof company;
