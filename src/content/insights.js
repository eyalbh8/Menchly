export const EDITORIAL_ORGANIZATION = 'Menchly Editorial';
export const EXPERT_REVIEW_STATUS = 'pending';

const sharedLimitations = [
  'AI assistant outputs vary by model, version, retrieval method, location, account context and prompt wording.',
  'The frameworks in this note support strategic judgement; they do not predict or guarantee recommendation, ranking, revenue or reputation outcomes.',
  'Examples are illustrative composites, not client work, performance claims or evidence that any named or implied brand has adopted this approach.'
];

export const insightArticles = [
  {
    slug: 'recommendation-gap-known-vs-selected',
    title: 'The recommendation gap: known is not selected',
    deck: 'Why awareness can coexist with exclusion from an AI-assisted shortlist—and how leaders can diagnose the difference without claiming control over independent systems.',
    purpose: 'Give executive teams a decision framework for separating broad brand recognition from context-specific recommendation fit.',
    datePublished: '2026-08-06',
    dateModified: '2026-08-06',
    lastReviewed: '2026-08-06',
    author: EDITORIAL_ORGANIZATION,
    reviewStatus: EXPERT_REVIEW_STATUS,
    executiveSummary: [
      'A brand can be prominent in its category yet absent when an assistant is asked to choose for a particular buyer, mission or constraint. Awareness answers “what exists?” Selection answers “what fits this decision, and why?” The second question demands specific, current and supportable evidence.',
      'Executives should therefore assess recommendation presence alongside contextual fit, factual accuracy and source quality. The objective is not universal inclusion. It is a defensible connection between the situations a brand is equipped to serve and the evidence available to an AI-assisted buyer.'
    ],
    definitions: [
      {
        term: 'Recommendation gap',
        quote: 'The recommendation gap is the distance between being recognisable as a category participant and being supportably selected for a defined buyer, need and decision context.'
      },
      {
        term: 'Selection evidence',
        quote: 'Selection evidence is current, attributable information that helps a buyer distinguish credible fit—not simply proof that a brand exists or is popular.'
      }
    ],
    sections: [
      {
        heading: 'Awareness and selection solve different questions',
        paragraphs: [
          'Awareness signals can establish category membership: a known name, repeated press mentions, a substantial social presence or a long operating history. Those signals may help an assistant recognise an entity. They do not necessarily explain when the entity is suitable, what it is unusually equipped to do, or which constraints should rule it in or out.',
          'Selection is narrower. A recommendation request normally contains—or implies—a buyer role, intended outcome, geography, risk threshold, budget logic, service expectation and comparison set. If public information does not connect the brand to those criteria, an assistant may default to better-documented alternatives, generic popularity signals or cautious category summaries.',
          'This distinction matters at board level because an awareness programme and a recommendation programme have different success conditions. The first seeks reach and recall. The second seeks accurate consideration for defined circumstances, supported by evidence a sophisticated buyer can inspect.'
        ],
        example: {
          title: 'Illustrative example: private aviation',
          text: 'A widely recognised aviation company may be easy to name for charter in general. A family office asking for management of a multi-base, long-range fleet is making a different decision. Relevant evidence may include management scope, operating jurisdictions, safety and compliance credentials, fleet complexity, leadership expertise and adviser-facing processes. Fame alone does not establish that fit; nor should an assistant infer it from prestige language.'
        }
      },
      {
        heading: 'Diagnose the gap across four executive questions',
        paragraphs: [
          'First, presence: does the brand enter answers for a deliberately selected set of material questions? A single appearance is not a stable ranking, and absence from one response is not proof of broad invisibility. Use repeated, documented observation as directional evidence.',
          'Second, fit: when the brand appears, is the stated reason aligned with the clients, missions and markets it can genuinely serve? An irrelevant recommendation can create reputational and operational cost even when it appears positive.',
          'Third, accuracy: are entity details, capabilities, locations, ownership relationships and limitations current? A polished answer built on stale facts is not a successful outcome.',
          'Fourth, authority: can material claims be traced to reliable owned records or credible independent sources? NIST’s AI Risk Management Framework emphasises validity, reliability, transparency and ongoing measurement as characteristics of trustworthy AI risk management. For a brand team, the practical implication is to treat model output as evidence to evaluate—not as an unquestionable verdict.'
        ],
        example: {
          title: 'Illustrative example: high jewellery',
          text: 'A house may be known for heritage while its current bespoke practice remains poorly documented. A collector asking who can execute a technically unusual commission needs evidence about present-day makers, design process, material standards, provenance controls and aftercare. The authority gap is not solved by repeating the founding date more often.'
        }
      },
      {
        heading: 'Build reasons for consideration, not claims of superiority',
        paragraphs: [
          'A responsible authority programme begins with bounded recommendation territories: the buyer situations in which the brand has a substantiated right to be considered. Teams can then map each territory to approved facts, explanatory owned content, expert credentials, relevant third-party coverage and clear entity relationships.',
          'The discipline is subtractive as well as additive. Claims that cannot be evidenced should be narrowed or removed. Confidential projects should not be disclosed to fill a content gap. Where proof cannot be made public, the brand can often explain process, standards, governance and anonymised capability boundaries without implying a result it cannot demonstrate.',
          'Finally, executives should govern change. Models, source access and market language evolve. A dated baseline, a controlled prompt set and a record of cited sources make later reviews more informative, while avoiding the false precision of a permanent “AI ranking.”'
        ],
        example: {
          title: 'Illustrative example: prime property',
          text: 'An adviser with genuine off-market capability cannot publish private transactions. It can still document the markets served, senior adviser credentials, acquisition process, conflict controls, cross-border coordination and the types of complexity it is structured to handle. That evidence clarifies suitability without exposing principals or addresses.'
        }
      }
    ],
    limitations: sharedLimitations,
    sources: [
      { title: 'NIST, Artificial Intelligence Risk Management Framework (AI RMF 1.0)', organization: 'National Institute of Standards and Technology', url: 'https://doi.org/10.6028/NIST.AI.100-1' },
      { title: 'OECD AI Principles', organization: 'Organisation for Economic Co-operation and Development', url: 'https://oecd.ai/en/ai-principles' },
      { title: 'Guidelines for Human-AI Interaction', organization: 'Microsoft Research / CHI 2019', url: 'https://doi.org/10.1145/3290605.3300233' }
    ],
    related: [
      { label: 'Prompt and market intelligence services', href: '/services' },
      { label: 'Menchly methodology', href: '/methodology' },
      { label: 'Private aviation decision context', href: '/industries/private-aviation' },
      { label: 'High-intent prompt intelligence', href: '/insights/high-intent-prompt-intelligence' }
    ]
  },
  {
    slug: 'high-intent-prompt-intelligence',
    title: 'High-intent prompt intelligence is not prompt volume',
    deck: 'A practical framework for prioritising the questions closest to consequential decisions when no universal, auditable prompt-volume dataset exists.',
    purpose: 'Help leaders avoid importing keyword-volume assumptions into conversational decision research and focus resources on questions with material buyer intent.',
    datePublished: '2026-08-06',
    dateModified: '2026-08-06',
    lastReviewed: '2026-08-06',
    author: EDITORIAL_ORGANIZATION,
    reviewStatus: EXPERT_REVIEW_STATUS,
    executiveSummary: [
      'Keyword volume describes aggregate search behaviour within a defined tool and methodology. Prompt intelligence examines decision-rich questions, including audience, context, criteria, alternatives and risk. The two can inform each other, but they are not interchangeable.',
      'There is no single public dataset that reliably reports all prompts across assistants, private enterprise deployments and changing model interfaces. Executive prioritisation should therefore be transparent and evidence-led: combine buyer research, first-party enquiry language, search demand, sales and adviser insight, model observation and commercial judgement—while labelling uncertainty.'
    ],
    definitions: [
      {
        term: 'High-intent prompt',
        quote: 'A high-intent prompt is a question whose context, constraints or comparison criteria indicate movement toward a consequential decision—not merely curiosity about a category.'
      },
      {
        term: 'Prompt intelligence',
        quote: 'Prompt intelligence is the governed practice of identifying, grouping and testing decision-relevant questions; it is not a claim to know universal prompt volume.'
      }
    ],
    sections: [
      {
        heading: 'Why keyword logic is an incomplete proxy',
        paragraphs: [
          'Search keywords remain useful evidence of language and demand. But conversational prompts can contain several jobs at once: education, comparison, suitability testing, objection handling and validation. They may be long, private and highly specific. A low-frequency question can still matter commercially when it precedes a high-value or high-risk decision.',
          'Volume can also conceal mixed intent. A broad phrase such as “best luxury hotel” may represent inspiration, editorial research, a school assignment or an imminent booking. A prompt specifying travelling party, occasion, privacy needs, location and service expectation gives a clearer decision context even if no external tool assigns it a large number.',
          'This does not justify declaring every long prompt valuable. Specificity is evidence, not proof. Teams need a repeatable prioritisation model and should preserve the source and rationale behind each selected question.'
        ],
        example: {
          title: 'Illustrative example: luxury hospitality',
          text: 'Compare “best hotels in Paris” with “which Paris palace hotel best suits a three-generation family needing connecting suites, discreet arrival and residential-style service?” The second question reveals party, accommodation, privacy and service criteria. It may be strategically more useful to a particular property even without a defensible public volume estimate.'
        }
      },
      {
        heading: 'Score decision value before visibility opportunity',
        paragraphs: [
          'A practical prompt universe can be assessed across five dimensions. Audience relevance asks whether the question comes from a buyer or adviser the brand is equipped to serve. Decision proximity asks whether it supports discovery, comparison, validation or commitment. Commercial materiality considers the value or reputational consequence of the decision without inventing a forecast.',
          'Strategic fit tests whether the brand has a truthful, differentiated reason to be considered. Evidence feasibility asks whether that reason can be supported through approved facts and credible sources. Only after these dimensions should teams consider observed model presence or competitive whitespace.',
          'The resulting score is a prioritisation aid, not a market statistic. Weighting should be agreed with commercial, reputation and operational leaders. Document disagreements: a communications team may see a reputation risk where a sales team sees low near-term demand, and both perspectives can be relevant.'
        ],
        example: {
          title: 'Illustrative example: yachting',
          text: '“Largest yacht builders” is measurable and broad. “Which yards have credible experience coordinating a fully custom yacht with novel technical systems and an owner’s established design team?” is narrower and exposes evidence requirements. A yard should prioritise it only if the capability, collaboration model and relevant public proof are real.'
        }
      },
      {
        heading: 'Create an evidence stack, not a synthetic volume number',
        paragraphs: [
          'Use multiple inputs with explicit labels. First-party sources may include anonymised enquiry themes, approved sales notes, site search and client-adviser interviews. External sources may include search trend tools, industry forums, regulatory guidance, specialist media and competitor language. Model observations can show how assistants currently frame a question, but they do not reveal total demand.',
          'Testing should record assistant, model where available, date, account state, retrieval mode, geography, exact prompt and output. Microsoft’s human-AI interaction guidance recommends communicating system capabilities and supporting efficient correction. Applied here, decision-makers should be shown what the observation can and cannot establish.',
          'Avoid purchasing certainty through opaque dashboards. If a provider presents prompt-volume figures, executives should ask which assistants are covered, whether data is observed or modelled, how sampling and privacy work, the time period, geography, duplication controls and confidence limits. A useful estimate can still be used—provided its provenance and limitations are visible.'
        ],
        example: {
          title: 'Illustrative example: luxury real estate',
          text: 'An international buyer may ask about discreet acquisition in a specific neighbourhood through a family office structure. That exact language may never appear in a public keyword tool. An adviser can still prioritise the theme when it recurs across approved enquiry records, partner interviews and buyer-journey research, while avoiding any claim about market-wide frequency.'
        }
      }
    ],
    limitations: sharedLimitations,
    sources: [
      { title: 'Guidelines for Human-AI Interaction', organization: 'Microsoft Research / CHI 2019', url: 'https://doi.org/10.1145/3290605.3300233' },
      { title: 'AI RMF Playbook', organization: 'National Institute of Standards and Technology', url: 'https://airc.nist.gov/airmf-resources/playbook/' },
      { title: 'Google Trends: FAQ about Trends data', organization: 'Google', url: 'https://support.google.com/trends/answer/4365533' },
      { title: 'Search Quality Rater Guidelines', organization: 'Google', url: 'https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf' }
    ],
    related: [
      { label: 'Recommendation gap research note', href: '/insights/recommendation-gap-known-vs-selected' },
      { label: 'Prompt and market intelligence services', href: '/services' },
      { label: 'Yachting decision context', href: '/industries/yachting' },
      { label: 'Luxury hospitality decision context', href: '/industries/luxury-hospitality' }
    ]
  },
  {
    slug: 'authority-without-overexposure',
    title: 'Authority without overexposure',
    deck: 'How reputation-sensitive brands can make expertise legible while preserving confidentiality, security and the right not to publish.',
    purpose: 'Provide an executive governance model for strengthening public authority without treating disclosure as the default.',
    datePublished: '2026-08-06',
    dateModified: '2026-08-06',
    lastReviewed: '2026-08-06',
    author: EDITORIAL_ORGANIZATION,
    reviewStatus: EXPERT_REVIEW_STATUS,
    executiveSummary: [
      'Authority does not require publishing every proof point. It requires a coherent, supportable account of what the organisation does, where it is qualified to act, how it governs quality and which independent signals a buyer can responsibly use.',
      'For reputation-sensitive brands, the right operating principle is minimum necessary disclosure. Classify evidence before activation, secure approval from the appropriate owner, and prefer process, standards, credentials and bounded examples when client identities or project details cannot be made public.'
    ],
    definitions: [
      {
        term: 'Authority architecture',
        quote: 'Authority architecture is the governed arrangement of facts, expertise, entities and independent evidence that makes a brand’s credible role understandable.'
      },
      {
        term: 'Minimum necessary disclosure',
        quote: 'Minimum necessary disclosure means publishing only the evidence required to support an approved claim, at the lowest sensitivity compatible with clarity and trust.'
      }
    ],
    sections: [
      {
        heading: 'Visibility is not the governing objective',
        paragraphs: [
          'A volume-led content programme can conflict with the obligations of a private bank, family office adviser, aviation operator, yacht firm, jeweller or prime property adviser. Client identities, asset details, security arrangements, transaction structures and operating patterns may be confidential, regulated, contractually restricted or simply inappropriate to expose.',
          'The strategic objective is therefore intelligibility, not maximal visibility. A buyer should be able to understand the entity, current offer, relevant expertise, operating boundaries and basis for trust. They do not need access to sensitive facts that exceed the decision purpose.',
          'NIST’s Privacy Framework treats data processing as a source of privacy risk that organisations should identify and govern. The UK Information Commissioner’s data-minimisation guidance similarly frames personal data as adequate, relevant and limited to what is necessary. These are privacy frameworks, not marketing recipes, but they support a useful editorial discipline: do not collect or publish sensitive material merely because it might create content.'
        ],
        example: {
          title: 'Illustrative example: yacht management',
          text: 'A management firm need not identify owners, itineraries, vessel locations or security arrangements. It can explain fleet-size parameters, technical and compliance disciplines, emergency governance, crew support, jurisdictional experience and senior qualifications. Independent accreditation or specialist commentary may support those claims without exposing a vessel.'
        }
      },
      {
        heading: 'Use an evidence classification and approval gate',
        paragraphs: [
          'Before content production, classify potential evidence. Public evidence is already approved and attributable. Publishable-with-review evidence may be used after legal, client, security or regulatory checks. Derived evidence can describe a pattern without revealing the underlying confidential record. Restricted evidence must remain internal. Unknown evidence is treated as restricted until ownership and permission are established.',
          'Every material claim should have an owner, source, sensitivity level, permitted channels, expiry or review date and approver. This prevents a true statement from being reused in a context where it becomes misleading, stale or unsafe.',
          'Approval is not a one-time release. Changes in ownership, personnel, regulation, certification, service scope or client consent can alter whether evidence remains fit for publication. A clear withdrawal path matters as much as the initial sign-off.'
        ],
        example: {
          title: 'Illustrative example: private wealth',
          text: 'A firm may be unable to describe family structures or outcomes. It can publish jurisdictional scope, adviser qualifications, governance principles, conflict policy, custody relationships where appropriate, service boundaries and independently verifiable regulatory status. Any example should be explicitly fictionalised or sufficiently general, never presented as an unnamed client success.'
        }
      },
      {
        heading: 'Build authority from layered, bounded proof',
        paragraphs: [
          'Start with entity clarity: official name, relationships, locations, leadership and current services. Add process evidence: how decisions are governed, what standards apply and where responsibilities begin and end. Add expertise evidence through attributable organisational authorship, verified credentials and specific explanations rather than personality-led overexposure.',
          'Independent authority may include regulators, standards bodies, professional institutions, respected specialist publications and clearly disclosed commercial relationships. The source should be relevant to the claim. A general award or directory listing should not be stretched into proof of specialised capability.',
          'When public proof remains insufficient, the honest answer may be to narrow the claim or accept that a recommendation cannot yet be supported. Confidential evidence can inform internal strategy, but its existence should not be hinted at as an unverifiable success story. Restraint protects both reputation and the integrity of the information environment.'
        ],
        example: {
          title: 'Illustrative example: high jewellery',
          text: 'A house can demonstrate authority through named craft disciplines, material sourcing policy, hallmarking and authentication processes, archive stewardship, repair standards and verified curator or institution references. It need not reveal a private collector, commission design or purchase history to establish seriousness.'
        }
      }
    ],
    limitations: [
      ...sharedLimitations,
      'This note is general strategic information, not legal, privacy, security or regulatory advice. Qualified owners must approve disclosure decisions for the relevant jurisdictions and obligations.'
    ],
    sources: [
      { title: 'NIST Privacy Framework 1.0', organization: 'National Institute of Standards and Technology', url: 'https://doi.org/10.6028/NIST.CSWP.01162020' },
      { title: 'Principle (c): Data minimisation', organization: 'UK Information Commissioner’s Office', url: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/the-principles/data-minimisation/' },
      { title: 'Cybersecurity Framework 2.0', organization: 'National Institute of Standards and Technology', url: 'https://doi.org/10.6028/NIST.CSWP.29' },
      { title: 'Protecting Personal Information: A Guide for Business', organization: 'US Federal Trade Commission', url: 'https://www.ftc.gov/business-guidance/resources/protecting-personal-information-guide-business' }
    ],
    related: [
      { label: 'Authority architecture services', href: '/services' },
      { label: 'Menchly methodology', href: '/methodology' },
      { label: 'Jewellery and watches decision context', href: '/industries/jewellery-watches' },
      { label: 'Recommendation gap research note', href: '/insights/recommendation-gap-known-vs-selected' }
    ]
  }
];

const requiredArticleFields = ['slug', 'title', 'deck', 'purpose', 'datePublished', 'dateModified', 'lastReviewed', 'author', 'reviewStatus', 'executiveSummary', 'definitions', 'sections', 'limitations', 'sources', 'related'];

export function validateInsightArticle(article) {
  const missing = requiredArticleFields.filter((field) => {
    const value = article?.[field];
    return value == null || value === '' || (Array.isArray(value) && value.length === 0);
  });
  if (article?.author !== EDITORIAL_ORGANIZATION) missing.push('organization author');
  if (article?.sources?.some((source) => !source.title || !source.organization || !source.url)) missing.push('complete sources');
  return { valid: missing.length === 0, missing };
}

export function getInsightArticle(slug) {
  return insightArticles.find((article) => article.slug === slug);
}

export const caseStudySchema = {
  requiredEvidence: ['challenge', 'approvedIntervention', 'substantiatedOutcome', 'sourceRecords'],
  requiredGates: ['evidenceVerified', 'clientApproved', 'legalApproved', 'published']
};

export function canPublishCaseStudy(caseStudy) {
  if (!caseStudy) return false;
  const hasEvidence = caseStudySchema.requiredEvidence.every((field) => {
    const value = caseStudy[field];
    return Array.isArray(value) ? value.length > 0 : typeof value === 'string' && value.trim().length > 0;
  });
  const gatesPass = caseStudySchema.requiredGates.every((gate) => caseStudy[gate] === true);
  return hasEvidence && gatesPass;
}

export const caseStudies = [];
export const publishableCaseStudies = caseStudies.filter(canPublishCaseStudy);

insightArticles.forEach((article) => {
  const validation = validateInsightArticle(article);
  if (!validation.valid) throw new Error(`Invalid insight article "${article?.slug || 'unknown'}": ${validation.missing.join(', ')}`);
});
