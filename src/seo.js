import { faqs } from './data.js';
import { industryProfiles } from './pageContent.js';
import { insightArticles } from './content/insights.js';

export const SITE_NAME = 'Alora';
export const SITE_URL_FALLBACK = 'https://example.com';

const baseDescription = 'AI Search marketing infrastructure for brands built to lead the next iteration of the Internet.';

const staticRoutes = [
  {
    path: '/',
    title: 'Alora — AI Search Marketing Infrastructure',
    description: baseDescription,
    h1: 'AI Search Marketing Infrastructure.'
  },
  {
    path: '/services',
    title: 'AI Search Marketing Services — Alora',
    description: 'Explore Alora’s custom AI Search marketing infrastructure: prompt intelligence, authority architecture, recommendation positioning and reputation monitoring.',
    h1: 'Custom infrastructure for AI Search growth.',
    breadcrumbs: [{ name: 'Services', path: '/services' }],
    service: 'AI Search marketing infrastructure'
  },
  {
    path: '/industries',
    title: 'Industries — Alora',
    description: 'AI recommendation strategy for reputation-sensitive, high-consideration markets including yachting, aviation, prime property, jewellery, watches and hospitality.',
    h1: 'High-consideration markets where reputation shapes access.',
    breadcrumbs: [{ name: 'Industries', path: '/industries' }]
  },
  {
    path: '/methodology',
    title: 'AI Search Methodology — Alora',
    description: 'See Alora’s six-stage methodology for identifying where to act, executing through custom infrastructure, and compounding results over time.',
    h1: 'A disciplined path from signal to compounding results.',
    breadcrumbs: [{ name: 'Methodology', path: '/methodology' }],
    service: 'AI Search methodology'
  },
  {
    path: '/about',
    title: 'About Alora — AI Search Marketing Infrastructure',
    description: 'Alora builds custom AI Search marketing infrastructure for brands that want to lead the next iteration of the Internet.',
    h1: 'AI Search marketing infrastructure, built around each client.',
    breadcrumbs: [{ name: 'About', path: '/about' }]
  },
  {
    path: '/insights',
    title: 'AI Authority Insights — Alora',
    description: 'Strategic perspectives for leaders responsible for brand, reputation, growth and digital strategy in high-consideration markets.',
    h1: 'Strategic perspectives on AI, authority and choice.',
    breadcrumbs: [{ name: 'Insights', path: '/insights' }]
  },
  {
    path: '/private-ai-visibility-assessment',
    title: 'Private AI Visibility Assessment — Alora',
    description: 'Request a discreet, qualified review of how your brand is understood across priority buyer questions, AI interpretation and material authority gaps.',
    h1: 'A discreet first look at how your brand is understood.',
    breadcrumbs: [{ name: 'Private AI visibility assessment', path: '/private-ai-visibility-assessment' }],
    service: 'Private AI visibility assessment'
  },
  {
    path: '/privacy',
    title: 'Privacy — Alora',
    description: 'Read Alora’s interim data-use information and the legal and operational approvals required before production launch.',
    h1: 'Privacy',
    breadcrumbs: [{ name: 'Privacy', path: '/privacy' }]
  },
  {
    path: '/terms',
    title: 'Terms — Alora',
    description: 'Read the current Alora website terms publication placeholder and important limitations.',
    h1: 'Terms',
    breadcrumbs: [{ name: 'Terms', path: '/terms' }]
  },
  {
    path: '/thank-you',
    title: 'Thank You — Alora',
    description: 'Confirmation page for Alora enquiries.',
    h1: 'What happens next.',
    noindex: true
  }
];

const industryRoutes = industryProfiles.map((industry) => ({
  path: `/industries/${industry.slug}`,
  title: `${industry.name} AI Search Marketing — Alora`,
  description: industry.summary,
  h1: 'Be recommended when the right buyer is deciding.',
  breadcrumbs: [
    { name: 'Industries', path: '/industries' },
    { name: industry.name, path: `/industries/${industry.slug}` }
  ],
  service: `${industry.name} AI Search marketing infrastructure`
}));

const insightRoutes = insightArticles.map((article) => ({
  path: `/insights/${article.slug}`,
  title: `${article.title} — Alora`,
  description: article.deck,
  h1: article.title,
  ogType: 'article',
  article,
  breadcrumbs: [
    { name: 'Insights', path: '/insights' },
    { name: article.title, path: `/insights/${article.slug}` }
  ]
}));

export const publicRoutes = [...staticRoutes, ...industryRoutes, ...insightRoutes];
export const indexableRoutes = publicRoutes.filter((route) => !route.noindex);

export function normalizePath(pathname = '/') {
  const clean = pathname.split('?')[0].split('#')[0] || '/';
  return clean === '/' ? clean : clean.replace(/\/+$/, '');
}

export function resolveSiteOrigin(explicitOrigin) {
  const configured = explicitOrigin || import.meta.env?.VITE_SITE_URL || SITE_URL_FALLBACK;
  try {
    const url = new URL(configured);
    return url.origin;
  } catch {
    return SITE_URL_FALLBACK;
  }
}

export function getRouteMeta(pathname, explicitOrigin) {
  const path = normalizePath(pathname);
  const route = publicRoutes.find((item) => item.path === path);
  const origin = resolveSiteOrigin(explicitOrigin);
  if (!route) {
    return {
      path,
      title: 'Page Not Found — Alora',
      description: 'The requested page could not be found.',
      h1: 'This page could not be found.',
      noindex: true,
      canonical: new URL(path, `${origin}/`).href,
      origin
    };
  }
  return {
    ...route,
    canonical: new URL(route.path, `${origin}/`).href,
    origin
  };
}

const organizationSchema = (meta) => ({
  '@type': 'Organization',
  '@id': `${meta.origin}/#organization`,
  name: SITE_NAME,
  url: `${meta.origin}/`,
  description: baseDescription
});

const websiteSchema = (meta) => ({
  '@type': 'WebSite',
  '@id': `${meta.origin}/#website`,
  url: `${meta.origin}/`,
  name: SITE_NAME,
  publisher: { '@id': `${meta.origin}/#organization` }
});

const serviceSchema = (meta) => ({
  '@type': 'Service',
  name: meta.service,
  description: meta.description,
  url: meta.canonical,
  provider: { '@id': `${meta.origin}/#organization` }
});

const breadcrumbSchema = (meta) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${meta.origin}/` },
    ...meta.breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: item.name,
      item: new URL(item.path, `${meta.origin}/`).href
    }))
  ]
});

const faqSchema = () => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a }
  }))
});

export function createArticleSchema({ headline, description, path, datePublished, dateModified, sources = [] }, explicitOrigin) {
  const origin = resolveSiteOrigin(explicitOrigin);
  return {
    '@type': 'Article',
    '@id': `${new URL(path, `${origin}/`).href}#article`,
    headline,
    description,
    mainEntityOfPage: new URL(path, `${origin}/`).href,
    author: { '@id': `${origin}/#organization` },
    publisher: { '@id': `${origin}/#organization` },
    datePublished,
    dateModified,
    citation: sources.map((source) => source.url)
  };
}

export function getStructuredData(pathname, explicitOrigin) {
  const meta = getRouteMeta(pathname, explicitOrigin);
  const graph = [organizationSchema(meta)];
  if (meta.path === '/') graph.push(websiteSchema(meta), faqSchema());
  if (meta.service) graph.push(serviceSchema(meta));
  if (meta.breadcrumbs?.length) graph.push(breadcrumbSchema(meta));
  if (meta.article) {
    graph.push(createArticleSchema({
      headline: meta.article.title,
      description: meta.article.deck,
      path: meta.path,
      datePublished: meta.article.datePublished,
      dateModified: meta.article.dateModified,
      sources: meta.article.sources
    }, meta.origin));
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
