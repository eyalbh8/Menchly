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
    document.title = meta.title;

    upsertMeta('meta[name="description"]', { name: 'description', content: meta.description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: meta.noindex ? 'noindex, nofollow' : 'index, follow' });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: meta.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: meta.description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: meta.canonical });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: meta.ogType || 'website' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });

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
