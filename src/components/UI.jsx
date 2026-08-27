import { Link } from 'react-router-dom';
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

export function PageHero({ eyebrow, title, copy, breadcrumbs = [], children }) {
  return (
    <section className="page-hero">
      <div className="shell">
        <Breadcrumbs items={breadcrumbs} />
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

function ResearchChart({ kind }) {
  if (kind === 'high-intent-prompt-intelligence') {
    return (
      <svg viewBox="0 0 280 120" fill="none" aria-hidden="true">
        <rect x="18" y="78" width="28" height="28" fill="currentColor" opacity=".28" />
        <rect x="62" y="54" width="28" height="52" fill="currentColor" opacity=".45" />
        <rect x="106" y="22" width="28" height="84" fill="currentColor" />
        <rect x="150" y="64" width="28" height="42" fill="currentColor" opacity=".35" />
        <rect x="194" y="72" width="28" height="34" fill="currentColor" opacity=".22" />
        <rect x="238" y="86" width="28" height="20" fill="currentColor" opacity=".16" />
      </svg>
    );
  }
  if (kind === 'authority-without-overexposure') {
    return (
      <svg viewBox="0 0 280 120" fill="none" aria-hidden="true">
        <circle cx="96" cy="64" r="38" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="168" cy="64" r="58" stroke="currentColor" strokeWidth="1" opacity=".28" />
        <path d="M38 88 C78 40, 202 40, 242 88" stroke="currentColor" strokeWidth="1.5" opacity=".7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 280 120" fill="none" aria-hidden="true">
      <rect x="36" y="28" width="72" height="72" fill="currentColor" opacity=".22" />
      <rect x="132" y="58" width="72" height="42" fill="currentColor" />
      <path d="M72 28 V100 M168 58 V100" stroke="currentColor" strokeWidth="1" opacity=".4" />
    </svg>
  );
}

export function ResearchCard({ article }) {
  return (
    <Link className="research-card" to={`/insights/${article.slug}`}>
      <div className="research-card__meta">
        <span>Research</span>
        <time dateTime={article.datePublished}>{formatInsightDate(article.datePublished)}</time>
      </div>
      <h3>{article.title}</h3>
      <div className="research-card__chart">
        <ResearchChart kind={article.slug} />
        <p className="research-card__axis">Framework — illustrative</p>
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

export function BrandMark() {
  return <span className="brand__mark" aria-hidden="true" />;
}
