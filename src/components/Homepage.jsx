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
          Alora builds custom AI Search marketing infrastructure for brands that want to lead the next iteration of the Internet. Data tells us where to act. Our infrastructure lets us execute faster, learn continuously, and compound results over time.
        </p>
        <p className="hero__tagline">Built to adapt. Built to compound.</p>
        <div className="hero__actions">
          <AssessmentLink placement="homepage-hero">Private assessment</AssessmentLink>
        </div>
      </div>
    </section>
  );
}

function PlatformGrid() {
  return (
    <Section id="context">
      <div className="platform-grid" aria-label="AI platforms considered in our work">
        {platforms.map((platform) => <span key={platform}>{platform}</span>)}
      </div>
    </Section>
  );
}

function Research() {
  return (
    <Section id="research">
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
    <Section id="industries">
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
    <Section id="services">
      <SectionHeader
        eyebrow="Four service pillars"
        title="Custom infrastructure for AI Search growth."
        copy="We identify where to act, execute through custom infrastructure, then learn and compound from the results."
      />
      <div className="service-list">
        {servicePillars.map((service) => (
          <article className="service-row" key={service.n}>
            <span className="card-number">// {service.n}</span>
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
    <Section id="faq">
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
