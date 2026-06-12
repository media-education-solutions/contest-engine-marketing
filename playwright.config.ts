import { defineConfig } from "@playwright/test";

/**
 * Responsive screenshot harness — see tests/screenshots.spec.ts.
 * `npm run shots` captures every breakpoint into tests/__screenshots__/.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3100",
  },
  webServer: {
    command: "npm run build > /dev/null 2>&1 && npx next start -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
