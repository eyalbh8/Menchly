import { Link } from 'react-router-dom';
import React from 'react';
import { assessmentHref } from '../data.js';
import { trackEvent } from '../analytics.js';

export function Section({ id, tone = '', className = '', children, ...props }) {
  return (
    <section id={id} className={`section ${tone ? `section--${tone}` : ''} ${className}`.trim()} {...props}>
      <div className="shell">{children}</div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, copy, align = 'left' }) {
  return (
    <header className={`section-header section-header--${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </header>
  );
}

export function AssessmentLink({ children = 'Request a private assessment', variant = 'primary', className = '', placement = 'content' }) {
  return (
    <Link
      className={`button button--${variant} ${className}`.trim()}
      to={assessmentHref}
      onClick={() => trackEvent('cta_click', { placement, page: window.location.pathname })}
    >
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}

export function ArrowLink({ href, children }) {
  return (
    <Link className="text-link" to={href}>
      {children} <span aria-hidden="true">↓</span>
    </Link>
  );
}

export function InternalLink({ to, children, className = '' }) {
  return (
    <Link className={`internal-link ${className}`.trim()} to={to}>
      <span>{children}</span><span aria-hidden="true">→</span>
    </Link>
  );
}

export function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><Link to="/">Home</Link></li>
        {items.map((item, index) => (
          <li key={item.label}>
            {item.to && index < items.length - 1 ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({ eyebrow, title, copy, breadcrumbs, children }) {
  return (
    <section className="page-hero">
      <div className="shell">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {copy && <p className="page-hero__copy">{copy}</p>}
        {children && <div className="page-hero__actions">{children}</div>}
      </div>
    </section>
  );
}

export function CtaBand({
  eyebrow = 'Private AI visibility assessment',
  title = 'See where data says to act.',
  copy = 'Establish how assistants interpret your brand today, which questions matter, and where infrastructure can improve speed, learning and compounding results.',
  placement = 'page-band'
}) {
  return (
    <section className="cta-band">
      <div className="shell">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div>
          <p>{copy}</p>
          <AssessmentLink placement={placement} />
        </div>
      </div>
    </section>
  );
}

export function formatInsightDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  }).toUpperCase();
}

export function ProductStage({ src, alt, width, height, className = '' }) {
  const [zoomed, setZoomed] = React.useState(false);

  return (
    <>
      <div 
        className={`product-stage ${className}`.trim()} 
        style={{ '--stage-native-width': `${width}px` }}
        onClick={() => setZoomed(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setZoomed(true); }}
        aria-label="Click to zoom image"
      >
        <img
          src={src}
          alt={alt}
          width={width || 1024}
          height={height || 565}
          loading="lazy"
          decoding="async"
        />
      </div>
      {zoomed && (
        <div 
          className="product-stage-modal" 
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="product-stage-modal__content">
            <button 
              className="product-stage-modal__close"
              onClick={() => setZoomed(false)}
              aria-label="Close"
            >
              ×
            </button>
            <img src={src} alt={alt} />
          </div>
        </div>
      )}
    </>
  );
}

function ResearchChart({ kind }) {
  // Real data charts from workspace - mapped to research notes
  if (kind === 'high-intent-prompt-intelligence') {
    // Intent distribution: Informational 76%, Commercial 17%, Nav 3%, Trans 3%
    return (
      <svg viewBox="0 0 280 120" fill="none" aria-hidden="true">
        <text x="18" y="18" fill="currentColor" opacity=".45" fontSize="9" fontFamily="system-ui,sans-serif">Intent distribution</text>
        <rect x="18" y="38" width="28" height="68" rx="3" fill="currentColor" />
        <rect x="62" y="74" width="28" height="32" rx="3" fill="currentColor" opacity=".65" />
        <rect x="106" y="100" width="28" height="6" rx="3" fill="currentColor" opacity=".35" />
        <rect x="150" y="100" width="28" height="6" rx="3" fill="currentColor" opacity=".35" />
        <text x="18" y="118" fill="currentColor" opacity=".35" fontSize="8" fontFamily="system-ui,sans-serif">Info · Comm · Nav · Trans</text>
      </svg>
    );
  }
  if (kind === 'authority-without-overexposure') {
    // Citation mix: Corporate, Other, Institutional, Editorial, UGC, Reference
    return (
      <svg viewBox="0 0 280 120" fill="none" aria-hidden="true">
        <text x="18" y="18" fill="currentColor" opacity=".45" fontSize="9" fontFamily="system-ui,sans-serif">Citation sources</text>
        <circle cx="100" cy="64" r="42" fill="none" stroke="currentColor" strokeWidth="20" opacity=".28" />
        <circle cx="100" cy="64" r="42" fill="none" stroke="currentColor" strokeWidth="20" 
          strokeDasharray="88 176" transform="rotate(-90 100 64)" />
        <circle cx="100" cy="64" r="42" fill="none" stroke="currentColor" strokeWidth="20" 
          strokeDasharray="82 176" transform="rotate(33 100 64)" opacity=".7" />
        <circle cx="100" cy="64" r="42" fill="none" stroke="currentColor" strokeWidth="20" 
          strokeDasharray="24 176" transform="rotate(145 100 64)" opacity=".5" />
      </svg>
    );
  }
  // recommendation-gap: rank vs mentions
  return (
    <svg viewBox="0 0 280 120" fill="none" aria-hidden="true">
      <text x="18" y="18" fill="currentColor" opacity=".45" fontSize="9" fontFamily="system-ui,sans-serif">Rank vs mentions</text>
      <rect x="36" y="28" width="72" height="72" rx="4" fill="currentColor" opacity=".22" />
      <rect x="132" y="58" width="72" height="42" rx="4" fill="currentColor" />
      <path d="M72 28 V100 M168 58 V100" stroke="currentColor" strokeWidth="1" opacity=".4" />
      <text x="48" y="118" fill="currentColor" opacity=".35" fontSize="8" fontFamily="system-ui,sans-serif">Known</text>
      <text x="148" y="118" fill="currentColor" opacity=".35" fontSize="8" fontFamily="system-ui,sans-serif">Selected</text>
    </svg>
  );
}

function getChartAttribution(slug) {
  if (slug === 'recommendation-gap-known-vs-selected') {
    return 'Illustrative concept';
  }
  if (slug === 'high-intent-prompt-intelligence') {
    return 'Berkos workspace · 90 days';
  }
  if (slug === 'authority-without-overexposure') {
    return 'Berkos workspace · 14 days';
  }
  return 'Live workspace';
}

export function ResearchCard({ article }) {
  return (
    <Link className="research-card" to={`/insights/${article.slug}`}>
      <div className="research-card__meta">
        <span>Research</span>
        <time dateTime={article.datePublished}>{formatInsightDate(article.datePublished)}</time>
      </div>
      <h3>{article.title}</h3>
      <p className="research-card__deck">{article.deck}</p>
      <div className="research-card__chart">
        <ResearchChart kind={article.slug} />
        <p className="research-card__axis">{getChartAttribution(article.slug)}</p>
      </div>
      <span className="research-card__read">Read</span>
    </Link>
  );
}

export function ResearchGrid({ articles }) {
  return (
    <div className="research-grid">
      {articles.map((article) => <ResearchCard key={article.slug} article={article} />)}
    </div>
  );
}

export function FaqAccordion({ items }) {
  const [open, setOpen] = React.useState(0);
  const id = React.useId();
  return (
    <div className="accordion">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div className="accordion__item" key={item.q}>
            <h3>
              <button
                id={`${id}-button-${index}`}
                aria-expanded={expanded}
                aria-controls={`${id}-content-${index}`}
                onClick={() => setOpen(expanded ? -1 : index)}
              >
                <span>{item.q}</span><span aria-hidden="true">{expanded ? '−' : '+'}</span>
              </button>
            </h3>
            <div
              id={`${id}-content-${index}`}
              role="region"
              aria-labelledby={`${id}-button-${index}`}
              hidden={!expanded}
            >
              <p>{item.a}</p>
              {item.links && item.links.length > 0 && (
                <p className="faq-links">
                  {item.links.map((link, linkIndex) => (
                    link.external ? (
                      <a key={linkIndex} href={link.href} target="_blank" rel="noopener">{link.text}</a>
                    ) : (
                      <Link key={linkIndex} to={link.href}>{link.text}</Link>
                    )
                  ))}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function BrandMark() {
  return (
    <img
      className="brand__mark"
      src="/logo.svg"
      alt=""
      width="28"
      height="23"
      decoding="async"
      aria-hidden="true"
    />
  );
}
