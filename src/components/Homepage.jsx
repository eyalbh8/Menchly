import { useId, useState } from 'react';
import {
  faqs,
  platforms,
  processSteps,
  sectors,
  servicePillars
} from '../data.js';
import { ArrowLink, AssessmentLink, Section, SectionHeader } from './UI.jsx';

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__media" aria-hidden="true">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="shell hero__inner">
        <p className="eyebrow">AI visibility &amp; reputation for high-consideration brands</p>
        <h1>
          Be the brand AI recommends <em>to the right buyer.</em>
        </h1>
        <p className="hero__copy">
          Alora helps luxury and high-consideration brands earn credible recommendation when a serious buyer asks an AI assistant who to
          trust, compare or choose.
        </p>
        <div className="hero__actions">
          <AssessmentLink placement="homepage-hero" />
          <ArrowLink href="#context">Explore the approach</ArrowLink>
        </div>
        <div className="hero__distinction" aria-label="Our focus">
          <span>Not visibility for its own sake</span>
          <strong>Recommendation in the moments that matter</strong>
        </div>
      </div>
    </section>
  );
}

function PlatformContext() {
  return (
    <Section id="context" tone="paper">
      <div className="split-intro">
        <SectionHeader
          eyebrow="A new decision layer"
          title={<>Your brand is already being interpreted <em>before the first conversation.</em></>}
        />
        <div className="prose">
          <p>
            Buyers now use AI assistants to define a category, compare providers, test reputations and assemble shortlists. The answer can
            shape preference before a prospect visits your website or speaks with an advisor.
          </p>
          <p>
            The strategic question is no longer only “Can they find us?” It is “Will we be understood, trusted and recommended for the
            right reasons?”
          </p>
        </div>
      </div>
      <div className="context-shift">
        <blockquote>Search presented options. AI increasingly presents a point of view.</blockquote>
      </div>
      <div className="platform-row" aria-label="AI platforms considered in our work">
        {platforms.map((platform) => <span key={platform}>{platform}</span>)}
      </div>
    </Section>
  );
}

function SectorFocus() {
  return (
    <Section id="sectors">
      <SectionHeader
        eyebrow="Sector focus"
        title={<>Built for considered decisions, <em>not mass attention.</em></>}
        copy="Our work is designed for categories where the buyer is selective, the journey is private and reputation carries disproportionate weight."
      />
      <div className="sector-grid">
        {sectors.map((sector, index) => (
          <article className="sector-card" key={sector.name}>
            <div className="sector-card__media">
              <img src={sector.image} alt={sector.imageAlt} width="800" height="500" loading="lazy" />
            </div>
            <div className="sector-card__body">
              <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{sector.name}</h3>
              <p>{sector.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Differentiation() {
  return (
    <Section tone="paper">
      <div className="differentiation">
        <SectionHeader eyebrow="Our distinction" title={<>Visibility is an input. <em>Recommendation is the objective.</em></>} />
        <div className="differentiation__body">
          <p className="large-copy">
            We do not optimize for indiscriminate mentions. We identify the high-intent questions that signal fit, then strengthen the
            authority and reputation signals that help a buyer—or assistant—understand why your brand belongs in that answer.
          </p>
          <div className="principles">
            <span>Right buyer</span><span>Right context</span><span>Credible evidence</span><span>Accurate narrative</span>
          </div>
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
        title={<>A connected system for <em>authority and recommendation.</em></>}
        copy="Strategy, activation and monitoring are designed as one continuous discipline."
      />
      <div className="service-list">
        {servicePillars.map((service) => (
          <article className="service-row" key={service.n}>
            <span className="card-number">{service.n}</span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Process() {
  return (
    <Section id="process" tone="paper">
      <SectionHeader
        eyebrow="Six-step process"
        title={<>From model perception to <em>market authority.</em></>}
        copy="Each engagement is scoped around the brand’s decision journey, operating context and approval requirements."
      />
      <ol className="process-list">
        {processSteps.map((step) => (
          <li key={step.n}>
            <span>{step.n}</span><div><h3>{step.title}</h3><p>{step.text}</p></div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  const id = useId();
  return (
    <Section id="faq">
      <div className="faq-layout">
        <SectionHeader eyebrow="Frequently asked" title={<>A clear view of <em>the discipline.</em></>} />
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

function FinalCta() {
  return (
    <section className="final-cta">
      <div className="shell">
        <p className="eyebrow">Private AI visibility assessment</p>
        <h2>Know what AI says before your next buyer asks.</h2>
        <p>
          Review your recommendation presence, narrative accuracy and highest-priority authority gaps. Engagements are selective by design—
          category attention requires category focus.
        </p>
        <AssessmentLink placement="homepage-final">Request a private assessment</AssessmentLink>
      </div>
    </section>
  );
}

export default function Homepage() {
  return (
    <>
      <Hero />
      <PlatformContext />
      <SectorFocus />
      <Differentiation />
      <Services />
      <Process />
      <FAQ />
      <FinalCta />
    </>
  );
}
