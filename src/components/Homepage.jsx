import { useId, useRef, useState } from 'react';
import {
  faqs,
  measurementDimensions,
  platforms,
  processSteps,
  promptIntelligence,
  reputationRisks,
  sectorUseCases,
  sectors,
  servicePillars
} from '../data.js';
import { ArrowLink, AssessmentLink, Section, SectionHeader } from './UI.jsx';

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__media" aria-hidden="true">
        <img
          src="/images/hero.jpg"
          alt=""
          width="2400"
          height="1600"
          fetchPriority="high"
        />
      </div>
      <div className="hero-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
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

function MarketShift() {
  return (
    <Section tone="blue">
      <div className="shift">
        <p className="eyebrow">The market shift</p>
        <blockquote>Search presented options. AI increasingly presents a point of view.</blockquote>
        <div className="shift__comparison">
          <div>
            <span>Traditional discovery</span>
            <p>Compete to be clicked, then explain relevance on your own channels.</p>
          </div>
          <div>
            <span>AI-assisted decision</span>
            <p>Be interpreted, compared and potentially recommended inside the answer itself.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Risks() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Reputation exposure"
        title={<>Silence leaves the narrative <em>to other sources.</em></>}
        copy="AI systems synthesize what is available and credible—not what a brand intended to communicate."
      />
      <div className="risk-grid">
        {reputationRisks.map((risk) => (
          <article className="risk-card" key={risk.title}>
            <span className="risk-mark" aria-hidden="true">×</span>
            <h3>{risk.title}</h3>
            <p>{risk.text}</p>
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

function PromptIntelligence() {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabRefs = useRef([]);
  const onKeyDown = (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = active;
    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = promptIntelligence.length - 1;
    else next = (active + (event.key === 'ArrowRight' ? 1 : -1) + promptIntelligence.length) % promptIntelligence.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };
  const item = promptIntelligence[active];

  return (
    <Section tone="blue">
      <SectionHeader
        eyebrow="High-intent prompt intelligence"
        title={<>Track the questions that reveal <em>commercial intent.</em></>}
        copy="A mention in a generic answer is not equivalent to a recommendation in a live decision."
      />
      <div className="prompt-module">
        <div className="tabs" role="tablist" aria-label="Buyer journey stage" onKeyDown={onKeyDown}>
          {promptIntelligence.map((tab, index) => (
            <button
              key={tab.label}
              id={`${id}-tab-${index}`}
              role="tab"
              aria-selected={active === index}
              aria-controls={`${id}-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              ref={(element) => { tabRefs.current[index] = element; }}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>{tab.label}
            </button>
          ))}
        </div>
        <div
          className="prompt-panel"
          id={`${id}-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${active}`}
          tabIndex="0"
        >
          <div><p className="eyebrow">Illustrative buyer prompt</p><blockquote>{item.prompt}</blockquote></div>
          <div><h3>{item.title}</h3><p>{item.insight}</p></div>
        </div>
      </div>
    </Section>
  );
}

function UseCases() {
  return (
    <Section>
      <SectionHeader eyebrow="Sector use cases" title={<>Different categories. <em>Different trust signals.</em></>} />
      <div className="use-case-grid">
        {sectorUseCases.map((useCase) => (
          <article className="use-case" key={useCase.sector}>
            <p className="eyebrow">{useCase.sector}</p>
            <h3>{useCase.question}</h3>
            <p>{useCase.focus}</p>
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

function Measurement() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Measurement framework"
        title={<>Make AI reputation <em>observable.</em></>}
        copy="A baseline and reporting structure is agreed for each engagement. The interface below is conceptual and contains no client results or performance claims."
      />
      <div className="dashboard" aria-label="Conceptual AI reputation measurement dashboard">
        <div className="dashboard__top">
          <div><span className="status-dot" />Conceptual measurement view</div>
          <span>Illustrative framework · No live client data</span>
        </div>
        <div className="dashboard__body">
          <div className="dashboard__query">
            <span>Priority prompt set</span>
            <strong>High-intent buyer questions</strong>
            <small>Defined during discovery</small>
          </div>
          <div className="dashboard__dimensions">
            {measurementDimensions.map((dimension) => (
              <div key={dimension.title}><span>Review dimension</span><h3>{dimension.title}</h3><p>{dimension.text}</p></div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Authority() {
  return (
    <Section tone="blue">
      <div className="authority">
        <div>
          <p className="eyebrow">Authority, handled discreetly</p>
          <h2>Built to work with the reputation you already protect.</h2>
        </div>
        <div>
          <p>
            Engagements can operate alongside executive, brand, communications, digital and external advisory teams. Information access,
            publication and model-testing boundaries are agreed before activation.
          </p>
          <ul className="check-list">
            <li>Approval-led workflows</li>
            <li>Need-to-know access</li>
            <li>Placeholder-safe reporting</li>
            <li>No fabricated proof or public attribution</li>
          </ul>
          <p className="placeholder-note">Client identities and engagement details are shared only when appropriate and authorized.</p>
        </div>
      </div>
    </Section>
  );
}

function Exclusivity() {
  return (
    <Section>
      <div className="exclusivity">
        <p className="eyebrow">Selective by design</p>
        <h2>Category attention requires category focus.</h2>
        <p>
          Alora limits concurrent mandates to preserve senior attention, discretion and meaningful market separation. Potential conflicts
          are reviewed before an engagement is accepted.
        </p>
        <AssessmentLink variant="outline" placement="homepage-exclusivity">Discuss category availability</AssessmentLink>
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
        <p>Review your recommendation presence, narrative accuracy and highest-priority authority gaps.</p>
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
      <MarketShift />
      <Risks />
      <Differentiation />
      <Services />
      <PromptIntelligence />
      <UseCases />
      <Process />
      <Measurement />
      <Authority />
      <Exclusivity />
      <FAQ />
      <FinalCta />
    </>
  );
}
