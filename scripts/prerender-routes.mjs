// After `vite build`: give every case study a real HTML file so deep links work on
// GitHub Pages (which has no SPA rewrites) and link previews get the right title.
// Also writes 404.html (SPA fallback for anything else) and sitemap.xml.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { projects } from '../src/data/projects.js';
import { site } from '../src/config/site.js';

const DIST = 'dist';
const html = await readFile(path.join(DIST, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function withMeta(title, description) {
  return html
    .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(description)}`);
}

const urls = [site.url];
for (const p of projects) {
  const dir = path.join(DIST, 'projects', p.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), withMeta(`${p.title} — ${site.name}`, p.summary));
  urls.push(`${site.url}projects/${p.slug}/`);
}
await writeFile(path.join(DIST, '404.html'), html);
await writeFile(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
);
console.log(`prerendered ${projects.length} case-study routes + 404.html + sitemap.xml`);
