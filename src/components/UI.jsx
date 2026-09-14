import { Link } from 'react-router-dom';
import React from 'react';
import { assessmentHref } from '../data.js';
import { trackEvent } from '../analytics.js';
import { citationsData, promptsData } from '../data/workspaceData.js';

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useInView() {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!('IntersectionObserver' in window)) { setInView(true); return undefined; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.35 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

export function AnimatedNumber({ value, decimals = 0 }) {
  const [shown, setShown] = React.useState(value);
  const from = React.useRef(value);
  React.useEffect(() => {
    if (reducedMotion()) { from.current = value; setShown(value); return undefined; }
    const start = performance.now();
    const origin = from.current;
    let frame;
    const tick = (now) => {
      const t = Math.min((now - start) / 900, 1);
      from.current = origin + (value - origin) * (1 - (1 - t) ** 3);
      setShown(from.current);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return shown.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

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

export function PageHero({ eyebrow, title, copy, children }) {
  return (
    <section className="page-hero">
      <div className="shell">
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

function useTicker(running, ms) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    if (!running) return undefined;
    const timer = setInterval(() => setTick((n) => n + 1), ms);
    return () => clearInterval(timer);
  }, [running, ms]);
  return tick;
}

const gapRows = [
  { label: 'Known', brands: 8, you: true },
  { label: 'Shortlisted', brands: 3 },
  { label: 'Selected', brands: 1 }
];

function GapChart({ running }) {
  const cycle = useTicker(running, 7000);
  return (
    <div className="gap-chart" key={cycle}>
      {gapRows.map((row, r) => (
        <div className="gap-chart__row" style={{ '--row': r }} key={row.label}>
          <span className="gap-chart__label">{row.label}</span>
          <span className="gap-chart__dots">
            {Array.from({ length: row.brands }, (_, i) => (
              <React.Fragment key={i}>
                {row.you && i === 4 && <span className="gap-chart__dot gap-chart__dot--you" style={{ '--i': i }}><em>You</em></span>}
                <span className="gap-chart__dot" style={{ '--i': i + (row.you && i >= 4 ? 1 : 0) }} />
              </React.Fragment>
            ))}
            {!row.you && <span className="gap-chart__dot gap-chart__dot--missing" />}
          </span>
          <span className="gap-chart__count">{row.brands + (row.you ? 1 : 0)}</span>
        </div>
      ))}
      <p className="gap-chart__verdict">Known, not selected</p>
    </div>
  );
}

const intentPrompts = [
  { text: 'What is Limassol known for?', intent: 'Informational' },
  { text: 'Best developer for sea-view apartments in Limassol', intent: 'Commercial' },
  { text: 'How do property taxes work in Cyprus?', intent: 'Informational' },
  { text: 'History of Paphos old town', intent: 'Informational' },
  { text: 'Book a villa viewing in Protaras this week', intent: 'Transactional' },
  { text: 'Is Cyprus a good place to retire?', intent: 'Informational' },
  { text: 'Compare off-plan developers in Larnaca', intent: 'Commercial' },
  { text: 'Weather in Ayia Napa in March', intent: 'Informational' }
];

function IntentFeed({ running }) {
  const tick = useTicker(running, 1800) + 3;
  const split = promptsData.intentSplit;
  const highIntent = split.filter((s) => s.intent === 'Commercial' || s.intent === 'Transactional').reduce((sum, s) => sum + s.percent, 0);
  const count = intentPrompts.length;
  return (
    <div className="intent-feed">
      <div className="intent-feed__list">
        {[0, 1, 2, 3].map((pos) => {
          const n = tick - pos;
          const prompt = intentPrompts[n % count];
          const high = prompt.intent !== 'Informational';
          return (
            <div className="intent-feed__slot" key={n} style={{ transform: `translateY(${pos * 100}%)`, opacity: pos === 3 ? 0 : 1 }}>
              <div className={`intent-feed__item ${high ? 'is-high' : ''}`.trim()}>
                <span className="intent-feed__text">{prompt.text}</span>
                <span className="intent-feed__tag">{high ? 'High intent' : 'Info'}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="intent-bar">
        {split.map((s, i) => <span key={s.intent} style={{ width: `${s.percent}%`, background: s.color, '--i': i }} title={`${s.intent} ${s.percent}%`} />)}
      </div>
      <p className="intent-bar__legend">
        <strong><AnimatedNumber value={running ? highIntent : 0} />%</strong> high intent · {split[0].percent}% informational
      </p>
    </div>
  );
}

function CitationDonut({ running }) {
  const { byType, total } = citationsData;
  const active = useTicker(running, 2400) % byType.length;
  let offset = 0;
  const segments = byType.map((s) => {
    const pct = (s.count / total) * 100;
    const segment = { ...s, pct, offset };
    offset += pct;
    return segment;
  });
  return (
    <div className={`donut ${running ? 'is-cycling' : ''}`.trim()}>
      <div className="donut__figure">
        <svg className="donut__svg" viewBox="0 0 120 120" aria-hidden="true">
          {segments.map((s, i) => {
            const len = Math.max(s.pct - 0.8, 0.4);
            return (
              <circle
                key={s.type}
                className={`donut__seg ${i === active ? 'is-active' : ''}`.trim()}
                cx="60" cy="60" r="46" fill="none" pathLength="100"
                stroke={s.color}
                strokeDasharray={`${len} ${100 - len}`}
                strokeDashoffset={-s.offset}
                transform="rotate(-90 60 60)"
                style={{ '--i': i, strokeWidth: running && i === active ? 17 : 12 }}
              />
            );
          })}
        </svg>
        <div className="donut__center">
          <strong><AnimatedNumber value={running ? total : 0} /></strong>
          <span>citations</span>
        </div>
      </div>
      <ul className="donut__legend">
        {segments.map((s, i) => (
          <li className={running && i === active ? 'is-active' : ''} key={s.type}>
            <i style={{ background: s.color }} />{s.type}<b>{s.pct.toFixed(1)}%</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResearchChart({ kind, running }) {
  if (kind === 'high-intent-prompt-intelligence') return <IntentFeed running={running} />;
  if (kind === 'authority-without-overexposure') return <CitationDonut running={running} />;
  return <GapChart running={running} />;
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
  const [ref, inView] = useInView();
  const running = inView && !reducedMotion();
  return (
    <Link className="research-card" to={`/insights/${article.slug}`} ref={ref}>
      <div className="research-card__meta">
        <span>Research</span>
      </div>
      <h3>{article.title}</h3>
      <p className="research-card__deck">{article.deck}</p>
      <div className={`research-card__chart ${running ? 'is-running' : ''}`.trim()} aria-hidden="true">
        <ResearchChart kind={article.slug} running={running} />
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

export function FaqAccordion({ items, initialCount = 6 }) {
  const [open, setOpen] = React.useState(0);
  const [showAll, setShowAll] = React.useState(false);
  const id = React.useId();
  const visibleItems = showAll ? items : items.slice(0, initialCount);
  const hiddenCount = items.length - initialCount;
  return (
    <div className="accordion">
      {visibleItems.map((item, index) => {
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
      {!showAll && hiddenCount > 0 && (
        <button type="button" className="accordion__show-more" onClick={() => setShowAll(true)}>
          Show {hiddenCount} more question{hiddenCount === 1 ? '' : 's'}
          <span aria-hidden="true">↓</span>
        </button>
      )}
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
