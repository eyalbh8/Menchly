import assert from 'node:assert/strict';
import {
  captureAttribution,
  classifyAIReferrer,
  createAssessmentPayload,
  parseBudgetRanges,
  rememberAttribution,
  submitAssessment,
  validateAssessment
} from '../src/assessment.js';
import { getSanitizedAnalyticsEvent } from '../src/analytics.js';

const valid = {
  name: 'A Person',
  email: 'LEADER@EXAMPLE.COM',
  company: 'Example',
  website: 'example.com',
  role: 'Founder / owner',
  industry: 'Yachting',
  markets: 'Europe',
  objective: 'Establish an AI recommendation baseline',
  concern: 'A concise concern',
  budget: '£25k–£50k',
  privacyConsent: true,
  analyticsConsent: true
};

assert.deepEqual(parseBudgetRanges('["£25k–£50k","£50k+"]'), ['£25k–£50k', '£50k+']);
assert.deepEqual(parseBudgetRanges('Range one|Range two'), ['Range one', 'Range two']);
assert.deepEqual(parseBudgetRanges(''), []);
assert.equal(classifyAIReferrer('https://www.perplexity.ai/search?q=menchly'), 'perplexity');
assert.equal(classifyAIReferrer('https://claude.ai/new'), 'claude');
assert.equal(classifyAIReferrer('https://example.com'), null);

const attribution = captureAttribution(
  { pathname: '/private-ai-visibility-assessment', search: '?utm_source=private-adviser&utm_campaign=launch&other=ignored' },
  'https://chatgpt.com/'
);
assert.equal(attribution.aiReferrer, 'chatgpt');
assert.deepEqual(attribution.utm, { utm_source: 'private-adviser', utm_campaign: 'launch' });
assert.equal(rememberAttribution({ pathname: '/industries/yachting', search: '?utm_source=advisor' }, 'https://claude.ai/').landingPage, '/industries/yachting?utm_source=advisor');
assert.equal(rememberAttribution({ pathname: '/private-ai-visibility-assessment', search: '' }, '').landingPage, '/industries/yachting?utm_source=advisor');

assert.deepEqual(validateAssessment(valid, ['£25k–£50k']), {});
const invalid = validateAssessment({ ...valid, email: 'not-an-email', privacyConsent: false }, ['£25k–£50k']);
assert.ok(invalid.email);
assert.ok(invalid.privacyConsent);

const payload = createAssessmentPayload({ ...valid, websiteConfirmation: 'must-not-leak', extra: 'must-not-leak' }, attribution, ['£25k–£50k']);
assert.equal(payload.contact.workEmail, 'leader@example.com');
assert.equal(payload.assessment.approximateInvestment, '£25k–£50k');
assert.equal(payload.consent.privacy, true);
assert.equal(payload.consent.analytics, true);
assert.ok(!JSON.stringify(payload).includes('must-not-leak'));
assert.ok(!('approximateInvestment' in createAssessmentPayload({ ...valid, budget: 'invented' }, attribution, ['£25k–£50k']).assessment));

const analytics = getSanitizedAnalyticsEvent('cta_click', {
  placement: 'homepage-hero',
  page: '/',
  email: 'leader@example.com',
  name: 'A Person'
});
assert.deepEqual(analytics, { name: 'cta_click', metadata: { placement: 'homepage-hero', page: '/' } });
assert.equal(getSanitizedAnalyticsEvent('unapproved_event', { page: '/' }), null);

assert.deepEqual(await submitAssessment('', payload), { ok: false, reason: 'unavailable' });
assert.deepEqual(
  await submitAssessment('https://example.com/assessment', payload, { fetchImpl: async () => ({ ok: false, status: 503 }) }),
  { ok: false, reason: 'unavailable', status: 503 }
);
assert.deepEqual(
  await submitAssessment('https://example.com/assessment', payload, { fetchImpl: async () => ({ ok: false, status: 400 }) }),
  { ok: false, reason: 'rejected', status: 400 }
);
assert.deepEqual(
  await submitAssessment('https://example.com/assessment', payload, { fetchImpl: async () => ({ ok: true, status: 202 }) }),
  { ok: true }
);

console.log('Assessment verification passed: validation, attribution, sanitization and endpoint outcomes.');
