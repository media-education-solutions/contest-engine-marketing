// Browser + context setup for capture runs.
//
// Always launches the installed Google Chrome (`channel: "chrome"`): Playwright's
// bundled Chromium ships without proprietary codecs, so the H.264 stock clips would
// render as black tiles.

import { chromium } from "@playwright/test";
import { existsSync } from "node:fs";
import { authFile } from "./config.mjs";
import { installOverlays } from "./overlay.mjs";

/**
 * Headed by default. Headless Chrome's screencast ignores deviceScaleFactor and clamps the
 * frame to a 1024 px width at the wrong aspect ratio (1024x681 for a 1024x768 viewport),
 * so clips would come out soft and cropped. Headed gives true 2x frames at the viewport's
 * aspect. A Chrome window opens on screen while a clip records; leave it alone.
 */
export function launchChrome({ headless = false } = {}) {
  return chromium.launch({
    channel: "chrome",
    headless,
    args: ["--autoplay-policy=no-user-gesture-required"],
  });
}

/**
 * New context for one clip. `role` picks the saved session (admin | judge | student);
 * pass `null` for a fresh logged-out context (clip 3).
 */
export async function newCaptureContext(browser, { role, viewport }) {
  let storageState;
  if (role) {
    const file = authFile(role);
    if (!existsSync(file)) {
      throw new Error(`No saved ${role} session. Run: npm run capture:login -- ${role}`);
    }
    storageState = file;
  }

  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
    reducedMotion: "no-preference",
    colorScheme: "light",
    storageState,
  });
  await installOverlays(context);
  return context;
}
