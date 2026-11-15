// Shared constants for the MED-42 capture tooling.

import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

/** Repo root of the marketing site. */
export const ROOT = resolve(here, "../../..");
/** Saved browser sessions (live logins). Gitignored. */
export const AUTH_DIR = join(ROOT, "scripts/capture/.auth");
/** Raw screencast frames and encode scratch. Gitignored. */
export const OUT_DIR = join(ROOT, "scripts/capture/.out");

/** The local product app (read-only reference repo, run with `npm run dev`). */
export const APP_URL = process.env.CAPTURE_APP_URL ?? "http://localhost:5173";

/** Budgets from the plan. */
export const MAX_VIDEO_BYTES = 3 * 1024 * 1024;
export const MAX_POSTER_BYTES = 250 * 1024;

export const authFile = (role) => join(AUTH_DIR, `${role}.json`);

/** Viewports (CSS px). Recorded at deviceScaleFactor 2, then downscaled on encode. */
export const VIEWPORTS = {
  "4/3": { viewport: { width: 1024, height: 768 }, encodeWidth: 1600 },
  "16/9": { viewport: { width: 1280, height: 720 }, encodeWidth: 1920 },
};
