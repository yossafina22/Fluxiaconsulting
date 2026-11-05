import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3000/de", { waitUntil: "networkidle" });
await page.screenshot({
  path: process.argv[2] ?? "home_de.png",
  fullPage: true,
});
await browser.close();
console.log("ok");
