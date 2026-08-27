# Arielos / Menchly site

React and Vite marketing site with static prerendering for every public route.

## Requirements

- Node.js 20 or newer
- npm

## Setup

```sh
npm install
cp .env.example .env
npm run dev
```

`VITE_SITE_URL` is the canonical origin used for canonical links, Open Graph URLs, `robots.txt`, `sitemap.xml` and structured data. It must be an absolute origin without a path.

```dotenv
VITE_SITE_URL=https://www.example.com
```

If it is absent or invalid, the build safely falls back to `https://example.com`. That fallback is intentionally neutral, but it is not a production value. Shipping with it would publish incorrect canonical and sitemap URLs, so production deploys must set `VITE_SITE_URL` to the final public origin.

## Private assessment configuration

The assessment form is prerendered as HTML and progressively becomes interactive after hydration. It never simulates a successful request. Configure:

```dotenv
VITE_ASSESSMENT_ENDPOINT=https://crm.example.com/secure-assessment
VITE_CALENDAR_URL=https://calendar.example.com/private-conversation
VITE_BUDGET_RANGES=["£25k–£50k","£50k–£100k","£100k+"]
```

- `VITE_ASSESSMENT_ENDPOINT` must be an HTTPS endpoint that accepts `POST` JSON and returns a 2xx response only after safely accepting the request. If absent, unreachable, timed out or non-2xx, the form displays an honest unavailable/error state and does not navigate.
- `VITE_CALENDAR_URL` is optional. The handoff is shown on `/thank-you` only after a successful submission and only when this value is configured.
- `VITE_BUDGET_RANGES` is optional. It accepts a JSON string array or `|`, `;`, or newline-delimited approved labels. With no approved values, no investment field is rendered.
- The endpoint must implement authentication/abuse controls as appropriate, CORS for the production origin, rate limiting, server-side validation, audit logging, secure storage and the approved CRM mapping. The client honeypot is only a basic friction layer.

The first-party analytics abstraction has no vendor dependency and emits no form values. Events are held in memory until the assessment privacy consent is given, then exposed through `window.menchlyAnalytics` and `menchly:analytics` browser events for an approved first-party receiver to consume. Events cover CTA placement, form start, validation error, submission outcomes, calendar handoff, and industry/methodology views. No analytics receiver is included.

Before production collection is enabled, legal and privacy owners must approve the final privacy notice, consent wording, lawful basis, retention schedule, deletion process, controller/contact details, processors, international transfers and CRM data-processing terms. The current privacy page is explicit interim wording, not a production-ready legal notice.

## Build and verification

```sh
npm run build
npm run verify
npm test
npm run preview
```

The build:

1. creates the normal Vite client bundle;
2. creates a temporary server bundle using `ReactDOMServer`;
3. renders every route declared in `src/seo.js`;
4. writes route-specific HTML, metadata and JSON-LD into `dist`;
5. generates `dist/sitemap.xml` and the environment-specific `dist/robots.txt`.

The browser uses `hydrateRoot` when prerendered markup exists and then updates metadata on client-side navigation. The verification command checks every public route for its expected H1, meaningful main content, description, canonical, Open Graph URL, JSON-LD and robots directive. It also checks sitemap inclusion and exclusion rules. `npm test` deterministically checks assessment validation, attribution/referrer classification, payload and analytics sanitization, and endpoint absent/failure/success behavior without a browser test stack.

Self-hosted Instrument Serif and Manrope files are bundled from `@fontsource`; the site makes no Google Fonts request.

## Editorial content

`src/content/insights.js` is the authority-content registry. Each insight requires a purpose, executive summary, definitions, structured sections, limitations, publication/review dates, organizational attribution, expert-review status, visible sources and related internal links. Article routes are generated from this registry at `/insights/:slug`, included in prerendering and the sitemap, and emit `Article` JSON-LD with Menchly's `Organization` as author and publisher. The schema deliberately emits no `Person`.

All current insight notes show `Expert review: Pending` because no verified reviewer has been supplied. Under the approved editorial gate, Insights remains absent from primary navigation until verified expert review exists; it remains accessible from the footer and internal links.

The same module defines the future case-study publication contract. A case study is publishable only when its challenge, approved intervention, substantiated outcome and source records are present and `evidenceVerified`, `clientApproved`, `legalApproved` and `published` are all explicitly `true`. The collection is empty and no case-study route is generated.

## Deploy

Deploy the complete `dist` directory to any static host. Each known public route has its own `index.html`, for example:

```text
dist/services/index.html
dist/industries/yachting/index.html
```

Configure the host to serve directory indexes and preserve these generated files. Client-side navigation uses the History API, so direct requests to unknown paths need a fallback to `/index.html` if the host does not already provide one. Do not configure a blanket rewrite that bypasses existing route files: crawlers and no-JavaScript visitors must receive each route’s prerendered HTML. Platform-specific equivalents are “serve existing file first, then rewrite unmatched requests to `/index.html`”.

`/thank-you` is prerendered for direct access but marked `noindex, nofollow`, excluded from the sitemap and disallowed in `robots.txt`.

## SEO content sources

- `src/seo.js` is the central route metadata, canonical, robots and structured-data registry.
- Homepage `FAQPage` data comes from the same visible FAQ content in `src/data.js`.
- `Service` and `BreadcrumbList` data are emitted only where corresponding services or navigation context are visible.
- `createArticleSchema` emits article dates, source citations and Organization author/publisher references for registered insight routes.
- `public/llms.txt` is a factual summary of currently visible content and limitations.
- `public/favicon.svg` is an intentionally neutral placeholder mark, not a claim that final brand artwork has been approved.
