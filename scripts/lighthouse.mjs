import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

/**
 * Runs Lighthouse CI with Playwright's bundled Chromium when available
 * (avoids macOS app-automation prompts locally); otherwise falls back to
 * the system Chrome that CI runners ship with.
 */
const env = { ...process.env };

try {
  const { chromium } = await import("playwright");
  const path = chromium.executablePath();
  if (existsSync(path)) env.CHROME_PATH = path;
} catch {
  // playwright not installed — let chrome-launcher find system Chrome
}

const result = spawnSync("npx", ["lhci", "autorun"], {
  stdio: "inherit",
  env,
});
process.exit(result.status ?? 1);
