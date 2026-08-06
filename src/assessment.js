const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_PATTERN = /^https?:\/\/.+/i;
let sessionAttribution;

export const initialAssessmentValues = {
  name: '',
  email: '',
  company: '',
  website: '',
  role: '',
  industry: '',
  markets: '',
  objective: '',
  concern: '',
  budget: '',
  privacyConsent: false,
  analyticsConsent: false,
  websiteConfirmation: ''
};

export function parseBudgetRanges(raw = '') {
  if (!raw?.trim()) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.map(String).map((item) => item.trim()).filter(Boolean);
  } catch {
    // A short delimiter-separated value is also supported for simpler hosts.
  }
  return raw.split(/\s*(?:\||;|\n)\s*/).map((item) => item.trim()).filter(Boolean);
}

export function classifyAIReferrer(referrer = '') {
  if (!referrer) return null;
  let hostname;
  try {
    hostname = new URL(referrer).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return null;
  }
  const sources = [
    ['chatgpt.com', 'chatgpt'],
    ['chat.openai.com', 'chatgpt'],
    ['perplexity.ai', 'perplexity'],
    ['claude.ai', 'claude'],
    ['gemini.google.com', 'gemini'],
    ['copilot.microsoft.com', 'microsoft-copilot'],
    ['bing.com', 'microsoft-copilot'],
    ['you.com', 'you-com']
  ];
  return sources.find(([domain]) => hostname === domain || hostname.endsWith(`.${domain}`))?.[1] || null;
}

export function captureAttribution(locationLike, referrer = '') {
  const params = new URLSearchParams(locationLike?.search || '');
  const utm = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
    const value = params.get(key)?.trim();
    if (value) utm[key] = value.slice(0, 200);
  });
  return {
    landingPage: `${locationLike?.pathname || '/'}${locationLike?.search || ''}`.slice(0, 1000),
    referrer: referrer.slice(0, 1000) || null,
    aiReferrer: classifyAIReferrer(referrer),
    utm
  };
}

export function rememberAttribution(locationLike, referrer = '') {
  if (!sessionAttribution) sessionAttribution = captureAttribution(locationLike, referrer);
  return sessionAttribution;
}

export function validateAssessment(values, approvedBudgets = []) {
  const errors = {};
  const required = [
    ['name', 'Enter your name.'],
    ['email', 'Enter your work email.'],
    ['company', 'Enter your company.'],
    ['website', 'Enter your company website.'],
    ['role', 'Select your role.'],
    ['industry', 'Select your industry.'],
    ['markets', 'Enter your primary markets.'],
    ['objective', 'Select your main objective.']
  ];
  required.forEach(([key, message]) => {
    if (!values[key]?.trim()) errors[key] = message;
  });
  if (values.email && !EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Enter a valid work email address.';
  if (values.website) {
    const normalized = /^https?:\/\//i.test(values.website.trim()) ? values.website.trim() : `https://${values.website.trim()}`;
    if (!URL_PATTERN.test(normalized)) errors.website = 'Enter a valid company website.';
    else {
      try {
        new URL(normalized);
      } catch {
        errors.website = 'Enter a valid company website.';
      }
    }
  }
  if (approvedBudgets.length && values.budget && !approvedBudgets.includes(values.budget)) {
    errors.budget = 'Select an approved investment range.';
  }
  if (!values.privacyConsent) errors.privacyConsent = 'Consent is required so we can review and respond to your request.';
  return errors;
}

export function createAssessmentPayload(values, attribution, approvedBudgets = []) {
  const clean = (value, max = 1000) => String(value || '').trim().slice(0, max);
  const website = clean(values.website, 500);
  const payload = {
    schemaVersion: 1,
    submittedAt: new Date().toISOString(),
    contact: {
      name: clean(values.name, 120),
      workEmail: clean(values.email, 254).toLowerCase(),
      company: clean(values.company, 200),
      website: /^https?:\/\//i.test(website) ? website : `https://${website}`,
      role: clean(values.role, 120)
    },
    assessment: {
      industry: clean(values.industry, 160),
      primaryMarkets: clean(values.markets, 500),
      mainObjective: clean(values.objective, 300),
      currentConcern: clean(values.concern, 2000) || null
    },
    consent: {
      privacy: values.privacyConsent === true,
      analytics: values.analyticsConsent === true,
      capturedAt: new Date().toISOString()
    },
    attribution
  };
  if (approvedBudgets.includes(values.budget)) payload.assessment.approximateInvestment = values.budget;
  return payload;
}

export async function submitAssessment(endpoint, payload, { timeoutMs = 12000, fetchImpl = globalThis.fetch } = {}) {
  if (!endpoint?.trim()) return { ok: false, reason: 'unavailable' };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    if (!response.ok) return { ok: false, reason: 'rejected', status: response.status };
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: error?.name === 'AbortError' ? 'timeout' : 'network' };
  } finally {
    clearTimeout(timer);
  }
}
