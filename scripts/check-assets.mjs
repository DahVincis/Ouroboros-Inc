// Cloudflare Workers static assets: 25 MiB per file, 20,000 files (Free plan).
// Demo bundles under public/demos/ are copied in by hand, so an oversized image
// can reappear at any time — this fails the deploy instead of the upload.
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'dist';
const MAX_BYTES = 25 * 1024 * 1024;
const MAX_FILES = 20_000;

const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]);

const files = walk(DIR);
const tooBig = files.filter((f) => statSync(f).size > MAX_BYTES);

for (const f of tooBig) {
  console.error(`too big: ${f} (${(statSync(f).size / 1024 / 1024).toFixed(1)} MiB > 25 MiB)`);
}
if (files.length > MAX_FILES) console.error(`too many files: ${files.length} > ${MAX_FILES}`);

if (tooBig.length || files.length > MAX_FILES) process.exit(1);
console.log(`ok: ${files.length} files, largest ${(Math.max(...files.map((f) => statSync(f).size)) / 1024 / 1024).toFixed(1)} MiB`);
