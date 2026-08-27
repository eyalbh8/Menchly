export const assessmentHref = '/private-ai-visibility-assessment';

export const primaryNavItems = [
  { label: 'Insights', href: '/insights' },
  { label: 'Services', href: '/services' },
  { label: 'Methodology', href: '/methodology' }
];

export const footerNavItems = [
  ...primaryNavItems,
  { label: 'About', href: '/about' }
];

export const footerIndustryItems = [
  { label: 'Yachting', href: '/industries/yachting' },
  { label: 'Private aviation', href: '/industries/private-aviation' },
  { label: 'Luxury real estate', href: '/industries/luxury-real-estate' },
  { label: 'Jewellery & watches', href: '/industries/jewellery-watches' },
  { label: 'Luxury hospitality', href: '/industries/luxury-hospitality' }
];

export const platforms = [
  { name: 'ChatGPT', id: 'chatgpt' },
  { name: 'Claude', id: 'claude' },
  { name: 'Gemini', id: 'gemini' },
  { name: 'Perplexity', id: 'perplexity' },
  { name: 'Copilot', id: 'copilot' }
];

export const sectors = [
  {
    name: 'Private aviation',
    detail: 'Acquisition, charter, management and advisory decisions where trust precedes contact.',
    image: '/images/private-aviation.jpg',
    imageAlt: 'Private jet on the tarmac at dusk'
  },
  {
    name: 'Yachting',
    detail: 'Builders, brokers and services competing for a place on an informed buyer’s shortlist.',
    image: '/images/yachting.jpg',
    imageAlt: 'Superyacht on open water'
  },
  {
    name: 'Fine jewelry & watches',
    detail: 'Houses whose provenance, expertise and distinction must survive AI summarization.',
    image: '/images/jewellery-watches.jpg',
    imageAlt: 'Fine jewellery and watches on display'
  },
  {
    name: 'Prime real estate',
    detail: 'Developers and advisors serving buyers who research markets before revealing intent.',
    image: '/images/luxury-real-estate.jpg',
    imageAlt: 'Contemporary luxury residence exterior'
  },
  {
    name: 'Private wealth',
    detail: 'Discreet institutions selected on authority, suitability and reputational confidence.',
    image: '/images/private-wealth.jpg',
    imageAlt: 'Modern financial district skyline'
  },
  {
    name: 'Luxury hospitality',
    detail: 'Properties and operators competing to be recommended for a specific occasion or expectation.',
    image: '/images/luxury-hospitality.jpg',
    imageAlt: 'Luxury hotel suite overlooking the sea'
  }
];

export const reputationRisks = [
  { title: 'Absent from the shortlist', text: 'A capable brand can remain invisible when an assistant is asked who should be considered.' },
  { title: 'Flattened into sameness', text: 'Nuance, provenance and service distinctions disappear in generic model summaries.' },
  { title: 'Outdated or inaccurate', text: 'Legacy information and third-party descriptions can become the default narrative.' },
  { title: 'Recommended for the wrong fit', text: 'Broad awareness is not enough if the brand appears in irrelevant or low-intent contexts.' }
];

export const servicePillars = [
  { n: '01', title: 'Prompt & market intelligence', text: 'Map the questions, criteria and decision moments that reveal genuine purchase intent.' },
  { n: '02', title: 'Authority architecture', text: 'Strengthen the owned and earned signals assistants use to understand expertise and trust.' },
  { n: '03', title: 'Recommendation positioning', text: 'Clarify where the brand is a credible best fit—and make that distinction legible across the open web.' },
  { n: '04', title: 'Reputation monitoring', text: 'Review how major assistants describe, compare and qualify the brand over time.' }
];

export const promptIntelligence = [
  {
    label: 'Discovery',
    title: 'Find the category-defining questions',
    prompt: '“Which private aviation firms are best suited to a multi-market family office?”',
    insight: 'Reveals the buyer, operating context and trust criteria—not simply a category keyword.'
  },
  {
    label: 'Comparison',
    title: 'Understand the decision criteria',
    prompt: '“How should I compare established yacht builders for a fully custom project?”',
    insight: 'Shows which evidence, distinctions and objections shape a serious shortlist.'
  },
  {
    label: 'Validation',
    title: 'Protect the final confidence check',
    prompt: '“What should I know before appointing this firm?”',
    insight: 'Surfaces reputation gaps and the third-party sources likely to influence commitment.'
  }
];

export const sectorUseCases = [
  { sector: 'Aviation', question: 'Who is credible for this mission, geography and ownership profile?', focus: 'Recommendation fit, operational authority and advisory trust.' },
  { sector: 'Yachting', question: 'Which builder or broker belongs on a serious shortlist?', focus: 'Provenance, capability, specialist press and category distinction.' },
  { sector: 'Private wealth', question: 'Which institution is appropriate for this family’s complexity?', focus: 'Expertise, discretion, jurisdictional relevance and reputational confidence.' },
  { sector: 'Luxury hospitality', question: 'Where should we stay for this precise occasion and standard?', focus: 'Experience signals, editorial authority and suitability—not generic popularity.' }
];

export const processSteps = [
  { n: '01', title: 'Executive discovery', text: 'Align on commercial priorities, audiences, constraints and confidentiality.' },
  { n: '02', title: 'AI reputation baseline', text: 'Document current answers, source patterns, omissions and narrative risks.' },
  { n: '03', title: 'Prompt universe', text: 'Build a high-intent question set around real buyer journeys and decision criteria.' },
  { n: '04', title: 'Authority roadmap', text: 'Prioritize the content, entities, sources and proof needed to improve recommendation fit.' },
  { n: '05', title: 'Activation', text: 'Coordinate owned content and earned-authority work with the client’s existing teams.' },
  { n: '06', title: 'Review & refinement', text: 'Monitor changes, evaluate source quality and adapt as assistants and markets evolve.' }
];

export const measurementDimensions = [
  { title: 'Recommendation presence', text: 'Whether the brand appears for agreed, high-intent prompts.' },
  { title: 'Contextual fit', text: 'Whether the recommendation matches the right buyer, need and market.' },
  { title: 'Narrative accuracy', text: 'Whether descriptions reflect approved positioning and current facts.' },
  { title: 'Source quality', text: 'Which owned and independent authorities appear to support the answer.' }
];

export const faqs = [
  { q: 'Is this SEO?', a: 'It is complementary, but distinct. Search optimization focuses on discoverability in ranked results. We build AI Search marketing infrastructure: data shows where to act, then we execute, learn and compound how assistants understand, describe and recommend a brand.' },
  { q: 'Can you guarantee a recommendation?', a: 'No credible agency can control or guarantee an independent model’s output. We improve the authority, clarity and evidence environment that influences whether a brand is understood and considered.' },
  { q: 'Which AI assistants do you assess?', a: 'Engagements can include major assistants such as ChatGPT, Claude, Gemini, Perplexity and Copilot, selected according to audience relevance and market behavior.' },
  { q: 'How do you handle confidential information?', a: 'We agree access, review and approval boundaries before work begins. Sensitive material is not published or used in external systems without explicit authorization.' },
  { q: 'Who is the service designed for?', a: 'Brands that want to lead the next iteration of the Internet. We build custom infrastructure around each client rather than cookie-cutter packages or self-serve tools—especially where buyers research deeply and a poorly framed recommendation has meaningful commercial cost.' },
  { q: 'What happens in the private assessment?', a: 'We review your category, priority buyer questions and current concern to assess strategic fit. If the mandate is appropriate, we then agree the scope for a documented model-response baseline and authority review.' }
];
