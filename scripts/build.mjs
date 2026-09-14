import { execFileSync } from 'node:child_process';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { getRouteMeta, getStructuredData, indexableRoutes, publicRoutes, resolveSiteOrigin, SITE_NAME } from '../src/seo.js';

// Load .env file if it exists (Node 24.3.0+)
try {
  process.loadEnvFile(resolve(import.meta.dirname, '..', '.env'));
} catch (err) {
  if (err.code !== 'ENOENT') throw err;
}

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const serverOut = join(root, '.prerender');
const vite = join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'vite.cmd' : 'vite');
const siteOrigin = resolveSiteOrigin(process.env.VITE_SITE_URL);

function run(args) {
  execFileSync(vite, args, { cwd: root, env: process.env, stdio: 'inherit', shell: process.platform === 'win32' });
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
  const ogImage = `${siteOrigin}/og-image.png`;
  const tags = [
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
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Menchly - AI Search Marketing Infrastructure" />`
  ];
  
  if (meta.ogType === 'article' && meta.article) {
    tags.push(`<meta property="article:published_time" content="${meta.article.datePublished}" />`);
    tags.push(`<meta property="article:modified_time" content="${meta.article.dateModified}" />`);
    tags.push(`<meta property="article:author" content="${meta.article.author}" />`);
    tags.push(`<meta property="article:section" content="AI Search Marketing Research" />`);
  }
  
  tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
  tags.push(`<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`);
  tags.push(`<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`);
  tags.push(`<meta name="twitter:image" content="${ogImage}" />`);
  tags.push(`<script id="structured-data" type="application/ld+json">${serializeJsonLd(getStructuredData(path, siteOrigin))}</script>`);
  tags.push('<!--/seo-head-->');
  
  return tags.join('\n    ');
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
  ...indexableRoutes.map((route) => {
    const lastmod = new Date().toISOString().split('T')[0];
    return `  <url><loc>${new URL(route.path, `${siteOrigin}/`).href}</loc><lastmod>${lastmod}</lastmod></url>`;
  }),
  '</urlset>',
  ''
].join('\n');

await writeFile(join(dist, 'sitemap.xml'), sitemap);
await writeFile(
  join(dist, 'robots.txt'),
  `User-agent: *
Allow: /
Disallow: /thank-you

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${siteOrigin}/sitemap.xml
`
);
await rm(serverOut, { recursive: true, force: true });

console.log(`Prerendered ${publicRoutes.length} public routes for ${siteOrigin}`);
