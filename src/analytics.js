const EVENTS = new Set([
  'cta_click',
  'form_start',
  'validation_error',
  'submit_success',
  'submit_error',
  'calendar_handoff',
  'industry_view',
  'methodology_view'
]);
const SAFE_KEYS = new Set(['placement', 'page', 'fieldCount', 'reason', 'industry']);
let consentGranted = false;
const pending = [];

function cleanMetadata(metadata = {}) {
  return Object.fromEntries(
    Object.entries(metadata)
      .filter(([key, value]) => SAFE_KEYS.has(key) && ['string', 'number', 'boolean'].includes(typeof value))
      .map(([key, value]) => [key, typeof value === 'string' ? value.slice(0, 100) : value])
  );
}

function emit(event) {
  if (typeof window === 'undefined') return;
  window.menchlyAnalytics = window.menchlyAnalytics || [];
  window.menchlyAnalytics.push(event);
  window.dispatchEvent(new CustomEvent('menchly:analytics', { detail: event }));
}

export function trackEvent(name, metadata = {}) {
  if (!EVENTS.has(name) || typeof window === 'undefined') return;
  const event = { name, metadata: cleanMetadata(metadata), timestamp: new Date().toISOString() };
  if (!consentGranted) {
    pending.push(event);
    return;
  }
  emit(event);
}

export function setAnalyticsConsent(granted) {
  consentGranted = granted === true;
  if (!consentGranted) {
    pending.length = 0;
    return;
  }
  pending.splice(0).forEach(emit);
}

export function getSanitizedAnalyticsEvent(name, metadata = {}) {
  if (!EVENTS.has(name)) return null;
  return { name, metadata: cleanMetadata(metadata) };
}
