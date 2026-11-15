// Serves scripts/demo/.media/ on http://127.0.0.1:8787 so seeded demo submissions can
// play in the local product app. Query strings are ignored: the app appends
// "?autoplay=false&responsive=true" to every video media_url. Supports byte-range
// requests so the browser can seek.
//
// Usage: npm run demo:serve        (DEMO_MEDIA_PORT overrides the port)

import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), ".media");
const port = Number(process.env.DEMO_MEDIA_PORT ?? 8787);
const types = { ".mp4": "video/mp4", ".jpg": "image/jpeg", ".html": "text/html; charset=utf-8" };

if (!existsSync(root)) {
  console.error("No media yet. Run `npm run demo:fetch` first.");
  process.exit(1);
}

createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname));
  const file = join(root, path);
  if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404).end("Not found");
    return;
  }

  const size = statSync(file).size;
  const headers = {
    "Content-Type": types[extname(file)] ?? "application/octet-stream",
    "Accept-Ranges": "bytes",
    "Access-Control-Allow-Origin": "*",
  };
  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? "");

  if (range) {
    const start = range[1] ? Number(range[1]) : 0;
    const end = range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
    res.writeHead(206, { ...headers, "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": end - start + 1 });
    createReadStream(file, { start, end }).pipe(res);
    return;
  }

  res.writeHead(200, { ...headers, "Content-Length": size });
  createReadStream(file).pipe(res);
}).listen(port, "127.0.0.1", () => {
  console.log(`Demo media at http://127.0.0.1:${port}/ (Ctrl+C to stop)`);
});
