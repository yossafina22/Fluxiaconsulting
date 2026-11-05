import { describe, expect, it, beforeAll } from "vitest";

beforeAll(() => {
  process.env.NEXT_PUBLIC_SITE_URL = "https://www.fluxia-consulting.company";
});

describe("buildMetadata", () => {
  it("builds reciprocal hreflang alternates", async () => {
    const { buildMetadata } = await import("../../src/lib/seo/metadata");
    const meta = buildMetadata({
      locale: "de",
      path: "/services",
      title: "Leistungen",
      description: "Beschreibung",
    });
    const alt = meta.alternates!;
    expect(alt.canonical).toBe("https://www.fluxia-consulting.company/de/services");
    expect(alt.languages).toMatchObject({
      "de-DE": "https://www.fluxia-consulting.company/de/services",
      "fr-FR": "https://www.fluxia-consulting.company/fr/services",
      en: "https://www.fluxia-consulting.company/en/services",
      "x-default": "https://www.fluxia-consulting.company/de/services",
    });
  });

  it("marks noIndex pages as not indexable", async () => {
    const { buildMetadata } = await import("../../src/lib/seo/metadata");
    const meta = buildMetadata({
      locale: "fr",
      path: "/demos",
      title: "Demos",
      description: "Test",
      noIndex: true,
    });
    expect(meta.robots).toMatchObject({ index: false, follow: false });
  });
});
