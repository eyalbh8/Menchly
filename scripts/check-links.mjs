import { insightArticles } from '../src/content/insights.js';

const servicesCitations = [
  'https://arxiv.org/abs/2311.09735',
  'https://developers.google.com/search/docs/appearance/ai-features'
];

const allSources = insightArticles.flatMap((article) => article.sources);
const serviceSources = servicesCitations.map(url => ({ url, title: 'Services citation', organization: 'External' }));
const uniqueUrls = [...new Set([...allSources, ...serviceSources].map((source) => source.url))];

let failures = 0;

console.log(`Checking ${uniqueUrls.length} unique source URLs...`);

for (const url of uniqueUrls) {
  try {
    // Try HEAD first, fall back to GET if HEAD fails
    let response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
      },
      redirect: 'follow'
    });

    // If HEAD fails with 405 (Method Not Allowed) or 404, try GET
    if (response.status === 405 || response.status === 404) {
      response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
        },
        redirect: 'follow'
      });
    }

    if (response.status === 403) {
      console.log(`⚠️  403 (bot protection - manual check needed): ${url}`);
    } else if (response.status >= 400) {
      console.error(`❌ ${response.status}: ${url}`);
      failures++;
    } else {
      console.log(`✓ ${response.status}: ${url}`);
    }
  } catch (error) {
    console.error(`❌ Error fetching ${url}: ${error.message}`);
    failures++;
  }
}

if (failures > 0) {
  console.error(`\n${failures} link(s) failed validation.`);
  process.exit(1);
}

console.log(`\nAll ${uniqueUrls.length} source URLs validated successfully.`);
