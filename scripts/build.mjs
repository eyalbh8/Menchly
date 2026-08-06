import { execFileSync } from 'node:child_process';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { getRouteMeta, getStructuredData, indexableRoutes, publicRoutes, resolveSiteOrigin, SITE_NAME } from '../src/seo.js';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const serverOut = join(root, '.prerender');
const vite = join(root, 'node_modules', '.bin', 'vite');
const siteOrigin = resolveSiteOrigin(process.env.VITE_SITE_URL);

function run(args) {
  execFileSync(vite, args, { cwd: root, env: process.env, stdio: 'inherit' });
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function serializeJsonLd(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}

function createHead(path) {
  const meta = getRouteMeta(path, siteOrigin);
  const robots = meta.noindex ? 'noindex, nofollow' : 'index, follow';
  return [
    '<!--seo-head-->',
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`,
    `<meta property="og:type" content="${meta.ogType || 'website'}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<script id="structured-data" type="application/ld+json">${serializeJsonLd(getStructuredData(path, siteOrigin))}</script>`,
    '<!--/seo-head-->'
  ].join('\n    ');
}

function outputFileForRoute(path) {
  return path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html');
}

run(['build']);
run(['build', '--ssr', 'src/entry-server.jsx', '--outDir', '.prerender']);

const template = await readFile(join(dist, 'index.html'), 'utf8');
const serverEntry = pathToFileURL(join(serverOut, 'entry-server.js')).href;
const { render } = await import(`${serverEntry}?v=${Date.now()}`);

for (const route of publicRoutes) {
  const html = template
    .replace(/<!--seo-head-->[\s\S]*?<!--\/seo-head-->/, createHead(route.path))
    .replace('<div id="root"></div>', `<div id="root">${render(route.path)}</div>`);
  const output = outputFileForRoute(route.path);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...indexableRoutes.map((route) => `  <url><loc>${new URL(route.path, `${siteOrigin}/`).href}</loc></url>`),
  '</urlset>',
  ''
].join('\n');

await writeFile(join(dist, 'sitemap.xml'), sitemap);
await writeFile(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /thank-you\n\nSitemap: ${siteOrigin}/sitemap.xml\n`
);
await rm(serverOut, { recursive: true, force: true });

console.log(`Prerendered ${publicRoutes.length} public routes for ${siteOrigin}`);
