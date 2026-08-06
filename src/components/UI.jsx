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
      <p className="eyebrow">{eyebrow}</p>
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
      <span aria-hidden="true">↗</span>
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

export function PageHero({ eyebrow, title, copy, breadcrumbs = [], children, image, imageAlt = '' }) {
  return (
    <section className={`page-hero${image ? ' page-hero--media' : ''}`}>
      {image && (
        <div className="page-hero__media" aria-hidden={imageAlt ? undefined : true}>
          <img src={image} alt={imageAlt} width="1600" height="1000" fetchPriority="high" />
        </div>
      )}
      <div className="shell">
        <Breadcrumbs items={breadcrumbs} />
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero__copy">{copy}</p>
        {children && <div className="page-hero__actions">{children}</div>}
      </div>
    </section>
  );
}

export function CtaBand({
  eyebrow = 'Private AI visibility assessment',
  title = 'See where your brand belongs in the answer.',
  copy = 'Establish how selected assistants currently interpret your brand, which high-intent questions matter, and where authority gaps limit recommendation.',
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
