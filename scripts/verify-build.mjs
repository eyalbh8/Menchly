import { access, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { getRouteMeta, indexableRoutes, publicRoutes, resolveSiteOrigin } from '../src/seo.js';
import { insightArticles } from '../src/content/insights.js';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const siteOrigin = resolveSiteOrigin(process.env.VITE_SITE_URL);
const failures = [];

function outputFileForRoute(path) {
  return path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html');
}

function textContent(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'")
    .replace(/\s+/g, ' ')
    .trim();
}

for (const route of publicRoutes) {
  const file = outputFileForRoute(route.path);
  let html;
  try {
    html = await readFile(file, 'utf8');
  } catch {
    failures.push(`${route.path}: missing generated HTML`);
    continue;
  }

  const meta = getRouteMeta(route.path, siteOrigin);
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const checks = [
    [h1 && textContent(h1[1]) === meta.h1, `expected route-specific H1 "${meta.h1}"`],
    [main && textContent(main[1]).length >= 100, 'expected meaningful prerendered main content'],
    [html.includes(`<title>${meta.title.replaceAll('&', '&amp;')}</title>`), 'missing route title'],
    [html.includes(`name="description" content="${meta.description.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`), 'missing route description'],
    [html.includes(`rel="canonical" href="${meta.canonical}"`), 'missing canonical URL'],
    [html.includes(`property="og:url" content="${meta.canonical}"`), 'missing Open Graph URL'],
    [html.includes('id="structured-data"'), 'missing JSON-LD'],
    [!html.includes('fonts.googleapis.com'), 'contains a Google Fonts network dependency'],
    [
      html.includes(`name="robots" content="${meta.noindex ? 'noindex, nofollow' : 'index, follow'}"`),
      `incorrect robots directive for ${meta.noindex ? 'noindex' : 'indexable'} route`
    ]
  ];
  checks.forEach(([passed, message]) => {
    if (!passed) failures.push(`${route.path}: ${message}`);
  });
  if (route.path === '/private-ai-visibility-assessment') {
    const formChecks = [
      [html.includes('<form class="assessment-form"'), 'assessment form HTML was not prerendered'],
      [html.includes('name="email"'), 'assessment work email field is missing'],
      [html.includes('name="privacyConsent"'), 'assessment privacy consent is missing'],
      [html.includes('name="websiteConfirmation"'), 'assessment honeypot is missing']
    ];
    formChecks.forEach(([passed, message]) => {
      if (!passed) failures.push(`${route.path}: ${message}`);
    });
  }
  if (route.article) {
    const schemaMatch = html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/i);
    let schema;
    try {
      schema = JSON.parse(schemaMatch?.[1] || '');
    } catch {
      failures.push(`${route.path}: article JSON-LD is not valid JSON`);
    }
    const serializedSchema = JSON.stringify(schema || {});
    const articleNode = schema?.['@graph']?.find((node) => node['@type'] === 'Article');
    const articleChecks = [
      [textContent(main?.[1] || '').length >= 2500, 'expected substantive article content'],
      [html.includes('Expert review</span><p>Pending'), 'missing visible pending expert-review label'],
      [html.includes('<time dateTime=') || html.includes('<time datetime='), 'missing visible last-reviewed date'],
      [articleNode?.author?.['@id'] === `${siteOrigin}/#organization`, 'article author must reference Organization'],
      [articleNode?.publisher?.['@id'] === `${siteOrigin}/#organization`, 'article publisher must reference Organization'],
      [articleNode?.datePublished === route.article.datePublished, 'missing or incorrect datePublished'],
      [articleNode?.dateModified === route.article.dateModified, 'missing or incorrect dateModified'],
      [articleNode?.citation?.length === route.article.sources.length, 'article citations do not match visible sources'],
      [!serializedSchema.includes('"@type":"Person"'), 'article schema must not emit Person']
    ];
    articleChecks.forEach(([passed, message]) => {
      if (!passed) failures.push(`${route.path}: ${message}`);
    });
  }
}

try {
  await access(join(dist, 'robots.txt'));
  await access(join(dist, 'sitemap.xml'));
  await access(join(dist, 'llms.txt'));
  await access(join(dist, 'favicon.svg'));
} catch (error) {
  failures.push(`missing required public artifact: ${error.message}`);
}

const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8').catch(() => '');
for (const route of indexableRoutes) {
  const url = new URL(route.path, `${siteOrigin}/`).href;
  if (!sitemap.includes(`<loc>${url}</loc>`)) failures.push(`sitemap: missing ${url}`);
}
if (sitemap.includes(`${siteOrigin}/thank-you`)) failures.push('sitemap: /thank-you must be excluded');

const homeHtml = await readFile(join(dist, 'index.html'), 'utf8').catch(() => '');
const primaryNav = homeHtml.match(/<nav class="nav shell"[\s\S]*?<\/nav>/i)?.[0] || '';
const footer = homeHtml.match(/<footer class="footer"[\s\S]*?<\/footer>/i)?.[0] || '';
if (!primaryNav.includes('href="/insights"')) failures.push('navigation: Insights must appear in primary navigation');
if (!footer.includes('href="/insights"')) failures.push('footer: Insights must remain accessible');
if (!footer.includes('href="/about"')) failures.push('footer: About must remain accessible');
for (const article of insightArticles) {
  if (!sitemap.includes(`<loc>${siteOrigin}/insights/${article.slug}</loc>`)) failures.push(`sitemap: missing insight article ${article.slug}`);
}

if (failures.length) {
  console.error(`Build verification failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log(`Verified ${publicRoutes.length} prerendered routes and public SEO artifacts.`);
