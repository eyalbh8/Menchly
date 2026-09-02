import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteMeta, getStructuredData, SITE_NAME } from '../seo.js';

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
}

export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    const ogImage = `${meta.origin}/og-image.png`;
    document.title = meta.title;

    upsertMeta('meta[name="description"]', { name: 'description', content: meta.description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: meta.noindex ? 'noindex, nofollow' : 'index, follow' });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: meta.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: meta.description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: meta.canonical });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: meta.ogType || 'website' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: ogImage });
    upsertMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: '1200' });
    upsertMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: '630' });
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: 'Menchly - AI Search Marketing Infrastructure' });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: meta.title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: meta.description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImage });

    if (meta.ogType === 'article' && meta.article) {
      upsertMeta('meta[property="article:published_time"]', { property: 'article:published_time', content: meta.article.datePublished });
      upsertMeta('meta[property="article:modified_time"]', { property: 'article:modified_time', content: meta.article.dateModified });
      upsertMeta('meta[property="article:author"]', { property: 'article:author', content: meta.article.author });
      upsertMeta('meta[property="article:section"]', { property: 'article:section', content: 'AI Search Marketing Research' });
    }

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = meta.canonical;

    let structuredData = document.getElementById('structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'structured-data';
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(getStructuredData(pathname));
  }, [pathname]);

  return null;
}
