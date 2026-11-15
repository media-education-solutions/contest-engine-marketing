// CDP screencast recorder + ffmpeg encode.
//
// Playwright's built-in recordVideo is low-bitrate VP8. The DevTools screencast hands
// us high-quality JPEG frames instead; frames arrive only when the page repaints, so
// each one is written to disk with its timestamp and stitched with a concat list whose
// durations are the gaps between frames.

import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { MAX_POSTER_BYTES, MAX_VIDEO_BYTES, OUT_DIR } from "./config.mjs";

const CUT_SECONDS = 0.12; // length of the hold across a cut (see startRecording().pauseCapture)
const HOLD_SECONDS = 1.5; // rest on the payoff frame so the last state lands

/** Start a screencast on `page`. Returns `{ stop }` which resolves to the frame list. */
export async function startRecording(page, { name, viewport }) {
  const dir = join(OUT_DIR, name);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(join(dir, "frames"), { recursive: true });

  const cdp = await page.context().newCDPSession(page);
  const frames = [];
  const writes = [];
  let paused = false;
  let resumed = false; // the next stored frame follows a cut

  cdp.on("Page.screencastFrame", ({ data, metadata, sessionId }) => {
    cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
    if (paused) return;
    const file = join(dir, "frames", `${String(frames.length).padStart(5, "0")}.jpg`);
    frames.push({ file, t: metadata.timestamp, afterCut: resumed });
    resumed = false;
    writes.push(writeFile(file, Buffer.from(data, "base64")));
  });

  await cdp.send("Page.startScreencast", {
    format: "jpeg",
    quality: 92,
    maxWidth: viewport.width * 2,
    maxHeight: viewport.height * 2,
  });

  return {
    dir,
    /** Stop storing frames (a wait that would be dead air, like a slow page load). */
    pauseCapture() {
      paused = true;
    },
    /** Resume storing. The next frame lands right after the last one: a hard cut. */
    resumeCapture() {
      paused = false;
      resumed = true;
    },
    async stop() {
      await cdp.send("Page.stopScreencast").catch(() => {});
      await Promise.all(writes);
      await cdp.detach().catch(() => {});
      if (frames.length < 2) throw new Error(`Screencast "${name}" captured ${frames.length} frames`);
      return { dir, frames };
    },
  };
}

const ffmpeg = (args) => execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args]);

/** Write the ffmpeg concat list. The last file is repeated: concat drops the final duration. */
function writeConcatList({ dir, frames }) {
  const lines = [];
  frames.forEach((f, i) => {
    const next = frames[i + 1];
    const gap = next ? (next.afterCut ? CUT_SECONDS : Math.max(next.t - f.t, 1 / 120)) : HOLD_SECONDS;
    lines.push(`file '${f.file}'`, `duration ${gap.toFixed(4)}`);
  });
  lines.push(`file '${frames.at(-1).file}'`);
  const list = join(dir, "list.txt");
  writeFileSync(list, lines.join("\n") + "\n");
  return list;
}

/**
 * Encode the recording to `out` (H.264 yuv420p, +faststart, no audio) and a poster JPG
 * from the final frame. Raises CRF in steps of 2 until the file is within budget; it
 * does not drop resolution first.
 */
export function encode(recording, { out, encodeWidth, poster, posterFrame = "last" }) {
  mkdirSync(dirname(out), { recursive: true });
  const list = writeConcatList(recording);

  let crf = 22;
  for (;;) {
    ffmpeg([
      "-f", "concat", "-safe", "0", "-i", list,
      "-vf", `fps=30,scale=${encodeWidth}:-2:flags=lanczos,format=yuv420p`,
      "-c:v", "libx264", "-preset", "slow", "-crf", String(crf),
      "-movflags", "+faststart", "-an", out,
    ]);
    const bytes = statSync(out).size;
    if (bytes <= MAX_VIDEO_BYTES || crf >= 34) {
      if (bytes > MAX_VIDEO_BYTES) console.warn(`  ! ${out} is ${(bytes / 1048576).toFixed(2)} MB at CRF ${crf}`);
      break;
    }
    crf += 2;
  }

  // The poster is also the reduced-motion experience, so by default it is the payoff frame.
  // A clip whose payoff is a dense wall of detail can ask for its opening frame instead.
  const posterSource = posterFrame === "first" ? recording.frames[0] : recording.frames.at(-1);
  if (poster) writePoster(posterSource.file, poster, encodeWidth);
  return { crf, bytes: statSync(out).size };
}

/** Downscale a Playwright PNG screenshot to `width` px wide (stills are shot at DSF 2). */
export function writeStill(srcPng, out, width) {
  mkdirSync(dirname(out), { recursive: true });
  ffmpeg(["-i", srcPng, "-vf", `scale=${width}:-2:flags=lanczos`, "-frames:v", "1", out]);
  return statSync(out).size;
}

/** Poster JPG from a single frame; steps quality down until it fits the budget. */
export function writePoster(frameFile, poster, width) {
  mkdirSync(dirname(poster), { recursive: true });
  for (const q of [3, 5, 8, 12]) {
    ffmpeg(["-i", frameFile, "-vf", `scale=${width}:-2:flags=lanczos`, "-frames:v", "1", "-q:v", String(q), poster]);
    if (statSync(poster).size <= MAX_POSTER_BYTES) return;
  }
  console.warn(`  ! poster ${poster} is over ${MAX_POSTER_BYTES / 1024} KB at the lowest quality`);
}
