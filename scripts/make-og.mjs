// Renders public/og-image.png (1200×630): photo 02 + wordmark + "Free Estimates · (240) 412-7476".
// Needs the dev server running (npm run dev) so the real fonts and wordmark CSS load.
// Run: node scripts/make-og.mjs

import { createRequire } from "node:module";
// Uses the machine's global Playwright install (not a project dependency).
const { chromium } = createRequire(import.meta.url)("playwright");
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(`${BASE}/ai`, { waitUntil: "networkidle" });

await page.evaluate(() => {
  document.body.innerHTML = `
  <div id="og" style="position:relative;width:1200px;height:630px;overflow:hidden;background:#121412;color:#EFEBE3;font-family:var(--font-public-sans)">
    <img src="/images/02-hero-alt-case-cx57c-excavator-cleared-lot-1200.webp" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 60%;filter:saturate(1.06) sepia(.06)">
    <div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(18,20,18,.94) 0%,rgba(18,20,18,.78) 48%,rgba(18,20,18,.15) 100%)"></div>
    <div style="position:absolute;left:72px;top:72px;right:72px;bottom:64px;display:flex;flex-direction:column">
      <div style="font-family:var(--font-archivo);font-weight:900;font-stretch:125%;font-size:112px;line-height:.9;letter-spacing:-.01em">KARMEL</div>
      <div style="display:flex;align-items:center;margin-top:18px;width:622px"><div style="width:48px;height:10px;background:#44A12A"></div><div style="flex:1;height:3px;background:#44A12A"></div></div>
      <div style="margin-top:18px;font-weight:600;font-size:24px;letter-spacing:.42em">TRUCKING &amp; EXCAVATING</div>
      <div style="margin-top:auto">
        <div style="font-family:var(--font-archivo);font-weight:900;font-stretch:125%;font-size:46px;line-height:1;text-transform:uppercase">Free Estimates <span style="color:#44A12A">·</span> <span style="font-variant-numeric:tabular-nums">(240) 412-7476</span></div>
        <div style="margin-top:16px;font-size:24px;opacity:.85">Land clearing, grading &amp; drainage · Mechanicsville, MD</div>
      </div>
    </div>
  </div>`;
  document.documentElement.style.background = "#121412";
});
await page.waitForFunction(() => document.querySelector("#og img").complete);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.locator("#og").screenshot({ path: path.join(ROOT, "public/og-image.png") });
await browser.close();
console.log("✓ public/og-image.png");
