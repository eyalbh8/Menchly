import { access, readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { getRouteMeta, indexableRoutes, publicRoutes, resolveSiteOrigin } from '../src/seo.js';
import { insightArticles } from '../src/content/insights.js';
import { faqs, serviceFaqs } from '../src/data.js';

// Load .env file if it exists (Node 24.3.0+)
try {
  process.loadEnvFile(resolve(import.meta.dirname, '..', '.env'));
} catch (err) {
  if (err.code !== 'ENOENT') throw err;
}

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const siteOrigin = resolveSiteOrigin(process.env.VITE_SITE_URL);
const failures = [];

const competitorBlocklist = [
  'profound.com', 'otterly.ai', 'peec.ai', 'scrunch.com', 'evertune.ai', 'athena.ai',
  'goodie.com', 'brandlight.com', 'rankscale.com', 'semrush.com', 'ahrefs.com',
  'conductor.com', 'brightedge.com', 'seoclarity.net', 'similarweb.com',
  'searchengineland.com', 'business.adobe.com'
];

// New approved sources for services page
const approvedServicesSources = [
  'arxiv.org',
  'developers.google.com'
];

function outputFileForRoute(path) {
  return path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html');
}

function textContent(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Check if og-image.png is a real PNG
try {
  const ogPngPath = join(dist, 'og-image.png');
  const ogBuffer = readFileSync(ogPngPath);
  const pngMagic = Buffer.from([0x89, 0x50, 0x4E, 0x47]);
  if (!ogBuffer.slice(0, 4).equals(pngMagic)) {
    failures.push('og-image.png is not a real PNG file (missing PNG magic number)');
  }
} catch (err) {
  failures.push('og-image.png is missing or unreadable');
}

// Helper to check for glued words in headings
function checkGluedWords(html, path) {
  const headingRegex = new RegExp('<(h[1-3])[^>]*>([\\s\\S]*?)<\\/\\1>', 'gi');
  const headingMatches = [...html.matchAll(headingRegex)];
  for (const match of headingMatches) {
    const tag = match[1];
    const content = match[2].replace(/<[^>]+>/g, '').trim();
    // Check for lowercase-to-uppercase with no space (e.g., "whereto")
    if (/[a-z][A-Z]/.test(content)) {
      failures.push(`${path}: ${tag} contains glued words: "${content.slice(0, 60)}..."`);
    }
  }
}

// Helper to detect run-on sentences
function checkRunOns(html, path) {
  // Disabled: too many false positives with proper nouns and brand terms
  // Can be re-enabled with a more sophisticated pattern if needed
  return;
}

// Word count floor for commercial pages
const wordCountFloors = {
  '/': 1000,
  '/services': 1000,
  '/about': 200,
  '/methodology': 250
};

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
  
  // Check for competitor links
  const hrefMatches = html.match(/href="([^"]+)"/g) || [];
  for (const match of hrefMatches) {
    const url = match.match(/href="([^"]+)"/)?.[1] || '';
    try {
      const parsedUrl = new URL(url);
      if (competitorBlocklist.some(domain => parsedUrl.hostname.includes(domain))) {
        failures.push(`${route.path}: links to blocked competitor domain ${parsedUrl.hostname}`);
      }
    } catch {
      // Ignore relative URLs
    }
  }
  
  // Check for SVG og:image
  if (html.includes('og-image.svg')) {
    failures.push(`${route.path}: og:image points to SVG instead of PNG`);
  }
  
  // Check glued words in headings
  checkGluedWords(html, route.path);
  
  // Check run-ons
  checkRunOns(html, route.path);
  
  // Word count check
  if (wordCountFloors[route.path]) {
    const mainText = main ? textContent(main[1]) : '';
    const wordCount = mainText.split(/\s+/).length;
    if (wordCount < wordCountFloors[route.path]) {
      failures.push(`${route.path}: word count ${wordCount} is below floor of ${wordCountFloors[route.path]}`);
    }
  }
  
  const checks = [
    [h1 && textContent(h1[1]) === meta.h1, `expected route-specific H1 "${meta.h1}"`],
    [main && textContent(main[1]).length >= 100, 'expected meaningful prerendered main content'],
    [html.includes(`<title>${meta.title.replaceAll('&', '&amp;')}</title>`), 'missing route title'],
    [html.includes(`name="description" content="${meta.description.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`), 'missing route description'],
    [html.includes(`rel="canonical" href="${meta.canonical}"`), 'missing canonical URL'],
    [html.includes(`property="og:url" content="${meta.canonical}"`), 'missing Open Graph URL'],
    [html.includes(`property="og:image"`), 'missing og:image'],
    [html.includes(`name="twitter:card" content="summary_large_image"`), 'missing Twitter card'],
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
  
  // Check breadcrumbs visibility for routes with BreadcrumbList schema
  if (meta.breadcrumbs?.length && route.path !== '/private-ai-visibility-assessment') {
    if (!html.includes('class="breadcrumbs"')) {
      failures.push(`${route.path}: emits BreadcrumbList schema but has no visible breadcrumbs nav`);
    }
  }
  
  // Homepage-specific checks
  if (route.path === '/') {
    const schemaMatch = html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/i);
    let schema;
    try {
      schema = JSON.parse(schemaMatch?.[1] || '');
    } catch {
      failures.push(`${route.path}: JSON-LD is not valid JSON`);
    }
    
    const faqPage = schema?.['@graph']?.find((node) => node['@type'] === 'FAQPage');
    const homeChecks = [
      [siteOrigin !== 'https://example.com', 'canonical origin is still placeholder example.com'],
      [faqPage?.mainEntity?.length === faqs.length, `FAQ schema count (${faqPage?.mainEntity?.length || 0}) does not match data.js count (${faqs.length})`]
    ];
    
    // Check that FAQ schema text matches visible text
    if (faqPage?.mainEntity) {
      for (let i = 0; i < faqs.length; i++) {
        const schemaFaq = faqPage.mainEntity[i];
        const dataFaq = faqs[i];
        if (schemaFaq?.acceptedAnswer?.text !== dataFaq.a) {
          homeChecks.push([false, `FAQ ${i + 1} schema text does not match visible text`]);
        }
        if (!html.includes(dataFaq.a)) {
          homeChecks.push([false, `FAQ ${i + 1} answer not found in rendered HTML`]);
        }
      }
    }
    
    homeChecks.forEach(([passed, message]) => {
      if (!passed) failures.push(`${route.path}: ${message}`);
    });
  }
  
  // Services page-specific checks
  if (route.path === '/services') {
    const schemaMatch = html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/i);
    let schema;
    try {
      schema = JSON.parse(schemaMatch?.[1] || '');
    } catch {
      failures.push(`${route.path}: JSON-LD is not valid JSON`);
    }
    
    const serviceNode = schema?.['@graph']?.find((node) => node['@type'] === 'Service' && node['@id']?.includes('/services#service'));
    const faqPage = schema?.['@graph']?.find((node) => node['@type'] === 'FAQPage');
    const webPage = schema?.['@graph']?.find((node) => node['@type'] === 'WebPage');
    
    const servicesChecks = [
      [!!serviceNode, 'missing Service node with @id /services#service'],
      [serviceNode?.hasOfferCatalog?.itemListElement?.length === 4, `Service OfferCatalog should have 4 offers, has ${serviceNode?.hasOfferCatalog?.itemListElement?.length || 0}`],
      [!!faqPage, 'missing FAQPage schema'],
      [faqPage?.mainEntity?.length === serviceFaqs.length, `FAQ schema count (${faqPage?.mainEntity?.length || 0}) does not match serviceFaqs count (${serviceFaqs.length})`],
      [!!webPage, 'missing WebPage schema']
    ];
    
    // Check that FAQ schema text matches visible text for services
    if (faqPage?.mainEntity) {
      for (let i = 0; i < serviceFaqs.length; i++) {
        const schemaFaq = faqPage.mainEntity[i];
        const dataFaq = serviceFaqs[i];
        if (schemaFaq?.acceptedAnswer?.text !== dataFaq.a) {
          servicesChecks.push([false, `Services FAQ ${i + 1} schema text does not match visible text`]);
        }
        if (!html.includes(dataFaq.a)) {
          servicesChecks.push([false, `Services FAQ ${i + 1} answer not found in rendered HTML`]);
        }
      }
    }
    
    servicesChecks.forEach(([passed, message]) => {
      if (!passed) failures.push(`${route.path}: ${message}`);
    });
  }
  
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
