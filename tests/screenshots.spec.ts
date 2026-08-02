import { test } from "@playwright/test";

/**
 * Captures full-page screenshots of key pages at every supported
 * breakpoint (the project's responsive definition of done).
 * Output: tests/__screenshots__/<page>-<breakpoint>.png
 */

const BREAKPOINTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "desktop", width: 1536, height: 960 },
] as const;

const PAGES = [
  { name: "home", path: "/" },
  { name: "how-it-works", path: "/how-it-works" },
  { name: "why-contest-engine", path: "/why-contest-engine" },
  { name: "who-we-help", path: "/who-we-help" },
  { name: "pricing", path: "/pricing" },
  { name: "buy", path: "/buy" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
  { name: "judges", path: "/judges" },
  { name: "blocks", path: "/dev/blocks" },
] as const;

for (const page of PAGES) {
  for (const bp of BREAKPOINTS) {
    test(`${page.name} @ ${bp.name} (${bp.width}px)`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: bp.width, height: bp.height },
        reducedMotion: "reduce", // reveal animations resolve instantly
      });
      const pw = await context.newPage();
      await pw.goto(page.path, { waitUntil: "load" });
      await pw.waitForTimeout(400); // images/fonts settle
      await pw.screenshot({
        path: `tests/__screenshots__/${page.name}-${bp.name}.png`,
        fullPage: true,
      });
      await context.close();
    });
  }
}
