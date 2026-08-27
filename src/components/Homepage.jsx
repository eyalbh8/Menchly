import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { faqs, platforms, servicePillars } from '../data.js';
import { insightArticles } from '../content/insights.js';
import { industryCards } from '../pageContent.js';
import { AssessmentLink, ResearchGrid, Section, SectionHeader } from './UI.jsx';

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="shell hero__inner">
        <h1 className="hero__ghost">
          <span className="hero__ghost-brand">AI Search Marketing</span>
          <span className="hero__ghost-rest">Infrastructure.</span>
        </h1>
        <hr className="hero__rule" />
        <p className="hero__copy">
          Menchly builds custom AI Search marketing infrastructure for brands that want to lead the next iteration of the Internet. Data tells us where to act. Our infrastructure lets us execute faster, learn continuously, and compound results over time.
        </p>
        <p className="hero__tagline">Built to adapt. Built to compound.</p>
        <div className="hero__actions">
          <AssessmentLink placement="homepage-hero">Private assessment</AssessmentLink>
        </div>
      </div>
    </section>
  );
}

function PlatformIcon({ id }) {
  const common = { viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true };
  if (id === 'chatgpt') {
    return (
      <svg {...common}>
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
      </svg>
    );
  }
  if (id === 'claude') {
    return (
      <svg {...common}>
        <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
      </svg>
    );
  }
  if (id === 'gemini') {
    return (
      <svg {...common}>
        <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
      </svg>
    );
  }
  if (id === 'perplexity') {
    return (
      <svg {...common}>
        <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M23.922 16.997C23.061 18.492 18.063 22.02 12 22.02 5.937 22.02.939 18.492.078 16.997A.641.641 0 0 1 0 16.741v-2.869a.883.883 0 0 1 .053-.22c.372-.935 1.347-2.292 2.605-2.656.167-.429.414-1.055.644-1.517a10.098 10.098 0 0 1-.052-1.086c0-1.331.282-2.499 1.132-3.368.397-.406.89-.717 1.474-.952C7.255 2.937 9.248 1.98 11.978 1.98c2.731 0 4.767.957 6.166 2.093.584.235 1.077.546 1.474.952.85.869 1.132 2.037 1.132 3.368 0 .368-.014.733-.052 1.086.23.462.477 1.088.644 1.517 1.258.364 2.233 1.721 2.605 2.656a.841.841 0 0 1 .053.22v2.869a.641.641 0 0 1-.078.256Zm-11.75-5.992h-.344a4.359 4.359 0 0 1-.355.508c-.77.947-1.918 1.492-3.508 1.492-1.725 0-2.989-.359-3.782-1.259a2.137 2.137 0 0 1-.085-.104L4 11.746v6.585c1.435.779 4.514 2.179 8 2.179 3.486 0 6.565-1.4 8-2.179v-6.585l-.098-.104s-.033.045-.085.104c-.793.9-2.057 1.259-3.782 1.259-1.59 0-2.738-.545-3.508-1.492a4.359 4.359 0 0 1-.355-.508Zm2.328 3.25c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm-5 0c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm3.313-6.185c.136 1.057.403 1.913.878 2.497.442.544 1.134.938 2.344.938 1.573 0 2.292-.337 2.657-.751.384-.435.558-1.15.558-2.361 0-1.14-.243-1.847-.705-2.319-.477-.488-1.319-.862-2.824-1.025-1.487-.161-2.192.138-2.533.529-.269.307-.437.808-.438 1.578v.021c0 .265.021.562.063.893Zm-1.626 0c.042-.331.063-.628.063-.894v-.02c-.001-.77-.169-1.271-.438-1.578-.341-.391-1.046-.69-2.533-.529-1.505.163-2.347.537-2.824 1.025-.462.472-.705 1.179-.705 2.319 0 1.211.175 1.926.558 2.361.365.414 1.084.751 2.657.751 1.21 0 1.902-.394 2.344-.938.475-.584.742-1.44.878-2.497Z" />
    </svg>
  );
}

function PlatformGrid() {
  return (
    <Section id="context" tone="paper">
      <div className="platform-grid" aria-label="AI platforms considered in our work">
        {platforms.map((platform) => (
          <span key={platform.id} className="platform-grid__item">
            <span className="platform-grid__icon">
              <PlatformIcon id={platform.id} />
            </span>
            <span className="platform-grid__name">{platform.name}</span>
          </span>
        ))}
      </div>
    </Section>
  );
}

function Research() {
  return (
    <Section id="research" tone="blue">
      <div className="section-head">
        <h2>Research</h2>
        <Link className="section-head__link" to="/insights" aria-label="See all research">→</Link>
      </div>
      <ResearchGrid articles={insightArticles} />
    </Section>
  );
}

function Industries() {
  const [featured, ...rest] = industryCards;
  return (
    <Section id="industries" tone="paper">
      <div className="section-head">
        <h2>Industries</h2>
        <Link className="section-head__link" to="/industries" aria-label="See all industries">→</Link>
      </div>
      <div className="work-layout">
        <Link className="work-featured" to={featured.href}>
          <img src={featured.image} alt={featured.imageAlt} width="1200" height="800" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
          <div className="work-featured__body">
            <p className="eyebrow">Industry</p>
            <h3>{featured.title}</h3>
            <p>{featured.copy}</p>
          </div>
        </Link>
        <div className="work-list">
          {rest.map((item) => (
            <Link key={item.href} to={item.href}>
              <p className="eyebrow">Industry</p>
              <h3>{item.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Services() {
  return (
    <Section id="services" tone="blue">
      <SectionHeader
        eyebrow="Four service pillars"
        title="Custom infrastructure for AI Search growth."
        copy="We identify where to act, execute through custom infrastructure, then learn and compound from the results."
      />
      <div className="service-list">
        {servicePillars.map((service) => (
          <article className="service-row" key={service.n}>
            <span className="card-number">→ {service.n}</span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  const id = useId();
  return (
    <Section id="faq" tone="paper">
      <div className="faq-layout">
        <SectionHeader eyebrow="Frequently asked" title="A clear view of the discipline." />
        <div className="accordion">
          {faqs.map((item, index) => {
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export default function Homepage() {
  return (
    <>
      <Hero />
      <PlatformGrid />
      <Research />
      <Industries />
      <Services />
      <FAQ />
    </>
  );
}
