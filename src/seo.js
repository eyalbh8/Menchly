import { faqs, serviceFaqs, servicePillars } from './data.js';
import { industryProfiles, serviceDetails, methodologyStages, measurementDimensions, methodologyFaqs, methodologySources } from './pageContent.js';
import { insightArticles } from './content/insights.js';

export const SITE_NAME = 'Menchly';
export const SITE_URL_FALLBACK = 'https://example.com';

const baseDescription = 'AI Search marketing infrastructure for brands built to lead the next iteration of the Internet.';

const staticRoutes = [
  {
    path: '/',
    title: 'Menchly  -  AI Search Marketing Infrastructure',
    description: baseDescription,
    h1: 'AI Search Marketing Infrastructure.'
  },
  {
    path: '/services',
    title: 'AI Search Marketing Services  -  Menchly',
    description: 'Explore Menchly’s custom AI Search marketing infrastructure: prompt intelligence, authority architecture, recommendation positioning and reputation monitoring.',
    h1: 'Custom infrastructure for AI Search growth.',
    breadcrumbs: [{ name: 'Services', path: '/services' }],
    service: 'AI Search marketing infrastructure'
  },
  {
    path: '/industries',
    title: 'Industries  -  Menchly',
    description: 'AI recommendation strategy for reputation-sensitive, high-consideration markets including yachting, aviation, prime property, jewellery, watches and hospitality.',
    h1: 'High-consideration markets where reputation shapes access.',
    breadcrumbs: [{ name: 'Industries', path: '/industries' }]
  },
  {
    path: '/methodology',
    title: 'AI Search Methodology  -  Menchly',
    description: 'See Menchly’s six-stage methodology for identifying where to act, executing through custom infrastructure, and compounding results over time.',
    h1: 'A disciplined path from signal to compounding results.',
    breadcrumbs: [{ name: 'Methodology', path: '/methodology' }],
    service: 'AI Search methodology',
    faqs: 'methodology'
  },
  {
    path: '/about',
    title: 'About Menchly  -  AI Search Marketing Infrastructure',
    description: 'Menchly builds custom AI Search marketing infrastructure for brands that want to lead the next iteration of the Internet.',
    h1: 'AI Search marketing infrastructure, built around each client.',
    breadcrumbs: [{ name: 'About', path: '/about' }]
  },
  {
    path: '/insights',
    title: 'Research Notes on AI Search Marketing  -  Menchly',
    description: 'Strategic perspectives for leaders responsible for brand, reputation, growth and digital strategy in high-consideration markets.',
    h1: 'Strategic perspectives on AI, authority and choice.',
    breadcrumbs: [{ name: 'Insights', path: '/insights' }]
  },
  {
    path: '/private-ai-visibility-assessment',
    title: 'Private AI Visibility Assessment  -  Menchly',
    description: 'Request a discreet, qualified review of how your brand is understood across priority buyer questions, AI interpretation and material authority gaps.',
    h1: 'A discreet first look at how your brand is understood.',
    service: 'Private AI visibility assessment'
  },
  {
    path: '/privacy',
    title: 'Privacy  -  Menchly',
    description: 'Read Menchly’s interim data-use information and the legal and operational approvals required before production launch.',
    h1: 'Privacy',
    breadcrumbs: [{ name: 'Privacy', path: '/privacy' }]
  },
  {
    path: '/terms',
    title: 'Terms  -  Menchly',
    description: 'Read the current Menchly website terms publication placeholder and important limitations.',
    h1: 'Terms',
    breadcrumbs: [{ name: 'Terms', path: '/terms' }]
  },
  {
    path: '/thank-you',
    title: 'Thank You  -  Menchly',
    description: 'Confirmation page for Menchly enquiries.',
    h1: 'What happens next.',
    noindex: true
  }
];

const industryRoutes = industryProfiles.map((industry) => ({
  path: `/industries/${industry.slug}`,
  title: `${industry.name} AI Search Marketing  -  Menchly`,
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
  title: `${article.title}  -  Menchly`,
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
      title: 'Page Not Found  -  Menchly',
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
  description: baseDescription,
  slogan: 'Built to adapt Built to compound',
  knowsAbout: [
    'AI Search marketing',
    'Prompt and market intelligence',
    'Authority architecture',
    'Recommendation positioning',
    'Reputation monitoring'
  ],
  areaServed: {
    '@type': 'GeoShape',
    name: 'Global'
  },
  publishingPrinciples: `${meta.origin}/insights#editorial-standards`
});

const websiteSchema = (meta) => ({
  '@type': 'WebSite',
  '@id': `${meta.origin}/#website`,
  url: `${meta.origin}/`,
  name: SITE_NAME,
  publisher: { '@id': `${meta.origin}/#organization` },
  inLanguage: 'en'
});

const serviceSchema = (meta) => ({
  '@type': 'Service',
  name: meta.service,
  description: meta.description,
  url: meta.canonical,
  provider: { '@id': `${meta.origin}/#organization` }
});

const servicesPageSchema = (meta) => {
  return {
    '@type': 'Service',
    '@id': `${meta.origin}/services#service`,
    name: 'AI Search Marketing Infrastructure',
    description: meta.description,
    url: meta.canonical,
    provider: { '@id': `${meta.origin}/#organization` },
    serviceType: 'AI Search Marketing',
    areaServed: {
      '@type': 'GeoShape',
      name: 'Global'
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Brands, enterprises, and high-consideration markets requiring AI visibility strategy'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Search Marketing Services',
      itemListElement: serviceDetails.map((pillar, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: pillar.title,
          description: pillar.copy,
          featureList: {
            '@type': 'ItemList',
            itemListElement: pillar.outputs.map((output, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: output
            }))
          }
        }
      }))
    }
  };
};

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

const faqSchema = (faqList = faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqList.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a }
  }))
});

const webPageSchema = (meta, citations = []) => ({
  '@type': 'WebPage',
  '@id': `${meta.canonical}#webpage`,
  url: meta.canonical,
  name: meta.title,
  description: meta.description,
  isPartOf: { '@id': `${meta.origin}/#website` },
  about: { '@id': `${meta.origin}/#organization` },
  citation: citations
});

const homeServiceSchema = (meta) => ({
  '@id': `${meta.origin}/services#service`
});

export function createArticleSchema({ headline, description, path, datePublished, dateModified, sources = [], article }, explicitOrigin) {
  const origin = resolveSiteOrigin(explicitOrigin);
  
  // Calculate word count from all text fields
  const wordCount = article ? [
    ...article.executiveSummary,
    ...article.definitions.map(d => d.quote),
    ...article.sections.flatMap(s => [...s.paragraphs, s.example.text]),
    ...article.limitations
  ].join(' ').split(/\s+/).length : 0;
  
  const schema = {
    '@type': 'Article',
    '@id': `${new URL(path, `${origin}/`).href}#article`,
    headline,
    description,
    inLanguage: 'en',
    isPartOf: { '@id': `${origin}/insights#collectionpage` },
    mainEntityOfPage: new URL(path, `${origin}/`).href,
    articleSection: 'AI Search Marketing Research',
    isAccessibleForFree: true,
    author: { '@id': `${origin}/#organization` },
    publisher: { '@id': `${origin}/#organization` },
    datePublished,
    dateModified,
    wordCount,
    image: `${origin}/og-insights.jpg`,
    citation: sources.map((source) => ({
      '@type': 'CreativeWork',
      name: source.title,
      publisher: { '@type': 'Organization', name: source.organization },
      url: source.url
    }))
  };
  
  return schema;
}

export function getStructuredData(pathname, explicitOrigin) {
  const meta = getRouteMeta(pathname, explicitOrigin);
  const graph = [organizationSchema(meta)];
  
  if (meta.path === '/') {
    graph.push(
      websiteSchema(meta), 
      faqSchema(), 
      webPageSchema(meta, [
        'https://www.bain.com/insights/goodbye-clicks-hello-ai-zero-click-search-redefines-marketing/',
        'https://techcrunch.com/2026/04/16/ai-traffic-to-us-retailers-rose-393-in-q1-and-its-boosting-their-revenue-too/'
      ]), 
      homeServiceSchema(meta)
    );
  }
  
  if (meta.path === '/services') {
    graph.push(
      servicesPageSchema(meta),
      faqSchema(serviceFaqs),
      webPageSchema(meta, [])
    );
  }
  
  if (meta.path === '/insights') {
    const researchFaqs = [
      { 
        q: 'What is a Menchly research note?',
        a: 'A research note is a strategic perspective on AI Search marketing prepared by Menchly Editorial for leaders responsible for brand, reputation and growth. Each note addresses a decision question, provides working definitions and outlines evidence-led frameworks. Notes are not client work, performance claims or forecasts.'
      },
      {
        q: 'Why is expert review pending?',
        a: 'Each note is prepared by Menchly Editorial and carries a visible pending-review label until an independent domain expert has reviewed and approved it. Expert review is required before the pending status is removed.'
      },
      {
        q: 'May I cite a Menchly research note?',
        a: 'Yes. Notes may be cited with attribution to Menchly Editorial and a link to the original. The note\'s publication and review dates are visible on each article page, and all primary sources are listed with links.'
      },
      {
        q: 'How often are notes updated?',
        a: 'Notes are reviewed periodically for accuracy and relevance. The last-reviewed date is shown on each article page. Material updates will be reflected in the dateModified property and visible change log when appropriate.'
      }
    ];
    
    const allDefinitions = insightArticles.flatMap((article) => 
      article.definitions.map((def) => ({ ...def, articleSlug: article.slug }))
    );
    
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${meta.canonical}#collectionpage`,
      url: meta.canonical,
      isPartOf: { '@id': `${meta.origin}/#website` },
      inLanguage: 'en',
      about: { '@id': `${meta.origin}/#organization` },
      mainEntity: { '@id': `${meta.canonical}#itemlist` }
    });
    
    graph.push({
      '@type': 'ItemList',
      '@id': `${meta.canonical}#itemlist`,
      numberOfItems: insightArticles.length,
      itemListElement: insightArticles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: article.title,
        url: `${meta.origin}/insights/${article.slug}`
      }))
    });
    
    graph.push({
      '@type': 'DefinedTermSet',
      '@id': `${meta.origin}/insights#glossary`,
      name: 'AI Search Marketing Glossary',
      hasDefinedTerm: allDefinitions.map((def) => ({
        '@type': 'DefinedTerm',
        '@id': `${meta.origin}/insights#glossary-${def.term.toLowerCase().replace(/\s+/g, '-')}`,
        name: def.term,
        description: def.quote,
        inDefinedTermSet: { '@id': `${meta.origin}/insights#glossary` }
      }))
    });
    
    graph.push(faqSchema(researchFaqs));
  }
  
  if (meta.path === '/methodology') {
    const citations = methodologySources.map((source) => source.url);
    
    graph.push(
      webPageSchema(meta, citations),
      {
        '@type': 'ItemList',
        '@id': `${meta.canonical}#stages`,
        name: 'AI Search Methodology Stages',
        description: 'The six-stage methodology for AI Search marketing infrastructure',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: methodologyStages.length,
        itemListElement: methodologyStages.map((stage, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: stage.title,
          description: stage.copy,
          url: `${meta.canonical}#${stage.slug}`
        }))
      },
      {
        '@type': 'DefinedTermSet',
        '@id': `${meta.canonical}#measurement-framework`,
        name: 'Menchly AI visibility measurement framework',
        description: 'Four dimensions for measuring AI visibility',
        hasDefinedTerm: measurementDimensions.map((dimension) => ({
          '@type': 'DefinedTerm',
          '@id': `${meta.canonical}#${dimension.term.toLowerCase()}`,
          name: dimension.term,
          description: dimension.definition,
          inDefinedTermSet: { '@id': `${meta.canonical}#measurement-framework` }
        }))
      },
      faqSchema(methodologyFaqs)
    );
    
    // Enrich the Service node for methodology
    const methodologyService = {
      '@type': 'Service',
      '@id': `${meta.canonical}#service`,
      name: meta.service,
      description: meta.description,
      url: meta.canonical,
      provider: { '@id': `${meta.origin}/#organization` },
      serviceType: 'AI Search marketing methodology',
      mainEntityOfPage: { '@id': `${meta.canonical}#webpage` }
    };
    graph.push(methodologyService);
  }
  
  if (meta.service && meta.path !== '/services' && meta.path !== '/methodology') graph.push(serviceSchema(meta));
  if (meta.breadcrumbs?.length) graph.push(breadcrumbSchema(meta));
  if (meta.article) {
    graph.push(createArticleSchema({
      headline: meta.article.title,
      description: meta.article.deck,
      path: meta.path,
      datePublished: meta.article.datePublished,
      dateModified: meta.article.dateModified,
      sources: meta.article.sources,
      article: meta.article
    }, meta.origin));
    
    // Add DefinedTerm nodes for article definitions
    meta.article.definitions.forEach((definition) => {
      graph.push({
        '@type': 'DefinedTerm',
        name: definition.term,
        description: definition.quote,
        url: `${meta.canonical}#${definition.term.toLowerCase().replace(/\s+/g, '-')}`
      });
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
