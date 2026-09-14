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
  { n: '01', icon: 'search', title: 'Prompt & market intelligence', text: 'Map the questions, criteria and decision moments that reveal genuine purchase intent.' },
  { n: '02', icon: 'shield', title: 'Authority architecture', text: 'Strengthen the owned and earned signals assistants use to understand expertise and trust.' },
  { n: '03', icon: 'target', title: 'Recommendation positioning', text: 'Clarify where the brand is a credible best fit - and make that distinction legible across the open web.' },
  { n: '04', icon: 'radar', title: 'Reputation monitoring', text: 'Review how major assistants describe, compare and qualify the brand over time.' }
];

export const promptIntelligence = [
  {
    label: 'Discovery',
    title: 'Find the category-defining questions',
    prompt: '“Which private aviation firms are best suited to a multi-market family office?”',
    insight: 'Reveals the buyer, operating context and trust criteria - not simply a category keyword.'
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
  { sector: 'Yachting', question: 'Which builder or broker belongs on a serious shortlist?', focus: 'Provenance, capability, specialist press and category distinction' },
  { sector: 'Private wealth', question: 'Which institution is appropriate for this family’s complexity?', focus: 'Expertise, discretion, jurisdictional relevance and reputational confidence.' },
  { sector: 'Luxury hospitality', question: 'Where should we stay for this precise occasion and standard?', focus: 'Experience signals, editorial authority and suitability - not generic popularity.' }
];


export const productTabs = [
  {
    id: 'overview',
    label: 'Overview',
    title: 'See how the brand shows up across AI',
    copy: 'Track presence, share of voice, rank and sentiment across the models that matter - then see who owns the narrative in the category',
    image: '/images/product/overview.png',
    imageAlt: 'Menchly Account Brief showing AI visibility overview, platform breakdown and market position',
    width: 862,
    height: 560
  },
  {
    id: 'prompts',
    label: 'Prompts',
    title: 'Build and track the prompt universe',
    copy: 'Map topics, intent and buyer questions so you appear in the conversations that reveal genuine purchase intent - not vanity keywords.',
    image: '/images/product/prompts.png',
    imageAlt: 'Menchly Prompts view with topic pills, intent distribution and tracked prompt library',
    width: 862,
    height: 560
  },
  {
    id: 'ai-traffic',
    label: 'AI Traffic',
    title: 'Measure visits that start in AI',
    copy: 'See which assistants send traffic to the site, how that demand moves over time, and which sources, pages and locations convert AI discovery into visits.',
    image: '/images/product/ai-traffic.png',
    imageAlt: 'Menchly AI Traffic view with provider entry cards and LLM visit trends chart',
    width: 862,
    height: 645
  },
  {
    id: 'mentions',
    label: 'Mentions',
    title: 'Watch how engines choose and describe you',
    copy: 'Follow mention volume by model over time, and read the recent answers that shape how buyers encounter the brand.',
    image: '/images/product/mentions.png',
    imageAlt: 'Menchly Mentions view with LLM totals, trend chart and recent AI responses',
    width: 862,
    height: 560
  },
  {
    id: 'citations',
    label: 'Citations',
    title: 'See which sources AI trusts',
    copy: 'Understand the corporate, institutional and editorial domains that back AI answers - and where authority is thin or outdated.',
    image: '/images/product/citations.png',
    imageAlt: 'Menchly Citations view with source-type donut, usage trend and domain table',
    width: 862,
    height: 560
  }
];

export const marketStats = [
  {
    value: '80%',
    label: 'rely on AI answers in at least 40% of their searches',
    source: 'Bain & Company',
    sourceUrl: 'https://www.bain.com/insights/goodbye-clicks-hello-ai-zero-click-search-redefines-marketing/'
  },
  {
    value: '15–25%',
    label: 'estimated fall in organic web traffic',
    source: 'Bain & Company',
    sourceUrl: 'https://www.bain.com/insights/goodbye-clicks-hello-ai-zero-click-search-redefines-marketing/'
  },
  {
    value: '42%',
    label: 'of AI assistant users ask for recommendations',
    source: 'Bain & Company',
    sourceUrl: 'https://www.bain.com/insights/goodbye-clicks-hello-ai-zero-click-search-redefines-marketing/'
  },
  {
    value: '+37%',
    label: 'revenue per visit from AI-referred traffic vs non-AI',
    source: 'Adobe Analytics, Q1 2026',
    sourceUrl: 'https://techcrunch.com/2026/04/16/ai-traffic-to-us-retailers-rose-393-in-q1-and-its-boosting-their-revenue-too/'
  }
];

export const berkosCase = {
  client: 'Berkos Developer & Properties',
  sector: 'Luxury real estate · Cyprus',
  headline: 'Brands that show up Results that speak.',
  copy: 'A live Menchly workspace tracking how AI engines describe, compare and cite a prime property brand across high-intent buyer questions.'
};

export const productImages = {
  overview: '/images/product/overview.png',
  prompts: '/images/product/prompts.png',
  mentions: '/images/product/mentions.png',
  citations: '/images/product/citations.png',
  competitors: '/images/product/competitors.png',
  sentiment: '/images/product/sentiment.png',
  aiTraffic: '/images/product/ai-traffic.png',
  aiCrawlers: '/images/product/ai-crawlers.png'
};

export const faqs = [
  { q: 'Is this SEO?', a: 'It is complementary, but distinct Search optimization focuses on discoverability in ranked results We build AI Search marketing infrastructure: data shows where to act, then we execute, learn and compound how assistants understand, describe and recommend a brand.' },
  { q: 'Can you guarantee a recommendation?', a: 'No credible agency can control or guarantee an independent model’s output We improve the authority, clarity and evidence environment that influences whether a brand is understood and considered.' },
  { q: 'Which AI assistants do you assess?', a: 'Engagements can include major assistants such as ChatGPT, Claude, Gemini, Perplexity and Copilot, selected according to audience relevance and market behavior.' },
  { q: 'How do you handle confidential information?', a: 'We agree access, review and approval boundaries before work begins Sensitive material is not published or used in external systems without explicit authorization.' },
  { q: 'Who is the service designed for?', a: 'Brands that want to lead the next iteration of the Internet We build custom infrastructure around each client rather than cookie-cutter packages or self-serve tools - especially where buyers research deeply and a poorly framed recommendation has meaningful commercial cost.' },
  { q: 'What happens in the private assessment?', a: 'We review your category, priority buyer questions and current concern to assess strategic fit If the mandate is appropriate, we then agree the scope for a documented model-response baseline and authority review' },
  { 
    q: 'What is AI Search marketing?', 
    a: 'AI Search marketing is the practice of building infrastructure so brands are accurately understood and appropriately recommended by AI assistants when high-intent buyers ask decision-shaping questions It goes beyond traditional SEO by addressing how conversational systems synthesize, interpret and cite information across the open web.',
    links: [{ text: 'AI features and your website', href: 'https://developers.google.com/search/docs/appearance/ai-features', external: true }]
  },
  { 
    q: 'What is the difference between SEO, GEO and AEO?', 
    a: 'SEO (Search Engine Optimization) focuses on ranking in traditional search results GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) describe strategies for visibility in AI-generated answers and citations, where the assistant synthesizes information rather than listing ranked links All three disciplines overlap, but AI visibility requires structured authority signals, citation-quality content and a disciplined measurement framework that traditional keyword tactics do not address.',
    links: []
  },
  { 
    q: 'How do AI assistants decide which brands to recommend?', 
    a: 'AI assistants rely on the same foundational web signals as traditional search - content quality, entity relationships, authoritative sources and current facts - but they synthesize those signals into natural language rather than ranking pages Research from Princeton and other institutions shows that content with clear structure, cited statistics, quotations from credible sources and direct answers to specific questions can improve visibility by up to 40% in AI-generated responses.',
    links: [{ text: 'GEO: Generative Engine Optimization (arXiv 2311.09735)', href: 'https://arxiv.org/abs/2311.09735', external: true }]
  },
  { 
    q: 'Does adding FAQ schema or an llms.txt file get a brand into AI answers?', 
    a: 'No Google and other major platforms have stated that no special schema, AI text file or machine-readable markup is required for AI visibility FAQ rich results were fully retired on 7 May 2026, and llms.txt remains an informal proposal with no confirmed adoption by major AI systems What matters is the visible question-and-answer content itself: clear, direct answers to real buyer questions, supported by credible evidence.',
    links: [{ text: 'AI features and your website - Google Search Central', href: 'https://developers.google.com/search/docs/appearance/ai-features', external: true }]
  },
  { 
    q: 'How is AI visibility measured?', 
    a: 'AI visibility is measured across four dimensions: recommendation presence (whether the brand appears for agreed high-intent prompts), contextual fit (whether the recommendation matches the right buyer and need), narrative accuracy (whether descriptions reflect current positioning), and source quality (which owned and independent authorities support the answer) These dimensions form a baseline that can be reviewed over time as models and markets evolve.',
    links: [{ text: 'Menchly methodology', href: '/methodology', external: false }]
  },
  { 
    q: 'How long before AI answers change?', 
    a: 'AI assistant outputs can shift within days or weeks as models are updated, new sources are indexed or existing content is re-evaluated There is no guaranteed timeline, and individual model versions vary in how quickly they reflect changes to underlying web content Authority-building work typically compounds over months rather than days, and results depend on the category, the evidence environment and the specific prompts being tracked.',
    links: []
  }
];

export const serviceFaqs = [
  {
    q: 'What does an AI Search marketing engagement include?',
    a: 'An engagement includes four integrated services: Prompt and market intelligence maps the high-intent questions that reveal genuine buyer consideration and decision criteria. Authority architecture assesses whether the open web provides a coherent, credible account of the brand\'s expertise and builds a roadmap connecting owned content, entities, executive authority and independent sources. Recommendation positioning translates positioning into defensible reasons for recommendation, making the circumstances in which the brand is an excellent fit specific, consistent and supported. Reputation monitoring reviews how selected assistants describe, compare and qualify the brand against an agreed prompt set, with reporting focused on material movement in presence, fit, accuracy and source quality.',
    links: []
  },
  {
    q: 'Can Menchly work alongside our existing SEO, PR and content agencies?',
    a: 'Yes. Menchly can lead a defined strategic engagement or work as a specialist layer alongside brand, communications, SEO, content and reputation partners. Scope, access and approval controls are agreed at the outset, and coordination with existing teams is part of the activation phase.',
    links: []
  },
  {
    q: 'What deliverables does each service produce?',
    a: 'Prompt and market intelligence delivers executive and stakeholder discovery, a high-intent prompt universe, buyer-stage and audience mapping, and a competitive recommendation review. Authority architecture delivers entity and source assessment, authority-gap prioritisation, owned-content briefing, and an earned-authority agenda. Recommendation positioning delivers best-fit recommendation territories, decision-criteria narratives, comparison and objection guidance, and cross-channel message alignment. Reputation monitoring delivers a model-response baseline, narrative and accuracy review, source-pattern monitoring, and executive recommendations.',
    links: []
  },
  {
    q: 'Which industries does Menchly work with?',
    a: 'Menchly works with reputation-sensitive, high-consideration markets where buyers research deeply before revealing intent. Current sector focus includes yachting, private aviation, luxury real estate, jewellery and watches, and luxury hospitality. Each programme is built around the language, intermediaries, evidence and reputation dynamics of the market rather than a universal prompt template.',
    links: [
      { text: 'Yachting', href: '/industries/yachting', external: false },
      { text: 'Private aviation', href: '/industries/private-aviation', external: false },
      { text: 'Luxury real estate', href: '/industries/luxury-real-estate', external: false },
      { text: 'Jewellery & watches', href: '/industries/jewellery-watches', external: false },
      { text: 'Luxury hospitality', href: '/industries/luxury-hospitality', external: false }
    ]
  },
  {
    q: 'How is progress reported and measured?',
    a: 'Reporting focuses on four dimensions that keep findings commercially grounded: Presence measures whether the brand enters relevant answers for the agreed question set. Fit assesses whether it is recommended for the buyer, need and context the brand is equipped to serve. Accuracy evaluates whether the answer reflects current facts, approved positioning and meaningful distinction. Authority reviews whether owned and independent sources are credible enough to support confidence. The approach combines repeatable review with informed judgement, interpreting AI outputs as directional evidence rather than deterministic rankings.',
    links: [{ text: 'Menchly methodology', href: '/methodology', external: false }]
  },
  {
    q: 'How are engagements scoped and how long do they run?',
    a: 'Engagements are scoped according to commercial priorities, audience fit, category context and operating constraints. The six-stage methodology moves from discovery and baseline through prioritisation, architecture, activation and continuous learning. Programme length varies by complexity and category maturity. Initial baseline assessments establish current state before activation begins, and monitoring continues as models, sources and markets evolve.',
    links: [{ text: 'See the methodology', href: '/methodology', external: false }]
  }
];
