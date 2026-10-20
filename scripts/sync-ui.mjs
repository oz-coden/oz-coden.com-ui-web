import { writeFile, mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';

// Run from a checkout of the consuming application. No build is required afterward.
const target = resolve(process.argv[2] || '.');
const ref = process.argv[3];
if (!ref || !/^[a-f0-9]{40}$/.test(ref)) throw new Error('Usage: node scripts/sync-ui.mjs <application-directory> <40-character-commit-sha>');
const repository = 'oz-coden/oz-coden.com-ui-web';
const files = {};
for (const name of ['ui.css', 'ui.js']) {
    const response = await fetch(`https://raw.githubusercontent.com/${repository}/${ref}/assets/${name}`);
    if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
    files[name] = await response.text();
}
const destination = join(target, 'vendor', 'ui');
await mkdir(destination, { recursive: true });
for (const [name, content] of Object.entries(files)) await writeFile(join(destination, name), content);
await writeFile(join(target, 'shared-ui.json'), JSON.stringify({ repository, commit: ref, files: Object.fromEntries(Object.entries(files).map(([name, content]) => [name, createHash('sha256').update(content).digest('hex')])) }, null, 2) + '\n');
console.log(`Updated ${destination} from ${ref}`);
