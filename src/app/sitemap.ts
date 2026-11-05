import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { pillarSlugs, solutionSlugs } from "@/data/services";
import { siteUrl } from "@/lib/seo/metadata";

const staticPaths = [
  "",
  "/services",
  "/industries",
  "/about",
  "/contact",
  "/book",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      urls.push({
        url: siteUrl(`/${locale}${path}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
    for (const slug of pillarSlugs) {
      urls.push({
        url: siteUrl(`/${locale}/services/${slug}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    for (const slug of solutionSlugs) {
      urls.push({
        url: siteUrl(`/${locale}/solutions/${slug}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }
  return urls;
}
