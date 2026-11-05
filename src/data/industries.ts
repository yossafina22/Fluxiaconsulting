export type IndustrySlug =
  | "restaurants"
  | "hotels"
  | "trades"
  | "retail"
  | "services"
  | "logistics";

export const industrySlugs: ReadonlyArray<IndustrySlug> = [
  "restaurants",
  "hotels",
  "trades",
  "retail",
  "services",
  "logistics",
] as const;

export const industryIcons: Record<IndustrySlug, string> = {
  restaurants: "UtensilsCrossed",
  hotels: "BedDouble",
  trades: "Hammer",
  retail: "Store",
  services: "Briefcase",
  logistics: "Truck",
};
