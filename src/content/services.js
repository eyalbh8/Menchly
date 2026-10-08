import { industryProfiles, serviceDetails } from '../pageContent.js';
import { insightArticles } from './insights.js';

export const SERVICES_HUB_PATH = '/services';

export const serviceOfferings = [
  {
    slug: 'conversion-rate-optimization',
    name: 'User journey conversion rate optimisation',
    navLabel: 'CRO',
    cardTitle: 'CRO: user journey conversion',
    eyebrow: 'Conversion rate optimisation',
    heading: { lead: 'Turn informed interest into', emphasis: 'confident enquiries.' },
    title: 'CRO: User Journey Conversion Rate Optimisation  -  Menchly',
    description: 'User journey conversion rate optimisation for high-consideration brands: diagnose where qualified visitors hesitate, then improve the path from first visit to private enquiry.',
    summary: 'Diagnose where qualified visitors hesitate and redesign the path from first visit to private enquiry - without trading discretion for pressure.',
    introduction: [
      [
        'Buyers who arrive from an AI answer, a search result or an editorial mention have usually done their research. They are not looking to be persuaded from scratch; they are checking whether the brand is as credible, specific and approachable as the recommendation suggested. When the site fails that check, the visit ends quietly and the enquiry never happens.'
      ],
      [
        'User journey conversion rate optimisation examines that moment of confirmation. We map how different audiences enter, what they need to verify, where they lose confidence and which steps create unnecessary friction. Improvements are prioritised by commercial value and tested with discipline, so changes are learned from rather than guessed at.'
      ],
      [
        'CRO is most effective when it is connected to how demand is created. That is why we align it with ',
        { text: 'user acquisition', href: '/services/user-acquisition' },
        ' and ',
        { text: 'SEO', href: '/services/seo' },
        ': the page a visitor lands on should answer the question that brought them there.'
      ]
    ],
    challenges: [
      'High-intent visitors arrive from AI answers and search, but leave without making contact.',
      'Enquiry forms ask for too much, too early, or feel transactional for a private decision.',
      'Key evidence - credentials, process, fit - is buried several clicks from where doubt appears.',
      'Analytics report traffic volume but not where qualified journeys break down.'
    ],
    approach: [
      { title: 'Map entry journeys', copy: 'Identify the main entry routes - AI referrals, organic search, editorial links, paid campaigns - and the question each audience is trying to answer on arrival.' },
      { title: 'Diagnose hesitation', copy: 'Combine analytics, session review and page-level evidence to locate where qualified visitors stall, loop or abandon, and why that step undermines confidence.' },
      { title: 'Prioritise by value', copy: 'Rank opportunities by audience value, effort and evidence strength, so the first changes address the journeys closest to revenue.' },
      { title: 'Test and learn', copy: 'Run controlled experiments where traffic allows and structured before-and-after reviews where it does not, documenting what changed and what was learned.' }
    ],
    deliverables: [
      'Entry-journey and audience map',
      'Conversion friction audit',
      'Prioritised experiment roadmap',
      'Enquiry and form redesign recommendations',
      'Measurement and event-tracking plan'
    ],
    measures: [
      'Qualified enquiry rate by entry source',
      'Progression through key journey steps',
      'Form start and completion behaviour',
      'Quality of enquiries reported by the sales team'
    ],
    fit: [
      'You already attract relevant visitors, but enquiries do not reflect that interest.',
      'Your sales team reports that good prospects arrive confused or under-informed.',
      'The site has grown over time and the enquiry path has never been reviewed end to end.',
      'You want changes to be tested and documented rather than decided by opinion.'
    ],
    pillars: ['prompt-intelligence', 'recommendation-positioning'],
    related: [
      { slug: 'user-acquisition', reason: 'Conversion improves when the visitors you attract match the journeys you have designed for.' },
      { slug: 'seo', reason: 'Landing pages that rank should also answer the question that earned the click.' },
      { slug: 'content-creation', reason: 'Clear proof and explanation content removes the doubts that stall enquiries.' }
    ],
    industries: ['luxury-real-estate', 'luxury-hospitality', 'private-aviation'],
    insights: ['recommendation-gap-known-vs-selected'],
    faqs: [
      { q: 'How is CRO different for high-consideration brands?', a: 'Volume-led CRO often relies on urgency, discounts and aggressive prompts. High-consideration buyers respond to clarity, evidence and discretion. Our work focuses on removing doubt and friction at the moments where a qualified visitor decides whether the brand is credible enough to contact.' },
      { q: 'Do we need high traffic to run experiments?', a: 'No. Where traffic supports statistically meaningful A/B testing we use it. Where it does not, we use structured before-and-after reviews, qualitative evidence and enquiry quality to judge whether a change helped. The method is matched to the volume available rather than forced onto it.' },
      { q: 'Can you guarantee a conversion uplift?', a: 'No. Conversion depends on market conditions, offer, audience and many factors outside the website. We commit to a disciplined diagnosis, a prioritised roadmap and honest reporting of what changed and what did not.' },
      { q: 'Will you work with our existing web team?', a: 'Yes. We typically provide the diagnosis, specifications and test design, and work alongside internal developers or an existing agency to implement and release changes under agreed approval controls.' },
      { q: 'What does a CRO engagement start with?', a: 'It starts with a friction audit of the main entry journeys and a review of your analytics and enquiry data. From that we produce a prioritised roadmap, agree which changes to test first and set up the measurement needed to judge them. Most programmes then run in cycles of change, review and refinement.' }
    ]
  },
  {
    slug: 'brand-reputation-management',
    name: 'Brand reputation management',
    navLabel: 'Brand reputation management',
    cardTitle: 'Brand reputation management',
    eyebrow: 'Brand reputation management',
    heading: { lead: 'Shape how your brand is', emphasis: 'described when you are not in the room.' },
    title: 'Brand Reputation Management  -  Menchly',
    description: 'Brand reputation management across search results, AI assistants and the sources they rely on: monitor the narrative, correct inaccuracies and strengthen credible evidence.',
    summary: 'Monitor how search engines, AI assistants and influential sources describe the brand, correct what is inaccurate and strengthen the evidence behind what is true.',
    introduction: [
      [
        'Reputation used to be shaped mainly by press coverage, reviews and word of mouth. Today, a buyer may form a first impression from a two-paragraph AI summary that blends a company website, an old directory listing, a forum thread and a decade-old article. If those sources are outdated or incomplete, the summary will be too.'
      ],
      [
        'Brand reputation management at Menchly starts with a documented view of how the brand is currently described: in search results, across major AI assistants and in the sources those systems rely on. We identify what is inaccurate, what is missing and what is merely vague, then build a plan to correct facts and strengthen the credible signals that support the brand’s actual standing.'
      ],
      [
        'Durable reputation work depends on independent evidence. That is why this service works closely with ',
        { text: 'strategic PR placement', href: '/services/strategic-pr-placement' },
        ' and ',
        { text: 'answer engine optimisation', href: '/services/aeo' },
        ', so corrections are reinforced by sources assistants and buyers trust.'
      ]
    ],
    challenges: [
      'AI assistants repeat outdated leadership, ownership or service information.',
      'A single negative or inaccurate source carries disproportionate weight in summaries.',
      'The brand is described in generic category language that erases real distinction.',
      'There is no shared view of what search and AI currently say about the brand.'
    ],
    approach: [
      { title: 'Establish the baseline', copy: 'Document how search results and selected AI assistants describe, compare and qualify the brand across an agreed set of reputation-relevant questions.' },
      { title: 'Trace the sources', copy: 'Identify which owned, earned and third-party sources appear to shape each description, and which are inaccurate, outdated or missing.' },
      { title: 'Correct and reinforce', copy: 'Update owned facts, request legitimate corrections from third parties, and coordinate new credible evidence where the record is thin.' },
      { title: 'Monitor and escalate', copy: 'Re-test on an agreed cadence, flag material shifts early and maintain a response protocol for emerging reputation risks.' }
    ],
    deliverables: [
      'Search and AI reputation baseline',
      'Source and accuracy audit',
      'Correction and reinforcement plan',
      'Reputation risk response protocol',
      'Executive reputation reporting'
    ],
    measures: [
      'Accuracy of descriptions across selected assistants',
      'Sentiment and framing in priority answers',
      'Share of credible sources behind brand descriptions',
      'Resolution of documented inaccuracies'
    ],
    fit: [
      'AI assistants or search results describe the brand inaccurately or out of date.',
      'Leadership, ownership or service changes have not been reflected across the web.',
      'A small number of sources carry outsized influence over how the brand is perceived.',
      'Leadership needs a documented view of reputation that can be reviewed over time.'
    ],
    pillars: ['reputation-monitoring', 'authority-architecture'],
    related: [
      { slug: 'strategic-pr-placement', reason: 'Independent coverage is the most durable way to reinforce an accurate reputation.' },
      { slug: 'aeo', reason: 'AI answers are now a primary place where reputation is formed and repeated.' },
      { slug: 'content-creation', reason: 'Clear, current owned content gives search and AI an authoritative account to draw on.' }
    ],
    industries: ['jewellery-watches', 'private-aviation', 'luxury-hospitality'],
    insights: ['authority-without-overexposure', 'recommendation-gap-known-vs-selected'],
    faqs: [
      { q: 'Can you remove negative content about our brand?', a: 'We do not suppress legitimate content or use deceptive tactics. Where information is factually wrong, outdated or breaches a platform’s policies, we pursue legitimate correction routes. Where it is fair criticism, we focus on context, response and strengthening credible evidence of the brand’s current standing.' },
      { q: 'How do AI assistants affect brand reputation?', a: 'Assistants summarise what they find across the open web and present it as a single, confident answer. That makes inaccuracies more visible and harder to contextualise. Monitoring and correcting the sources behind those answers is now a core part of reputation management.' },
      { q: 'How quickly can inaccurate AI descriptions change?', a: 'There is no guaranteed timeline. Some corrections are reflected within weeks as sources are re-indexed; others take longer because they depend on third parties and model updates. We track change against a documented baseline rather than promising dates.' },
      { q: 'Do you handle crisis communications?', a: 'We are not a crisis communications firm. We maintain a reputation risk protocol, monitor for material shifts and coordinate closely with your communications or legal advisers when a situation requires specialist crisis support.' },
      { q: 'Which sources do you review?', a: 'Typically the brand’s own site and profiles, search results for branded and category queries, selected AI assistants, review platforms, directories, specialist media and any third-party sources that recur in AI citations. The exact set is agreed at the start, based on where your buyers and their advisers actually research.' }
    ]
  },
  {
    slug: 'content-creation',
    name: 'Content creation',
    navLabel: 'Content creation',
    cardTitle: 'Content creation',
    eyebrow: 'Content creation',
    heading: { lead: 'Content that explains expertise', emphasis: 'precisely enough to be chosen.' },
    title: 'Content Creation for Search and AI  -  Menchly',
    description: 'Evidence-led content creation for high-consideration brands: answer real buyer questions with clarity and authority across search, AI assistants and owned channels.',
    summary: 'Create the explanations, evidence and answers that buyers, search engines and AI assistants need to understand why the brand is the right fit.',
    introduction: [
      [
        'Most brand content is written to sound impressive rather than to be useful. It describes heritage, values and excellence in language that could belong to any competitor. Buyers skim past it, and search engines and AI assistants find little in it that helps them distinguish one firm from another.'
      ],
      [
        'Our content creation starts with the questions that real buyers ask at each stage of a decision: what to compare, what to verify, what could go wrong and who is genuinely suited to their situation. We then produce content that answers those questions directly, supported by specific evidence, clear structure and the brand’s own expertise.'
      ],
      [
        'Every brief is informed by ',
        { text: 'SEO', href: '/services/seo' },
        ' and ',
        { text: 'answer engine optimisation', href: '/services/aeo' },
        ' research, so the content is written for people first while remaining easy for search and AI systems to interpret and cite.'
      ]
    ],
    challenges: [
      'Website content describes the brand in generic luxury language rather than specific expertise.',
      'Real buyer questions go unanswered, so competitors or third parties answer them instead.',
      'Subject-matter experts have little time, and their knowledge rarely reaches the website.',
      'Content is produced for volume rather than for the decisions closest to revenue.'
    ],
    approach: [
      { title: 'Research the questions', copy: 'Build a question map from buyer conversations, search demand, AI prompt research and sales insight, organised by decision stage and audience.' },
      { title: 'Plan the architecture', copy: 'Decide which questions deserve dedicated pages, which belong in existing content and which need supporting evidence before they can be answered credibly.' },
      { title: 'Capture expertise', copy: 'Interview internal specialists efficiently and translate their knowledge into clear, accurate content they can approve with confidence.' },
      { title: 'Publish and refine', copy: 'Release content in priority order, review how it performs in search and AI answers, and update it as facts, buyer language and markets change.' }
    ],
    deliverables: [
      'Buyer question map and editorial plan',
      'Content briefs with evidence requirements',
      'Expert-led pages, guides and explainers',
      'Structured FAQ and comparison content',
      'Content refresh and maintenance schedule'
    ],
    measures: [
      'Coverage of priority buyer questions',
      'Search visibility for target topics',
      'Citation and mention in AI answers',
      'Engagement and enquiry contribution of content'
    ],
    fit: [
      'Your website explains what you do, but not why you are the right choice.',
      'Sales conversations repeatedly answer questions the website should already answer.',
      'Specialists hold valuable knowledge that never reaches buyers in written form.',
      'You want fewer, better pieces of content tied directly to commercial priorities.'
    ],
    pillars: ['prompt-intelligence', 'authority-architecture', 'recommendation-positioning'],
    related: [
      { slug: 'seo', reason: 'Search research shows which questions have demand and how they are phrased.' },
      { slug: 'aeo', reason: 'Answer-ready structure helps assistants interpret and cite your content accurately.' },
      { slug: 'user-acquisition', reason: 'Strong content gives paid and organic acquisition something worth sending people to.' }
    ],
    industries: ['yachting', 'jewellery-watches', 'luxury-real-estate'],
    insights: ['high-intent-prompt-intelligence', 'authority-without-overexposure'],
    faqs: [
      { q: 'Do you use AI to write content?', a: 'We may use AI tools for research, structuring and drafting support, but every piece is shaped by human editors and approved by your subject-matter experts. Content that simply restates what is already online adds little value for buyers, search engines or AI assistants.' },
      { q: 'What types of content do you create?', a: 'Typical outputs include service and expertise pages, buyer guides, comparison and decision content, structured FAQs, executive commentary and supporting material for PR. The mix depends on the questions your buyers ask and the evidence available to answer them.' },
      { q: 'How do you handle confidential expertise?', a: 'We agree disclosure boundaries before work begins. Content is written to demonstrate capability and process without exposing clients, transactions or sensitive details, and nothing is published without explicit approval.' },
      { q: 'How much content is needed?', a: 'Less than most programmes assume. We prioritise the questions closest to commercial decisions and answer them well, rather than producing a high volume of thin articles that dilute authority.' },
      { q: 'How is content measured?', a: 'We look at whether priority buyer questions are now answered, how that content performs in search, whether it is cited or reflected in AI answers, and how it contributes to engagement and enquiries. Results are reviewed against the editorial plan, so effort keeps moving toward the questions closest to revenue and away from topics that add little.' }
    ]
  },
  {
    slug: 'user-acquisition',
    name: 'User acquisition',
    navLabel: 'User acquisition',
    cardTitle: 'User acquisition',
    eyebrow: 'User acquisition',
    heading: { lead: 'Reach the buyers who matter,', emphasis: 'not just more traffic.' },
    title: 'User Acquisition for High-Consideration Brands  -  Menchly',
    description: 'User acquisition across search, AI discovery, paid media and partnerships: attract qualified audiences for high-consideration decisions and measure what genuinely drives enquiries.',
    summary: 'Attract qualified audiences across organic search, AI discovery, paid media and partnerships - and measure which channels genuinely contribute to enquiries.',
    introduction: [
      [
        'In high-consideration markets, more traffic is rarely the answer. A small number of well-matched buyers is worth far more than a large audience with no real intent. Yet many acquisition programmes are still optimised for clicks, impressions and cost per visit - metrics that say little about whether the right people are arriving.'
      ],
      [
        'Our user acquisition work starts with the audience. We define who the brand is genuinely built to serve, where those people research, and which channels can reach them with a relevant message at the right moment. That may include organic search, AI-driven discovery, paid search and social, referral partnerships and specialist media.'
      ],
      [
        'Acquisition only pays off if the arrival experience converts, so we plan it alongside ',
        { text: 'conversion rate optimisation', href: '/services/conversion-rate-optimization' },
        ' and supply it with useful ',
        { text: 'content', href: '/services/content-creation' },
        ' worth sending people to.'
      ]
    ],
    challenges: [
      'Paid campaigns generate volume but few qualified conversations.',
      'AI-referred traffic is growing but is not measured or understood.',
      'Channel performance is judged on clicks rather than enquiry quality.',
      'Targeting is too broad for a small, specific and valuable audience.'
    ],
    approach: [
      { title: 'Define the audience', copy: 'Agree the buyer roles, decision contexts and markets that matter most, including the advisers and intermediaries who influence the decision.' },
      { title: 'Map the channels', copy: 'Assess where those audiences research - search, AI assistants, social platforms, specialist media and partners - and where the brand is currently absent.' },
      { title: 'Build the mix', copy: 'Design a channel plan with clear roles for each source, realistic budgets and messages matched to the question the audience is asking.' },
      { title: 'Measure contribution', copy: 'Connect acquisition data to enquiries and sales feedback, so investment shifts toward the sources that bring qualified buyers.' }
    ],
    deliverables: [
      'Audience and channel opportunity map',
      'Channel mix and budget recommendations',
      'Campaign and message frameworks',
      'AI referral traffic measurement setup',
      'Acquisition performance reporting'
    ],
    measures: [
      'Qualified visits and enquiries by channel',
      'AI-referred traffic and its engagement',
      'Cost per qualified enquiry',
      'Audience fit of new contacts'
    ],
    fit: [
      'Marketing spend is producing traffic, but not the conversations you want.',
      'Your buyers are a small, specific audience that broad targeting rarely reaches.',
      'AI assistants are starting to send visitors and you want to understand that demand.',
      'You need a clear view of which channels genuinely contribute to enquiries.'
    ],
    pillars: ['prompt-intelligence', 'recommendation-positioning'],
    related: [
      { slug: 'conversion-rate-optimization', reason: 'Qualified visitors only become enquiries if the journey earns their confidence.' },
      { slug: 'content-creation', reason: 'Campaigns perform better when they lead to content that answers the buyer’s question.' },
      { slug: 'seo', reason: 'Organic search remains one of the most durable sources of qualified demand.' }
    ],
    industries: ['luxury-real-estate', 'luxury-hospitality', 'yachting'],
    insights: ['high-intent-prompt-intelligence'],
    faqs: [
      { q: 'Which channels do you manage?', a: 'Depending on the audience, programmes can include organic search, AI discovery, paid search, paid social, referral partnerships and specialist media. We recommend channels based on where qualified buyers research, not on a fixed package.' },
      { q: 'Can you measure traffic from AI assistants?', a: 'Partially. Many visits from AI assistants can be identified through referrer data and landing-page patterns, though some arrive without attribution. We set up the best available measurement and are explicit about what it can and cannot see.' },
      { q: 'Do you work with our existing media agency?', a: 'Yes. We can lead acquisition strategy and leave media buying with an existing partner, or take a broader role. Responsibilities and approval controls are agreed at the outset.' },
      { q: 'How do you judge whether acquisition is working?', a: 'By the quality and value of the enquiries it contributes, not by traffic volume alone. Reporting connects channel data with conversion and sales feedback wherever that data is available.' },
      { q: 'How do you set budgets for small, high-value audiences?', a: 'We start from the size and value of the audience rather than from a fixed spend. Budgets are set to reach the right people often enough to matter, tested in stages, and adjusted as data shows which sources bring qualified enquiries. Spend that only adds volume is reduced, and spend that brings the right conversations is protected.' },
      { q: 'Do you work with partners and intermediaries?', a: 'Often. In many high-consideration markets, advisers, brokers, concierges and specialist platforms influence who a buyer contacts. Where it fits the brand, we help identify and structure referral and partnership channels alongside search, AI discovery and paid media.' }
    ]
  },
  {
    slug: 'strategic-pr-placement',
    name: 'Strategic PR placement',
    navLabel: 'Strategic PR placement',
    cardTitle: 'Strategic PR placement',
    eyebrow: 'Strategic PR placement',
    heading: { lead: 'Earn coverage in the sources', emphasis: 'that shape decisions.' },
    title: 'Strategic PR Placement  -  Menchly',
    description: 'Strategic PR placement for authority, not vanity: earn coverage in the publications, specialist media and sources that buyers, search engines and AI assistants trust.',
    summary: 'Earn coverage in the publications and specialist sources that buyers, search engines and AI assistants trust - chosen for influence on decisions, not for reach alone.',
    introduction: [
      [
        'Not all coverage is equal. A feature in a respected specialist publication can shape how an entire category understands a brand, while a dozen syndicated mentions may change nothing. In AI-assisted research this matters even more: assistants lean on sources they consider authoritative when deciding how to describe and compare brands.'
      ],
      [
        'Strategic PR placement focuses on the sources with genuine influence. We identify which publications, editors, analysts and specialist platforms appear to shape buyer understanding and AI answers in your category, then develop story angles, executive commentary and evidence that give those outlets a credible reason to cover the brand.'
      ],
      [
        'Placement works best as part of a wider authority plan. It is closely linked to ',
        { text: 'brand reputation management', href: '/services/brand-reputation-management' },
        ' and ',
        { text: 'answer engine optimisation', href: '/services/aeo' },
        ', so each piece of coverage strengthens how the brand is understood, not just how often it is mentioned.'
      ]
    ],
    challenges: [
      'Coverage is measured by volume and reach rather than influence on decisions.',
      'The publications AI assistants cite in the category rarely mention the brand.',
      'Executives have valuable perspective but no consistent platform for it.',
      'Confidentiality makes it hard to tell compelling stories about real work.'
    ],
    approach: [
      { title: 'Map influential sources', copy: 'Identify the publications, specialist media and platforms that recur in AI citations, search results and buyer research for your category.' },
      { title: 'Shape the narrative', copy: 'Define the specific expertise and points of view the brand can credibly own, and the evidence needed to support each one.' },
      { title: 'Develop and pitch', copy: 'Prepare story angles, executive commentary, data and contributed articles tailored to each target outlet and its editorial standards.' },
      { title: 'Amplify and connect', copy: 'Link earned coverage back to owned content, executive profiles and entity information so its authority reinforces how the brand is described across search, AI answers and the wider web.' }
    ],
    deliverables: [
      'Influential source and citation map',
      'Narrative and expertise territories',
      'Media target list and pitch plan',
      'Executive commentary programme',
      'Coverage impact reporting'
    ],
    measures: [
      'Placements in priority sources',
      'Presence of earned coverage in AI citations',
      'Accuracy and depth of how coverage describes the brand',
      'Referral and branded search activity following coverage'
    ],
    fit: [
      'Your expertise is recognised inside the industry but rarely visible in respected media.',
      'The publications that shape your category tend to cite competitors instead.',
      'Senior leaders have a distinctive point of view that deserves a wider platform.',
      'You want coverage judged by influence on decisions, not by volume of mentions.'
    ],
    pillars: ['authority-architecture', 'recommendation-positioning'],
    related: [
      { slug: 'brand-reputation-management', reason: 'Credible coverage is the strongest foundation for an accurate reputation.' },
      { slug: 'aeo', reason: 'Assistants draw on authoritative publications when they describe and compare brands.' },
      { slug: 'content-creation', reason: 'Owned content gives journalists and assistants accurate detail to build on.' }
    ],
    industries: ['yachting', 'jewellery-watches', 'private-aviation'],
    insights: ['authority-without-overexposure', 'recommendation-gap-known-vs-selected'],
    faqs: [
      { q: 'Do you guarantee media placements?', a: 'No. Editorial coverage is decided by independent editors and journalists. We guarantee a disciplined process: well-researched targets, credible angles and properly prepared spokespeople. Paid placements are always labelled as such and are never presented as earned coverage.' },
      { q: 'How is this different from a traditional PR agency?', a: 'We choose targets by their influence on buyer research and AI answers, not by audience size alone, and we connect coverage to the brand’s wider authority and content. We can work alongside an existing PR agency where one is in place.' },
      { q: 'Why does PR matter for AI search?', a: 'AI assistants tend to rely on sources they treat as authoritative when describing a brand or category. Coverage in respected publications can improve the evidence available to those systems, although no one can control how an independent model uses it.' },
      { q: 'Can we do PR without disclosing client work?', a: 'Yes. Expertise can be demonstrated through commentary, process, market perspective and anonymised examples. Disclosure boundaries are agreed before any outreach begins.' },
      { q: 'Which kinds of publications do you target?', a: 'It depends on the category. Targets often include respected business and trade titles, specialist editorial in the sector, analyst and research platforms, and the sources that recur in AI citations for priority questions. We prioritise by influence on buyer research and decision-making rather than by audience size alone.' }
    ]
  },
  {
    slug: 'seo',
    name: 'Search engine optimisation',
    navLabel: 'SEO',
    cardTitle: 'SEO: search engine optimisation',
    eyebrow: 'Search engine optimisation',
    heading: { lead: 'Be found by buyers', emphasis: 'when they search with intent.' },
    title: 'SEO: Search Engine Optimisation  -  Menchly',
    description: 'SEO for high-consideration brands: technical foundations, intent-led content and authority that help qualified buyers find you in search and support visibility in AI answers.',
    summary: 'Strengthen the technical foundations, content and authority that help qualified buyers find the brand in search - and that AI answers increasingly draw on.',
    introduction: [
      [
        'Search remains one of the main ways buyers research a high-consideration decision, and the signals that drive search visibility - crawlable pages, clear entities, useful content and credible links - also inform how many AI systems understand a brand. Strong SEO is therefore not a legacy channel; it is part of the foundation for AI visibility.'
      ],
      [
        'Our SEO work concentrates on the searches that indicate genuine intent rather than broad traffic. We make sure the site can be crawled, rendered and understood, that its content answers the questions buyers actually ask, and that its authority is supported by relevant, reputable sources rather than manufactured links.'
      ],
      [
        'SEO and ',
        { text: 'answer engine optimisation', href: '/services/aeo' },
        ' share the same foundations, and both depend on ',
        { text: 'content', href: '/services/content-creation' },
        ' that deserves to rank. We plan all three together so effort compounds instead of being duplicated.'
      ]
    ],
    challenges: [
      'Technical issues prevent important pages from being crawled, rendered or indexed.',
      'The site ranks for broad terms but not for the searches closest to a decision.',
      'Content is thin, duplicated or written for keywords rather than buyers.',
      'Authority relies on low-quality links rather than reputable, relevant sources.'
    ],
    approach: [
      { title: 'Audit the foundations', copy: 'Review crawlability, indexing, rendering, site structure, page speed and structured data to find what limits how search engines understand the site.' },
      { title: 'Research intent', copy: 'Identify the searches that signal real buying intent for each audience and market, and map them to the pages best placed to answer them.' },
      { title: 'Improve and create', copy: 'Fix technical issues, strengthen existing pages and brief new content where important questions are currently unanswered.' },
      { title: 'Build authority', copy: 'Earn links and mentions from relevant, reputable sources through useful content, partnerships and PR rather than link schemes.' }
    ],
    deliverables: [
      'Technical SEO audit and fix list',
      'Intent-led keyword and page map',
      'On-page optimisation recommendations',
      'Content briefs for priority gaps',
      'Authority and link-earning plan'
    ],
    measures: [
      'Visibility for priority intent searches',
      'Indexed and healthy priority pages',
      'Organic visits to decision-stage pages',
      'Enquiries and engagement from organic search'
    ],
    fit: [
      'Important pages are not being indexed or ranked as they should be.',
      'You rank for broad terms, but not for the searches that lead to enquiries.',
      'A site migration, redesign or new market launch is being planned.',
      'You want SEO that also strengthens visibility in AI-generated answers.'
    ],
    pillars: ['prompt-intelligence', 'authority-architecture'],
    related: [
      { slug: 'aeo', reason: 'The same foundations support visibility in AI-generated answers and citations.' },
      { slug: 'content-creation', reason: 'Rankings are earned by content that genuinely answers the buyer’s question.' },
      { slug: 'conversion-rate-optimization', reason: 'Organic visitors only create value when the landing page earns their confidence.' }
    ],
    industries: ['luxury-real-estate', 'luxury-hospitality', 'private-aviation'],
    insights: ['high-intent-prompt-intelligence'],
    faqs: [
      { q: 'Is SEO still relevant with AI search?', a: 'Yes. AI features in search and many assistants rely on the same foundations: crawlable pages, clear content, structured information and credible sources. Google states that standard SEO best practices apply to its AI features. Strong SEO supports AI visibility rather than competing with it.' },
      { q: 'How long does SEO take to work?', a: 'Technical fixes can be reflected within weeks, while content and authority work typically compounds over months. Timelines depend on the site’s starting point, competition and how quickly changes are implemented. We report progress against a documented baseline.' },
      { q: 'Do you build links?', a: 'We earn links and mentions through useful content, partnerships and PR. We do not buy links or use networks designed to manipulate rankings, which create risk and rarely build durable authority.' },
      { q: 'Can you guarantee first-page rankings?', a: 'No credible agency can guarantee rankings, because search engines decide them independently. We commit to sound technical foundations, intent-led content and transparent reporting.' },
      { q: 'What does an SEO engagement start with?', a: 'It starts with a technical audit and an intent-led review of the searches that matter most to your buyers. Together they show what is limiting visibility today and which pages are best placed to answer high-value searches. The result is a prioritised plan covering fixes, content and authority, agreed before implementation begins.' },
      { q: 'Do you handle site migrations?', a: 'Yes. Migrations, redesigns and domain changes are among the highest-risk moments for search visibility. We plan redirects, preserve important content and structured data, and monitor indexing closely after launch, so existing visibility is protected while the new site establishes itself.' }
    ]
  },
  {
    slug: 'aeo',
    name: 'Answer engine optimisation',
    navLabel: 'AEO',
    cardTitle: 'AEO: answer engine optimisation',
    eyebrow: 'Answer engine optimisation',
    heading: { lead: 'Be the answer when buyers', emphasis: 'ask AI who to trust.' },
    title: 'AEO: Answer Engine Optimisation  -  Menchly',
    description: 'Answer engine optimisation for ChatGPT, Gemini, Perplexity, Claude and Copilot: help AI assistants understand, describe and recommend the brand accurately for high-intent questions.',
    summary: 'Help AI assistants such as ChatGPT, Gemini, Perplexity, Claude and Copilot understand, describe and appropriately recommend the brand for high-intent questions.',
    introduction: [
      [
        'Buyers increasingly ask AI assistants for recommendations rather than scanning a page of links. Instead of ten results, they receive one synthesised answer that names a few brands, explains why and cites a handful of sources. Being absent from that answer - or described inaccurately - can remove a brand from consideration before a website is ever visited.'
      ],
      [
        'Answer engine optimisation is the discipline of improving how those systems understand and represent a brand. We map the questions that reveal genuine buying intent, document how selected assistants currently answer them, trace the sources behind those answers and close the gaps in clarity, evidence and authority that limit the brand’s presence and fit.'
      ],
      [
        'AEO builds on strong ',
        { text: 'SEO', href: '/services/seo' },
        ' foundations and depends on credible independent sources, which is why it is closely connected to ',
        { text: 'strategic PR placement', href: '/services/strategic-pr-placement' },
        '. Our ',
        { text: 'methodology', href: '/methodology' },
        ' explains how we measure change without claiming control over independent models.'
      ]
    ],
    challenges: [
      'The brand is absent from AI answers to the questions closest to a buying decision.',
      'Assistants describe the brand inaccurately, vaguely or for the wrong audience.',
      'Competitors are cited from sources where the brand has no presence.',
      'There is no baseline for how AI currently presents the brand.'
    ],
    approach: [
      { title: 'Map high-intent prompts', copy: 'Build a prompt universe from buyer roles, decision stages and comparison criteria, focused on questions closest to commercial consideration.' },
      { title: 'Baseline the answers', copy: 'Document how selected assistants respond: whether the brand appears, how it is described, who it is compared with and which sources are cited.' },
      { title: 'Close the evidence gaps', copy: 'Strengthen owned content, entity information and independent sources so assistants have clearer, more credible evidence to work from.' },
      { title: 'Re-test and adapt', copy: 'Repeat the agreed prompt set on a set cadence, interpret movement as directional evidence and adjust priorities as models and markets evolve.' }
    ],
    deliverables: [
      'High-intent prompt universe',
      'Model-response baseline across selected assistants',
      'Citation and source-pattern analysis',
      'Entity and content gap roadmap',
      'Ongoing AI visibility reporting'
    ],
    measures: [
      'Presence in answers to agreed prompts',
      'Fit of recommendations to the right buyer and need',
      'Accuracy of brand descriptions',
      'Quality of sources cited alongside the brand'
    ],
    fit: [
      'Buyers in your category increasingly ask AI assistants for recommendations.',
      'Competitors appear in AI answers to questions where you have stronger credentials.',
      'Assistants describe the brand vaguely, inaccurately or for the wrong audience.',
      'You want a measured, evidence-led view of AI visibility rather than anecdotes.'
    ],
    pillars: ['prompt-intelligence', 'authority-architecture', 'recommendation-positioning', 'reputation-monitoring'],
    related: [
      { slug: 'seo', reason: 'Crawlable, well-structured pages remain the foundation AI systems draw on.' },
      { slug: 'content-creation', reason: 'Direct, evidence-backed answers to buyer questions are easier for assistants to cite.' },
      { slug: 'strategic-pr-placement', reason: 'Independent, authoritative coverage strengthens the sources behind AI answers.' },
      { slug: 'brand-reputation-management', reason: 'How assistants describe the brand is now a central part of its reputation.' }
    ],
    industries: ['yachting', 'private-aviation', 'jewellery-watches'],
    insights: ['high-intent-prompt-intelligence', 'recommendation-gap-known-vs-selected'],
    faqs: [
      { q: 'What is answer engine optimisation?', a: 'Answer engine optimisation (AEO) is the practice of improving how AI assistants and AI search features understand, describe and recommend a brand. It focuses on clear answers to real buyer questions, accurate entity information and credible supporting sources rather than keyword rankings alone.' },
      { q: 'How is AEO different from SEO?', a: 'SEO focuses on ranking pages in search results. AEO focuses on whether a brand appears, and how it is described, inside a synthesised AI answer. The two share foundations, but AEO places more weight on direct answers, entity clarity and the independent sources assistants cite.' },
      { q: 'Which AI assistants do you cover?', a: 'Programmes typically include ChatGPT, Gemini, Perplexity, Claude and Copilot, selected according to where your audience researches. Coverage is agreed at the start of each engagement.' },
      { q: 'Can you guarantee that AI will recommend us?', a: 'No. Independent models decide their own outputs, and those outputs vary between runs and versions. We improve the clarity, evidence and authority that recommendations may depend on, and we measure directional change against a documented baseline.' },
      { q: 'Do we need special markup or an llms.txt file?', a: 'No special markup is required. Google states that its AI features rely on standard search foundations, and llms.txt remains an informal proposal. What matters most is visible, accurate content that answers real buyer questions, supported by credible independent sources. Structured data can still help clarify facts, but it is not a shortcut.' }
    ]
  }
];

const serviceSlugs = new Set(serviceOfferings.map((service) => service.slug));
const industrySlugs = new Set(industryProfiles.map((industry) => industry.slug));
const insightSlugs = new Set(insightArticles.map((article) => article.slug));
const pillarSlugs = new Set(serviceDetails.map((pillar) => pillar.slug));

const requiredServiceFields = ['slug', 'name', 'navLabel', 'cardTitle', 'eyebrow', 'heading', 'title', 'description', 'summary', 'introduction', 'challenges', 'approach', 'deliverables', 'measures', 'fit', 'pillars', 'related', 'industries', 'insights', 'faqs'];

export function servicePath(slug) {
  return `${SERVICES_HUB_PATH}/${slug}`;
}

export function serviceHeadingText(service) {
  return `${service.heading.lead} ${service.heading.emphasis}`;
}

export function validateServiceOffering(service) {
  const problems = requiredServiceFields.filter((field) => {
    const value = service?.[field];
    return value == null || value === '' || (Array.isArray(value) && value.length === 0);
  });
  service?.related?.forEach(({ slug }) => {
    if (!serviceSlugs.has(slug)) problems.push(`unknown related service "${slug}"`);
    if (slug === service.slug) problems.push('relates to itself');
  });
  service?.industries?.forEach((slug) => { if (!industrySlugs.has(slug)) problems.push(`unknown industry "${slug}"`); });
  service?.insights?.forEach((slug) => { if (!insightSlugs.has(slug)) problems.push(`unknown insight "${slug}"`); });
  service?.pillars?.forEach((slug) => { if (!pillarSlugs.has(slug)) problems.push(`unknown pillar "${slug}"`); });
  service?.introduction?.flat().forEach((segment) => {
    if (typeof segment === 'object' && segment.href.startsWith(`${SERVICES_HUB_PATH}/`) && !serviceSlugs.has(segment.href.split('/').pop())) {
      problems.push(`unknown service link "${segment.href}"`);
    }
  });
  return { valid: problems.length === 0, problems };
}

export function getServiceOffering(slug) {
  return serviceOfferings.find((service) => service.slug === slug);
}

export const serviceNavItems = serviceOfferings.map((service) => ({
  label: service.navLabel,
  href: servicePath(service.slug)
}));

export const serviceCards = serviceOfferings.map((service) => ({
  title: service.cardTitle,
  copy: service.summary,
  href: servicePath(service.slug)
}));

serviceOfferings.forEach((service) => {
  const validation = validateServiceOffering(service);
  if (!validation.valid) throw new Error(`Invalid service offering "${service?.slug || 'unknown'}": ${validation.problems.join(', ')}`);
});

industryProfiles.forEach((industry) => {
  industry.services?.forEach((slug) => {
    if (!serviceSlugs.has(slug)) throw new Error(`Industry "${industry.slug}" references unknown service "${slug}"`);
  });
});
