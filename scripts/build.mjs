import { cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const output = join(root, "dist");
const publicEntries = [
  "index.html",
  "app.js",
  "pdf-reader.mjs",
  "styles.css",
  "sw.js",
  "manifest.webmanifest",
  "assets"
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

await Promise.all(
  publicEntries.map((entry) =>
    cp(join(root, entry), join(output, entry), { recursive: true })
  )
);

console.log(`Prepared ${publicEntries.length} public entries in dist.`);
