// Saves a signed-in browser session for the capture script. DANNY'S STEP: this opens a
// visible Chrome window and waits while you sign in yourself. The script never types a
// password or a participant code.
//
//   npm run capture:login -- admin     sign in as admin@contest-engine.com
//   npm run capture:login -- judge     sign in as judge3@contest-engine.com
//   npm run capture:login -- student   enter participant code 71000001 (Lakeside)
//
// Run `student` LAST, after the final `npm run demo:seed`: the participant id inside the
// session changes on every re-seed, and student sessions expire after 120 idle minutes.
// Sessions are written to scripts/capture/.auth/ (gitignored; they are live logins).

import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";
import { APP_URL, AUTH_DIR, authFile } from "./lib/config.mjs";

const ROLES = {
  admin: {
    start: "/login",
    done: /\/admin(\/|$)/,
    say: "Sign in as admin@contest-engine.com",
  },
  judge: {
    start: "/login",
    done: /\/judge(\/|$)/,
    say: "Sign in as judge3@contest-engine.com",
  },
  student: {
    start: "/contest/LKSF26",
    done: /\/participant(\/|$)/,
    say: "Enter participant code 71000001",
  },
};

const role = process.argv[2];
if (!ROLES[role]) {
  console.error(`Usage: npm run capture:login -- <${Object.keys(ROLES).join(" | ")}>`);
  process.exit(1);
}

const { start, done, say } = ROLES[role];
mkdirSync(AUTH_DIR, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: false });
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();
await page.goto(APP_URL + start);

console.log(`\n${say}\nin the Chrome window that just opened. Waiting up to 10 minutes...\n`);
await page.waitForURL((url) => done.test(url.pathname), { timeout: 10 * 60_000 });
// Let the app finish writing its session to localStorage before snapshotting it.
await page.waitForLoadState("networkidle").catch(() => {});

await context.storageState({ path: authFile(role) });
console.log(`Saved ${role} session to ${authFile(role)}`);
await browser.close();
