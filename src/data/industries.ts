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

export const industryImages: Record<IndustrySlug, string> = {
  restaurants: "/images/restaurant.jpg",
  hotels: "/images/hotel.jpg",
  trades: "/images/Artisan.jpg",
  retail: "/images/retail.jpg",
  services: "/images/sectorpro.jpg",
  logistics: "/images/logistic.jpg",
};
