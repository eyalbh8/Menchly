import assert from 'node:assert/strict';
import {
  formatEnquiryMessage,
  isTelegramConfigured,
  sendTelegramMessage,
  telegramConfig,
  validateEnquiryPayload
} from '../server/enquiry.mjs';

assert.equal(isTelegramConfigured({}), false);
assert.deepEqual(telegramConfig({ TELEGRAM_BOT_TOKEN: 'abc', TELEGRAM_CHAT_ID: '1, 2' }), {
  token: 'abc',
  chatIds: ['1', '2']
});

const lead = {
  formType: 'contact-lead',
  contact: { name: 'Jane Doe', workEmail: 'jane@example.com', company: 'Menchly', phone: '+357 99' },
  attribution: { landingPage: '/', referrer: 'https://chatgpt.com/', aiReferrer: 'chatgpt', utm: { utm_source: 'hero' } }
};
assert.equal(validateEnquiryPayload(lead).ok, true);
assert.equal(validateEnquiryPayload({ contact: { name: 'Jane' } }).ok, false);

const text = formatEnquiryMessage(lead);
assert.match(text, /Contact lead/);
assert.match(text, /Jane Doe/);
assert.match(text, /jane@example.com/);
assert.match(text, /utm_source=hero/);
assert.doesNotMatch(text, /TELEGRAM_BOT_TOKEN/);

const assessment = {
  contact: { name: 'Jane Doe', workEmail: 'jane@example.com', company: 'Menchly', website: 'https://menchly.com', role: 'Founder / owner' },
  assessment: { industry: 'Yachting', primaryMarkets: 'Europe', mainObjective: 'Baseline', currentConcern: 'Visibility' }
};
assert.match(formatEnquiryMessage(assessment), /Private assessment/);
assert.match(formatEnquiryMessage(assessment), /Yachting/);

const calls = [];
const okFetch = async (url, options) => {
  calls.push({ url, options });
  return { ok: true, status: 200, text: async () => '' };
};
assert.deepEqual(
  await sendTelegramMessage({ TELEGRAM_BOT_TOKEN: 'secret-token', TELEGRAM_CHAT_ID: '99' }, 'Hello', okFetch),
  { ok: true }
);
assert.equal(calls[0].url, 'https://api.telegram.org/botsecret-token/sendMessage');
assert.equal(JSON.parse(calls[0].options.body).chat_id, '99');
assert.equal(JSON.parse(calls[0].options.body).text, 'Hello');
assert.deepEqual(await sendTelegramMessage({}, 'Hello', okFetch), { ok: false, reason: 'unavailable' });

console.log('Enquiry Telegram formatting and dispatch checks passed.');
