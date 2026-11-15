// Records the product demo clips and stills. See scripts/capture/README.md for the run
// order (seed first; student login last).
//
//   npm run capture                  every clip, then every still
//   npm run capture -- --clip 1      one clip
//   npm run capture -- --stills      every still
//   npm run capture -- --still S1    one still
//
// Chrome runs headed (a window opens while recording; don't touch it). --headless is for
// stills only: headless screencasts are low-res and mis-sized, see lib/browser.mjs.

import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { launchChrome, newCaptureContext } from "./lib/browser.mjs";
import { OUT_DIR, ROOT } from "./lib/config.mjs";
import { createPacer } from "./lib/pace.mjs";
import { encode, startRecording, writeStill } from "./lib/record.mjs";
import { clips, stills } from "./clips/index.mjs";

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const value = (name) => argv[argv.indexOf(name) + 1];

const wantClip = flag("--clip") ? Number(value("--clip")) : null;
const wantStill = flag("--still") ? value("--still") : null;
const all = wantClip === null && wantStill === null && !flag("--stills");

const clipJobs = clips.filter((c) => all || c.id === wantClip);
const stillJobs = stills.filter((s) => all || flag("--stills") || s.id === wantStill);
if (clipJobs.length + stillJobs.length === 0) {
  console.error(`Nothing to shoot. Clips: ${clips.map((c) => c.id).join(", ")}. Stills: ${stills.map((s) => s.id).join(", ")}.`);
  process.exit(1);
}

const abs = (p) => join(ROOT, p);
const mb = (bytes) => `${(bytes / 1048576).toFixed(2)} MB`;

async function withPage(browser, job, fn) {
  const context = await newCaptureContext(browser, { role: job.role, viewport: job.viewport });
  try {
    const page = await context.newPage();
    return await fn(page, createPacer(page));
  } finally {
    await context.close();
  }
}

const browser = await launchChrome({ headless: flag("--headless") });
let failed = false;

try {
  for (const job of clipJobs) {
    console.log(`clip ${job.id} ${job.name}`);
    try {
      await withPage(browser, job, async (page, h) => {
        await job.setup(page);
        const recording = await startRecording(page, { name: job.name, viewport: job.viewport });
        h.attach(recording);
        let result;
        try {
          await job.run(page, h);
        } finally {
          result = await recording.stop();
        }
        const { bytes, crf } = encode(result, {
          out: abs(job.output),
          poster: abs(job.poster),
          encodeWidth: job.encodeWidth,
        });
        console.log(`  ${result.frames.length} frames → ${job.output} (${mb(bytes)}, CRF ${crf})`);
      });
    } catch (err) {
      failed = true;
      console.error(`  ✗ clip ${job.id}: ${err.message}`);
    }
  }

  for (const job of stillJobs) {
    console.log(`still ${job.id} ${job.name}`);
    try {
      await withPage(browser, job, async (page, h) => {
        await job.run(page, h);
        const raw = join(OUT_DIR, `${job.name}.png`);
        mkdirSync(OUT_DIR, { recursive: true });
        await page.screenshot({ path: raw, type: "png" });
        const bytes = writeStill(raw, abs(job.output), job.encodeWidth);
        console.log(`  → ${job.output} (${mb(bytes)})`);
      });
    } catch (err) {
      failed = true;
      console.error(`  ✗ still ${job.id}: ${err.message}`);
    }
  }
} finally {
  await browser.close();
}

process.exitCode = failed ? 1 : 0;
