import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { industryCards, industryProfiles, methodologyStages, measurementDimensions, methodologyFaqs, methodologySources, serviceDetails } from '../pageContent.js';
import { productImages, serviceFaqs } from '../data.js';
import { getInsightArticle, insightArticles, EDITORIAL_ORGANIZATION, EXPERT_REVIEW_STATUS } from '../content/insights.js';
import { calendarUrl } from '../cal.js';
import BookMeeting from './BookMeeting.jsx';
import { AssessmentLink, CtaBand, InternalLink, PageHero, ProductStage, ResearchGrid, Section, SectionHeader, FaqAccordion } from './UI.jsx';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function CardGrid({ items, className = '' }) {
  return (
    <div className={`page-card-grid ${className}`.trim()}>
      {items.map((item, index) => (
        <article className="page-card" key={item.title}>
          {item.image && (
            <div className="page-card__media">
              <img src={item.image} alt={item.imageAlt || ''} width="800" height="500" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
            </div>
          )}
          <div className="page-card__body">
            <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
            {item.href && <InternalLink to={item.href}>Explore {item.title}</InternalLink>}
          </div>
        </article>
      ))}
    </div>
  );
}

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>Custom infrastructure for <em>AI Search growth.</em></>}
        copy="We don’t sell packages or self-serve tooling We build the marketing infrastructure that turns AI Search signals into continuous, compounding execution"
      >
        <AssessmentLink placement="services-hero">Discuss your recommendation priorities</AssessmentLink>
      </PageHero>
      <Section tone="paper">
        <div className="split-intro">
          <SectionHeader eyebrow="A connected discipline" title={<>From signal to <em>compounding execution.</em></>} />
          <div className="prose">
            <p>We don’t offer cookie-cutter packages or self-serve solutions Data tells us where to act; custom infrastructure lets us execute faster, learn continuously, and compound results over time.</p>
            <p>Our services begin with decision context We identify the audiences, questions and criteria closest to commercial intent, then build the infrastructure that helps assistants interpret the brand accurately.</p>
          </div>
        </div>
      </Section>
      <Section>
        <div className="service-detail-list">
          {serviceDetails.map((service) => (
            <article className="service-detail" key={service.number}>
              <div>
                <span className="card-number">→ {service.number}</span>
                <h2>{service.title}</h2>
                {service.image && (
                  <ProductStage
                    className="product-stage--compact"
                    src={service.image}
                    alt={service.imageAlt || ''}
                  />
                )}
              </div>
              <div>
                <p>{service.copy}</p>
                <ul>{service.outputs.map((output) => <li key={output}>{output}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="paper">
        <div className="split-intro">
          <SectionHeader eyebrow="Built for your market" title={<>Who this is for.</>} />
          <div className="prose">
            <p>Menchly works with reputation-sensitive, high-consideration markets where buyers research deeply, decisions carry meaningful consequence, and a generic mention is no substitute for a credible, context-specific recommendation. Each programme is built around the language, intermediaries, evidence and reputation dynamics of the market rather than a universal prompt template.</p>
            <p>Current sector focus includes <InternalLink to="/industries/yachting">yachting</InternalLink>, <InternalLink to="/industries/private-aviation">private aviation</InternalLink>, <InternalLink to="/industries/luxury-real-estate">luxury real estate</InternalLink>, <InternalLink to="/industries/jewellery-watches">jewellery & watches</InternalLink>, and <InternalLink to="/industries/luxury-hospitality">luxury hospitality</InternalLink>. Buyers in these markets ask which operator fits a mission, which builder belongs on a shortlist, which adviser can serve a family office, or which property matches a precise need — questions that demand fit, provenance and trust, not volume.</p>
            <p>The approach applies to any market where <a href="https://arxiv.org/abs/2311.09735" target="_blank" rel="noopener">authority signals and citation quality</a> shape recommendation, where reputation precedes revenue, and where being recommended for the wrong reason carries commercial cost. <InternalLink to="/industries">View all industries</InternalLink></p>
          </div>
        </div>
      </Section>
      <Section>
        <SectionHeader eyebrow="How we work" title={<>A disciplined path from signal to compounding results.</>} />
        <ol className="method-grid">
          {methodologyStages.map((stage, index) => (
            <li key={stage.slug}><span>{String(index + 1).padStart(2, '0')}</span><h3>{stage.title}</h3><p>{stage.copy}</p></li>
          ))}
        </ol>
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <InternalLink to="/methodology">See the full methodology</InternalLink>
        </div>
      </Section>
      <Section tone="blue">
        <div className="editorial-block">
          <SectionHeader eyebrow="Foundation" title={<>Evidence-led, not keyword-led.</>} />
          <div className="prose prose--dark">
            <p>AI assistants rely on the same foundational web signals as traditional search — content quality, entity relationships, authoritative sources and current facts — but they synthesize those signals into natural language rather than ranking pages. <a href="https://arxiv.org/abs/2311.09735" target="_blank" rel="noopener">Research shows</a> that content with clear structure, cited statistics, quotations from credible sources and direct answers to specific questions can improve visibility by up to 40% in AI-generated responses.</p>
            <p><a href="https://developers.google.com/search/docs/appearance/ai-features" target="_blank" rel="noopener">Google and other major platforms</a> have stated that no special schema, AI text file or machine-readable markup is required for AI visibility. What matters is the visible content itself: clear answers to real buyer questions, supported by credible evidence. Our work strengthens the owned and earned authority environment that influences whether a brand is understood and considered.</p>
            <InternalLink to="/insights">Read research perspectives</InternalLink>
            {' · '}
            <InternalLink to="/about">About Menchly</InternalLink>
          </div>
        </div>
      </Section>
      <Section tone="blue">
        <div className="editorial-block">
          <SectionHeader eyebrow="Engagement design" title={<>Senior, selective and <em>built around your operating reality.</em></>} />
          <div className="prose prose--dark">
            <p>Menchly can lead a defined strategic engagement or work as a specialist layer alongside brand, communications, SEO, content and reputation partners.</p>
            <p>Scope, access and approval controls are agreed at the outset. No responsible agency can guarantee an independent model recommendation; our role is to improve the clarity, credibility and authority on which those recommendations may depend.</p>
            <InternalLink to="/methodology">Review the methodology</InternalLink>
          </div>
        </div>
      </Section>
      <Section>
        <SectionHeader eyebrow="Frequently asked" title="Engagement questions" />
        <div className="faq-list">
          {serviceFaqs.map((faq) => (
            <div key={faq.q} className="faq-item">
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
              {faq.links && faq.links.length > 0 && (
                <p>
                  {faq.links.map((link, i) => (
                    <span key={i}>
                      {i > 0 && ' · '}
                      {link.external ? (
                        <a href={link.href} target="_blank" rel="noopener">{link.text}</a>
                      ) : (
                        <InternalLink to={link.href}>{link.text}</InternalLink>
                      )}
                    </span>
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}

export function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>High-consideration markets where <em>reputation shapes access.</em></>}
        copy="We work where buyers research privately, decisions carry meaningful consequence and a generic mention is no substitute for a credible, context-specific recommendation"
      />
      <Section tone="paper">
        <div className="split-intro">
          <SectionHeader eyebrow="Sector focus" title={<>Recommendation requires <em>category fluency.</em></>} />
          <div className="prose">
            <p>A family office choosing an aviation adviser asks different questions from a collector choosing a specialist or a guest selecting a resort The signals of authority, fit and trust are category-specific.</p>
            <p>Menchly builds each programme around the language, intermediaries, evidence and reputation dynamics of the market - not a universal prompt template.</p>
          </div>
        </div>
      </Section>
      <Section>
        <SectionHeader
          eyebrow="Current focus"
          title={<>Explore the buyer questions that <em>shape each shortlist.</em></>}
          copy="Each sector view outlines illustrative high-intent questions and the authority conditions that influence recommendation"
        />
        <CardGrid items={industryCards} />
      </Section>
      <CtaBand title="Understand where your category chooses" />
    </>
  );
}

function DetailList({ title, items, ordered = false }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <div className="detail-list">
      <h2>{title}</h2>
      <Tag>{items.map((item) => <li key={item}>{item}</li>)}</Tag>
    </div>
  );
}

export function IndustryPage() {
  const { industrySlug } = useParams();
  const industry = industryProfiles.find((item) => item.slug === industrySlug);
  if (!industry) return <Navigate to="/industries" replace />;

  return (
    <>
      <PageHero
        eyebrow={industry.eyebrow}
        title={<>Be recommended when the <em>right buyer is deciding.</em></>}
        copy={industry.summary}
      >
        <AssessmentLink placement={`industry-${industry.slug}-hero`}>Discuss {industry.name.toLowerCase()} visibility</AssessmentLink>
      </PageHero>
      <Section tone="paper">
        <div className="split-intro">
          <SectionHeader eyebrow="The decision environment" title={<>Earn relevance <em>before intent is visible.</em></>} />
          <div className="prose"><p>{industry.introduction}</p></div>
        </div>
      </Section>
      <Section>
        <div className="detail-grid">
          <DetailList title="Target audience roles" items={industry.audiences} />
          <DetailList title="Example high-intent questions" items={industry.questions} />
        </div>
      </Section>
      <Section tone="blue">
        <div className="detail-grid">
          <DetailList title="Visibility and reputation barriers" items={industry.barriers} />
          <div className="detail-narrative">
            <p className="eyebrow">Agency intervention</p>
            <h2>Make expertise easier to interpret and trust.</h2>
            <p>{industry.intervention}</p>
          </div>
        </div>
      </Section>
      <Section tone="paper">
        <div className="detail-grid">
          <DetailList title="Relevant authority signals" items={industry.signals} />
          <div className="detail-narrative detail-narrative--paper">
            <p className="eyebrow">Qualitative commercial opportunity</p>
            <h2>Improve the quality of consideration.</h2>
            <p>{industry.opportunity}</p>
            <small>This is a strategic opportunity statement, not a performance claim or forecast.</small>
          </div>
        </div>
      </Section>
      <Section>
        <div className="next-links">
          <div><p className="eyebrow">Continue exploring</p><h2>Related industry perspectives</h2></div>
          <div>
            {industryProfiles.filter((item) => item.slug !== industry.slug).slice(0, 3).map((item) => (
              <InternalLink key={item.slug} to={`/industries/${item.slug}`}>{item.name}</InternalLink>
            ))}
          </div>
        </div>
      </Section>
      <CtaBand title={`Establish your ${industry.name.toLowerCase()} recommendation baseline.`} />
    </>
  );
}

export function MethodologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Methodology"
        title={<>A disciplined path from signal to <em>compounding results.</em></>}
        copy="Data tells us where to act. The methodology turns those signals into infrastructure that executes faster, learns continuously, and compounds over time."
      >
        <AssessmentLink placement="methodology-hero">Request a private baseline</AssessmentLink>
      </PageHero>
      <Section tone="paper">
        <div className="split-intro">
          <SectionHeader eyebrow="Working principle" title={<>Measure what matters <em>to the decision.</em></>} />
          <div className="prose">
            <p>We do not treat every prompt, platform or mention as equal. Priority comes from the intersection of high buyer intent, strategic fit and credible authority the brand can substantiate.</p>
            <p>The approach combines repeatable review with informed judgement. AI outputs are variable, so findings are interpreted as directional evidence - not deterministic rankings or guaranteed outcomes.</p>
          </div>
        </div>
      </Section>
      <Section>
        <SectionHeader eyebrow="Six stages" title={<>From executive context to <em>continuous learning.</em></>} />
        <ol className="method-grid">
          {methodologyStages.map((stage, index) => (
            <li key={stage.slug}><span>{String(index + 1).padStart(2, '0')}</span><h3>{stage.title}</h3><p>{stage.copy}</p></li>
          ))}
        </ol>
      </Section>
      {methodologyStages.map((stage, index) => (
        <Section key={stage.slug} tone={index % 2 === 0 ? 'paper' : 'white'}>
          <div className="detail-grid">
            <div className="detail-list">
              <h2>{stage.question}</h2>
              <p style={{ marginBottom: '28px', color: 'var(--muted)', fontSize: '15px', lineHeight: '1.75' }}>{stage.copy}</p>
              <h3 style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: '600', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--muted-dark)' }}>Inputs</h3>
              <ul style={{ margin: '0 0 32px', padding: '0', listStyle: 'none' }}>
                {stage.inputs.map((input) => <li key={input} style={{ padding: '12px 0', borderBottom: '1px solid var(--line)', fontSize: '15px', color: 'var(--ink)' }}>{input}</li>)}
              </ul>
              <h3 style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: '600', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--muted-dark)' }}>Outputs</h3>
              <ul style={{ margin: 0, padding: '0', listStyle: 'none' }}>
                {stage.outputs.map((output) => <li key={output} style={{ padding: '12px 0', borderBottom: '1px solid var(--line)', fontSize: '15px', color: 'var(--ink)' }}>{output}</li>)}
              </ul>
            </div>
            <div className="detail-narrative">
              <p className="eyebrow">Stage {String(index + 1).padStart(2, '0')}</p>
              <h2>{stage.title}</h2>
              {index === 2 && (
                <p style={{ marginTop: '20px' }}>
                  <InternalLink to="/insights/high-intent-prompt-intelligence">High-intent prompt intelligence</InternalLink>
                </p>
              )}
              {index === 3 && (
                <p style={{ marginTop: '20px' }}>
                  <InternalLink to="/insights/authority-without-overexposure">Authority without overexposure</InternalLink>
                </p>
              )}
            </div>
          </div>
        </Section>
      ))}
      <Section tone="blue">
        <div className="editorial-block">
          <SectionHeader eyebrow="Decision framework" title={<>Four dimensions keep reporting <em>commercially grounded.</em></>} />
          <div className="metric-list">
            {measurementDimensions.map((dimension) => <div key={dimension.term}><h3>{dimension.term}</h3><p>{dimension.definition}</p></div>)}
          </div>
          <div className="methodology-visual">
            <ProductStage
              src={productImages.sentiment}
              alt="Menchly Sentiment view showing score, trend and recent AI responses"
            />
          </div>
          <p style={{ marginTop: '32px', textAlign: 'center' }}>
            <InternalLink to="/services">Explore our services</InternalLink>
          </p>
        </div>
      </Section>
      <Section tone="paper">
        <div className="split-intro">
          <SectionHeader title={<>Defined terms</>} />
          <div style={{ paddingTop: '32px' }}>
            <dl style={{ margin: 0 }}>
              {measurementDimensions.map((dimension, index) => (
                <div key={dimension.term} style={{ paddingTop: index > 0 ? '28px' : 0, borderTop: index > 0 ? '1px solid var(--line)' : 'none' }}>
                  <dt style={{ margin: '0 0 12px', fontSize: '19px', fontWeight: '700', color: 'var(--ink)' }}>{dimension.term}</dt>
                  <dd style={{ margin: 0, fontSize: '15px', lineHeight: '1.75', color: 'var(--muted)' }}>{dimension.definition}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>
      <Section>
        <div className="faq-layout">
          <SectionHeader eyebrow="Frequently asked" title="A disciplined view of the practice" />
          <FaqAccordion items={methodologyFaqs} />
        </div>
      </Section>
      <Section tone="paper" className="article-sources">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <SectionHeader eyebrow="Sources" title="Further reading and primary references" />
          <ol>
            {methodologySources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener">{source.title}</a>
                <span>{source.organization}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>
      <Section>
        <div className="next-links">
          <div><p className="eyebrow">Continue exploring</p><h2>Related services and perspectives</h2></div>
          <div>
            <InternalLink to="/services">AI Search marketing services</InternalLink>
            <InternalLink to="/industries">Industry perspectives</InternalLink>
            <InternalLink to="/insights">Research and insights</InternalLink>
            <InternalLink to="/about">About Menchly</InternalLink>
          </div>
        </div>
      </Section>
      <CtaBand title="Start with a clear recommendation baseline" placement="methodology-footer" />
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Menchly"
        title={<>AI Search marketing infrastructure, <em>built around each client.</em></>}
        copy="Menchly is a data-driven AI Search marketing partner We do not offer cookie-cutter packages or self-serve solutions We build custom infrastructure around each client, using data to identify where to act, executing at speed, and continuously learning from results"
      />
      <Section tone="paper">
        <div className="split-intro">
          <SectionHeader eyebrow="Our purpose" title={<>Infrastructure built to <em>learn and compound.</em></>} />
          <div className="prose">
            <p>The strongest brand is not always the best understood Valuable expertise can remain hidden behind confidentiality, fragmented sources, legacy narratives or language too broad to help an assistant distinguish fit.</p>
            <p>We build custom marketing infrastructure around each client so data can show where to act, execution can move at speed, and results can compound as the system learns.</p>
          </div>
        </div>
      </Section>
      <Section>
        <SectionHeader eyebrow="How we work" title={<>Senior judgement <em>Evidence before claims.</em></>} />
        <CardGrid items={[
          { title: 'Selective focus', copy: 'We concentrate on reputation-sensitive categories and review potential conflicts before accepting a mandate.' },
          { title: 'Executive alignment', copy: 'Commercial priorities, audience fit, confidentiality and governance are agreed before activation begins.' },
          { title: 'Integrated delivery', copy: 'We complement internal teams and established agencies, clarifying where each intervention should be owned.' },
          { title: 'Responsible practice', copy: 'We do not fabricate proof, promise model outcomes or publish sensitive information without authorisation.' }
        ]} />
      </Section>
      <Section tone="blue">
        <div className="editorial-block">
          <SectionHeader eyebrow="The Menchly view" title={<>Recommendation should be earned <em>for a reason.</em></>} />
          <div className="prose prose--dark">
            <p>Broad visibility can create attention High-quality recommendation creates informed consideration We focus on the latter: the moments when a buyer’s question reveals a real need and the answer must connect the brand to credible evidence of fit.</p>
            <InternalLink to="/services">Explore our services</InternalLink>
          </div>
        </div>
      </Section>
      <CtaBand title="Discuss whether Menchly is the right fit" />
    </>
  );
}

export function InsightsPage() {
  const allDefinitions = insightArticles.flatMap((article) => 
    article.definitions.map((def) => ({ ...def, articleSlug: article.slug }))
  );

  const researchFaqs = [
    { 
      q: 'What is a Menchly research note?',
      a: 'A research note is a strategic perspective on AI Search marketing prepared by Menchly Editorial for leaders responsible for brand, reputation and growth. Each note addresses a decision question, provides working definitions and outlines evidence-led frameworks. Notes are not client work, performance claims or forecasts.'
    },
    {
      q: 'Why is expert review pending?',
      a: 'Each note is prepared by Menchly Editorial and carries a visible pending-review label until an independent domain expert has reviewed and approved it. Expert review is required before the pending status is removed.'
    },
      {
        q: 'May I cite a Menchly research note?',
        a: 'Yes. Notes may be cited with attribution to Menchly Editorial and a link to the original. The note\'s publication and review dates are visible on each article page, and all primary sources are listed with links.'
      },
    {
      q: 'How often are notes updated?',
      a: 'Notes are reviewed periodically for accuracy and relevance. The last-reviewed date is shown on each article page. Material updates will be reflected in the dateModified property and visible change log when appropriate.'
    }
  ];

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={<>Strategic perspectives on <em>AI, authority and choice.</em></>}
        copy="Research notes for leaders responsible for brand, reputation, growth and digital strategy in high-consideration markets"
      />
      <Section tone="paper">
        <div className="split-intro">
          <SectionHeader eyebrow="About research notes" title={<>Decision frameworks, not <em>performance promises.</em></>} />
          <div className="prose">
            <p>Menchly research notes address questions that leaders face when responsible brands enter AI-assisted decision environments. Each note provides working definitions, evidence-based frameworks and clear statements about what it does not claim.</p>
            <p>Notes are attributed to Menchly Editorial, carry visible expert-review status and list all primary sources. They are not client work, case studies or forecasts. <InternalLink to="/services">Explore our services</InternalLink></p>
          </div>
        </div>
      </Section>
      <Section>
        <ResearchGrid articles={insightArticles} />
      </Section>
      <Section id="glossary" tone="blue">
        <SectionHeader eyebrow="Glossary" title={<>Terms leaders can <em>use precisely.</em></>} />
        <div className="definition-grid">
          {allDefinitions.map((definition) => (
            <figure key={`${definition.articleSlug}-${definition.term}`} id={`glossary-${definition.term.toLowerCase().replace(/\s+/g, '-')}`}>
              <blockquote>"{definition.quote}"</blockquote>
              <figcaption>{definition.term} - Menchly Editorial definition</figcaption>
            </figure>
          ))}
        </div>
      </Section>
      <Section id="editorial-standards" tone="paper">
        <div className="split-intro">
          <SectionHeader eyebrow="Editorial standards" title={<>Publication gates and <em>stated limitations.</em></>} />
          <div className="prose">
            <p><strong>Attribution:</strong> All research notes are attributed to {EDITORIAL_ORGANIZATION}. No individual author names are published until expert review is complete.</p>
            <p><strong>Expert review status:</strong> {EXPERT_REVIEW_STATUS}. Each note carries a visible label until an independent domain expert has reviewed and approved it.</p>
            <p><strong>Required publication gates:</strong> Evidence verified, client approved (where applicable), legal approved, and explicit publication authorization.</p>
            <p><strong>Stated limitations:</strong></p>
            <ul>
              {insightArticles[0].limitations.filter((lim, idx, arr) => arr.indexOf(lim) === idx).map((limitation, index) => (
                <li key={index}>{limitation}</li>
              ))}
            </ul>
            <p>Research notes are not professional advice. Leaders should evaluate frameworks against their own obligations, jurisdiction and risk appetite. <InternalLink to="/methodology">See our methodology</InternalLink></p>
          </div>
        </div>
      </Section>
      <Section>
        <SectionHeader eyebrow="Frequently asked questions" title={<>About the research <em>programme.</em></>} />
        <div className="faq-list">
          {researchFaqs.map((faq) => (
            <div className="faq-item" key={faq.q}>
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand title="Turn the strategic question into a brand-specific baseline" />
    </>
  );
}

export function InsightArticlePage() {
  const { slug } = useParams();
  const article = getInsightArticle(slug);
  if (!article) return <NotFoundPage />;

  return (
    <article className="article-page">
      <PageHero
        eyebrow="Menchly research note"
        title={article.title}
        copy={article.deck}
      />
      <Section tone="paper" className="article-summary">
        <div className="article-meta">
          <div><span>Purpose</span><p>{article.purpose}</p></div>
          <div><span>By</span><p>{article.author}</p></div>
          <div><span>Last reviewed</span><p><time dateTime={article.lastReviewed}>{article.lastReviewed}</time></p></div>
          <div><span>Expert review</span><p>Pending  -  no verified expert reviewer supplied</p></div>
        </div>
        <div className="article-copy article-copy--summary">
          <p className="eyebrow">Executive summary</p>
          {article.executiveSummary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </Section>
      <Section className="article-definitions">
        <SectionHeader eyebrow="Working definitions" title={<>Language leaders can <em>use precisely.</em></>} />
        <div className="definition-grid">
          {article.definitions.map((definition) => (
            <figure key={definition.term}>
              <blockquote>“{definition.quote}”</blockquote>
              <figcaption>{definition.term}  -  Menchly Editorial definition</figcaption>
            </figure>
          ))}
        </div>
      </Section>
      {article.sections.map((section, index) => (
        <Section key={section.heading} tone={index % 2 === 0 ? 'paper' : 'blue'} className="article-section">
          <div className="article-layout">
            <header><span className="card-number">{String(index + 1).padStart(2, '0')}</span><h2 id={slugify(section.heading)}>{section.heading}</h2></header>
            <div className="article-copy">
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <aside className="article-example">
                <h3>{section.example.title}</h3>
                <p>{section.example.text}</p>
              </aside>
            </div>
          </div>
        </Section>
      ))}
      <Section className="article-governance">
        <div className="article-layout">
          <header><p className="eyebrow">Important limitations</p><h2>Interpret with care.</h2></header>
          <div>
            <ul>{article.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}</ul>
          </div>
        </div>
      </Section>
      <Section tone="paper" className="article-sources">
        <div className="article-layout">
          <header><p className="eyebrow">Sources</p><h2>Further reading and primary references.</h2></header>
          <ol>
            {article.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener">{source.title}</a>
                <span>{source.organization}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>
      <Section className="article-related">
        <div className="next-links">
          <div><p className="eyebrow">Continue exploring</p><h2>Related services and perspectives</h2></div>
          <div>{article.related.map((item) => <InternalLink key={item.href} to={item.href}>{item.label}</InternalLink>)}</div>
        </div>
      </Section>
      <CtaBand title="Turn the strategic question into a brand-specific baseline" placement={`article-${article.slug}`} />
    </article>
  );
}

const legalContent = {
  privacy: {
    title: 'Privacy',
    intro: 'Interim data-use information pending approval of the final privacy notice.',
    sections: [
      ['Information collected', 'The private assessment may collect your name, work contact details, company, website, role, industry, markets, objectives, optional message and an approved investment range when configured It also records consent, landing page, referrer, campaign parameters and a classification of known AI referrers A hidden anti-spam field is used to reject automated submissions.'],
      ['How information is used', 'Information submitted with required privacy consent is used to assess strategic fit, review potential category conflicts and respond to the enquiry Non-identifying first-party journey events are used only when the separate optional analytics choice is enabled Information should not be sold or used to claim an engagement exists.'],
      ['Retention and recipients', 'Final retention periods, deletion procedures, lawful bases, controller identity, contact route, hosting location, processors and any international transfers must be confirmed against the selected CRM and hosting configuration before launch Access should be restricted to authorised people involved in reviewing the enquiry.'],
      ['Your choices and rights', 'The production notice must explain applicable access, correction, deletion, restriction, objection and withdrawal rights, plus the relevant supervisory authority and an approved privacy contact.'],
      ['Legal review required', 'This interim wording is not a complete privacy notice and is not legal advice A qualified adviser must approve the notice, consent language, retention schedule, CRM processing terms and cross-border transfer position before public data collection is enabled.']
    ]
  },
  terms: {
    title: 'Terms',
    intro: 'This page is a publication placeholder pending final legal review.',
    sections: [
      ['Website information', 'Content on this website is general information about Menchly’s strategic services It is not professional, legal, financial or investment advice.'],
      ['No performance promise', 'References to opportunity, visibility or recommendation describe strategic aims Independent AI systems are variable and no specific placement, recommendation or commercial result is guaranteed.'],
      ['Future updates', 'Complete website terms, intellectual-property provisions, governing law and contact details should be approved before production launch.']
    ]
  }
};

export function LegalPage({ type }) {
  const content = legalContent[type];
  return (
    <>
      <PageHero eyebrow="Legal" title={content.title} copy={content.intro} />
      <Section tone="paper">
        <div className="legal-copy">
          {content.sections.map(([title, copy]) => <section key={title}><h2>{title}</h2><p>{copy}</p></section>)}
        </div>
      </Section>
    </>
  );
}

export function ThankYouPage() {
  const location = useLocation();
  const confirmed = location.state?.assessmentSubmitted === true;
  return (
    <section className="thank-you-page">
      <div className="shell thank-you-layout">
        <div>
          <p className="eyebrow">{confirmed ? 'Request received' : 'Private assessment'}</p>
          <h1>What happens next.</h1>
          <p>{confirmed
            ? 'Your request was securely accepted A senior member of the team will review strategic fit, category context and any potential conflicts before responding.'
            : 'This page does not confirm a submission To begin, complete the private assessment request so the team has the context needed for a considered review.'}</p>
          <div className="thank-you-actions">
            {confirmed && calendarUrl && (
              <BookMeeting placement="thank-you">
                <span>Arrange a private conversation</span>
                <span aria-hidden="true">→</span>
              </BookMeeting>
            )}
            <Link className="button button--outline" to={confirmed ? '/methodology' : '/private-ai-visibility-assessment'}><span>{confirmed ? 'Review our methodology' : 'Start the assessment'}</span><span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <ol className="next-step-list">
          <li><span>01</span><div><h2>Fit review</h2><p>We consider sector relevance, the decision context and whether we can add meaningful value.</p></div></li>
          <li><span>02</span><div><h2>Conflict check</h2><p>Potential category conflicts and appropriate confidentiality boundaries are reviewed before substantive discussion.</p></div></li>
          <li><span>03</span><div><h2>Senior response</h2><p>If there is a credible fit, we will propose a focused first conversation and the information needed for a baseline.</p></div></li>
        </ol>
      </div>
    </section>
  );
}

export function NotFoundPage() {
  return (
    <section className="placeholder-page">
      <div className="shell">
        <p className="eyebrow">404  -  page not found</p>
        <h1>This page could not be found.</h1>
        <p>The link you followed may be broken, or the page may have moved Try one of these instead:</p>
        <div className="placeholder-page__actions">
          <Link className="button button--primary" to="/"><span>Menchly homepage</span><span aria-hidden="true">→</span></Link>
          <InternalLink to="/insights">Read research</InternalLink>
          <InternalLink to="/private-ai-visibility-assessment">Private assessment</InternalLink>
        </div>
      </div>
    </section>
  );
}
