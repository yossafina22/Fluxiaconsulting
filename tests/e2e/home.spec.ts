import { test, expect } from "@playwright/test";

const LOCALES = ["de", "fr", "en"] as const;

for (const locale of LOCALES) {
  test(`home ${locale} loads with logo and primary CTA`, async ({ page }) => {
    const res = await page.goto(`/${locale}`);
    expect(res?.status()).toBeLessThan(400);
    await expect(page.locator('img[alt="Fluxia Consulting"]').first()).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
  });
}

test("language switcher preserves the services path", async ({ page }) => {
  await page.goto("/de/services");
  await page.getByRole("button", { name: "FR" }).click();
  await page.waitForURL("**/fr/services");
  await expect(page.locator("h1")).toBeVisible();
});

test("sitemap lists all three locales", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toContain("/de");
  expect(body).toContain("/fr");
  expect(body).toContain("/en");
});

test("robots.txt disallows /api/", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  expect(await res.text()).toContain("Disallow: /api/");
});

test("root path redirects to /de", async ({ page }) => {
  const res = await page.goto("/");
  expect(res?.url()).toContain("/de");
});

test("chat demo responds via FAQ fallback", async ({ request }) => {
  const res = await request.post("/api/chat", {
    data: {
      message: "Was kostet das?",
      locale: "de",
      history: [],
    },
  });
  expect(res.status()).toBe(200);
  const json = await res.json();
  expect(json.reply).toBeTruthy();
});

test("contact endpoint rejects a missing consent", async ({ request }) => {
  const res = await request.post("/api/contact", {
    data: {
      name: "Max",
      email: "max@example.com",
      service: "ai-chat",
      message: "Ein Test, der lang genug ist.",
      consent: false,
      locale: "de",
    },
  });
  expect(res.status()).toBe(400);
});
