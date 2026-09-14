const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 50_000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 8;
const hitsByIp = new Map();

export function telegramConfig(env = process.env) {
  const token = String(env.TELEGRAM_BOT_TOKEN || '').trim();
  const chatIds = String(env.TELEGRAM_CHAT_ID || env.TELEGRAM_CHAT_IDS || '')
    .split(/[\s,]+/)
    .map((id) => id.trim())
    .filter(Boolean);
  return { token, chatIds };
}

export function isTelegramConfigured(env = process.env) {
  const { token, chatIds } = telegramConfig(env);
  return Boolean(token && chatIds.length);
}

function clean(value, max = 500) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function line(label, value) {
  const text = clean(value, 1000);
  return text ? `${label}: ${text}` : null;
}

export function validateEnquiryPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, reason: 'invalid' };
  }
  const contact = payload.contact;
  if (!contact || typeof contact !== 'object') return { ok: false, reason: 'invalid' };
  const name = clean(contact.name, 120);
  const email = clean(contact.workEmail || contact.email, 254).toLowerCase();
  const company = clean(contact.company, 200);
  if (!name || !company || !EMAIL_PATTERN.test(email)) return { ok: false, reason: 'invalid' };
  return { ok: true };
}

export function formatEnquiryMessage(payload) {
  const contact = payload.contact || {};
  const assessment = payload.assessment || {};
  const attribution = payload.attribution || {};
  const isLead = payload.formType === 'contact-lead';
  const title = isLead ? 'Menchly · Contact lead' : 'Menchly · Private assessment';
  const utm = attribution.utm && typeof attribution.utm === 'object'
    ? Object.entries(attribution.utm).map(([key, value]) => `${key}=${clean(value, 120)}`).join(' ')
    : '';

  return [
    title,
    '',
    line('Name', contact.name),
    line('Email', contact.workEmail || contact.email),
    line('Company', contact.company),
    line('Phone', contact.phone),
    line('Website', contact.website),
    line('Role', contact.role),
    line('Industry', assessment.industry),
    line('Markets', assessment.primaryMarkets),
    line('Objective', assessment.mainObjective),
    line('Investment', assessment.approximateInvestment),
    line('Message', assessment.currentConcern),
    '',
    line('Page', attribution.landingPage),
    line('Referrer', attribution.referrer),
    line('AI referrer', attribution.aiReferrer),
    utm ? `UTM: ${utm.slice(0, 400)}` : null
  ].filter(Boolean).join('\n');
}

export async function sendTelegramMessage(env, text, fetchImpl = globalThis.fetch) {
  const { token, chatIds } = telegramConfig(env);
  if (!token || !chatIds.length) return { ok: false, reason: 'unavailable' };

  const results = await Promise.all(chatIds.map(async (chatId) => {
    const response = await fetchImpl(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true
      })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      return { ok: false, status: response.status, detail: detail.slice(0, 300) };
    }
    return { ok: true };
  }));

  if (results.every((result) => result.ok)) return { ok: true };
  return results.find((result) => !result.ok) || { ok: false, reason: 'rejected' };
}

function clientIp(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return forwarded || req.socket?.remoteAddress || 'unknown';
}

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hitsByIp.get(ip) || []).filter((time) => now - time < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hitsByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  hitsByIp.set(ip, recent);
  return false;
}

function allowedOrigins(env) {
  const origins = new Set();
  const site = String(env.VITE_SITE_URL || '').replace(/\/$/, '');
  if (site) origins.add(site);
  return origins;
}

function isAllowedOrigin(origin, env) {
  if (!origin) return false;
  if (allowedOrigins(env).has(origin)) return true;
  try {
    const host = new URL(origin).hostname;
    return host === 'localhost' || host === '127.0.0.1';
  } catch {
    return false;
  }
}

function setCors(req, res, env) {
  const origin = req.headers.origin;
  if (isAllowedOrigin(origin, env)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
}

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error('too_large'), { code: 'too_large' }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

export async function handleEnquiryRequest(req, res, env = process.env, fetchImpl = globalThis.fetch) {
  setCors(req, res, env);
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }
  if (req.method !== 'POST') {
    sendJson(res, 405, { ok: false, reason: 'method' });
    return;
  }
  if (!isTelegramConfigured(env)) {
    sendJson(res, 503, { ok: false, reason: 'unavailable' });
    return;
  }
  if (rateLimited(clientIp(req))) {
    sendJson(res, 429, { ok: false, reason: 'rate_limited' });
    return;
  }

  let payload;
  try {
    payload = JSON.parse(await readBody(req));
  } catch (error) {
    sendJson(res, error?.code === 'too_large' ? 413 : 400, { ok: false, reason: 'invalid' });
    return;
  }

  if (!validateEnquiryPayload(payload).ok) {
    sendJson(res, 400, { ok: false, reason: 'invalid' });
    return;
  }

  try {
    const result = await sendTelegramMessage(env, formatEnquiryMessage(payload), fetchImpl);
    if (!result.ok) {
      const status = result.reason === 'unavailable' ? 503 : 502;
      sendJson(res, status, { ok: false, reason: result.reason || 'rejected' });
      return;
    }
    sendJson(res, 200, { ok: true });
  } catch {
    sendJson(res, 502, { ok: false, reason: 'network' });
  }
}
