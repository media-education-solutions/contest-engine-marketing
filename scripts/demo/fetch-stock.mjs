// Downloads the approved stock clips (scripts/demo/stock.json) into the gitignored
// scripts/demo/.media/ folder: a 720p mp4, a poster jpg, and a small player page per
// clip. The player page is what demo submissions point at, because the product app
// shows video entries in an <iframe src={media_url}> (MediaViewer, VideoPlayerDialog).
//
// Usage: npm run demo:fetch        (skips files that already exist)
// Needs ffmpeg on PATH for the posters.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const mediaDir = join(here, ".media", "media");
const embedDir = join(here, ".media", "embed");
const { clips } = JSON.parse(readFileSync(join(here, "stock.json"), "utf8"));

mkdirSync(mediaDir, { recursive: true });
mkdirSync(embedDir, { recursive: true });

const playerPage = (id, title) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>html,body{margin:0;height:100%;background:#000}video{display:block;width:100%;height:100%;object-fit:contain;background:#000}</style>
</head><body>
<video src="/media/${id}.mp4" poster="/media/${id}.jpg" controls playsinline preload="metadata"></video>
</body></html>
`;

for (const { id, title } of clips) {
  const mp4 = join(mediaDir, `${id}.mp4`);
  const jpg = join(mediaDir, `${id}.jpg`);

  if (!existsSync(mp4)) {
    const res = await fetch(`https://assets.mixkit.co/videos/${id}/${id}-720.mp4`);
    if (!res.ok) throw new Error(`Download failed for ${id}: HTTP ${res.status}`);
    writeFileSync(mp4, Buffer.from(await res.arrayBuffer()));
    console.log(`downloaded ${id} ${title}`);
  }

  if (!existsSync(jpg)) {
    const seconds = Number(
      execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", mp4]).toString(),
    );
    const at = (seconds * 0.4).toFixed(2);
    execFileSync("ffmpeg", ["-v", "error", "-y", "-ss", at, "-i", mp4, "-frames:v", "1", "-q:v", "3", jpg]);
  }

  writeFileSync(join(embedDir, `${id}.html`), playerPage(id, title));
}

console.log(`${clips.length} clips ready in ${join(here, ".media")}`);
