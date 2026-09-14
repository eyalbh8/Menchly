import { trackEvent } from './analytics.js';

const CAL_EMBED_SRC = 'https://app.cal.com/embed/embed.js';
const CAL_ORIGIN = 'https://app.cal.com';

export function parseCalLink(value = '') {
  const raw = String(value).trim();
  if (!raw) return { calLink: '', href: '', origin: CAL_ORIGIN };

  if (!/^https?:\/\//i.test(raw)) {
    const calLink = raw.replace(/^\/+/, '').replace(/\/+$/, '');
    return { calLink, href: `https://cal.com/${calLink}`, origin: CAL_ORIGIN };
  }

  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./, '');
    const isCalCloud = host === 'cal.com' || host === 'app.cal.com';
    const isCal = isCalCloud || host.endsWith('.cal.com');
    const calLink = url.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
    return {
      calLink: isCal ? calLink : '',
      href: raw,
      origin: isCalCloud || !isCal ? CAL_ORIGIN : `${url.protocol}//${url.hostname}`
    };
  } catch {
    return { calLink: '', href: raw, origin: CAL_ORIGIN };
  }
}

const configured = parseCalLink(import.meta.env.VITE_CALENDAR_URL || '');

export const calendarUrl = configured.href;
export const calLink = configured.calLink;

function installCalStub(win) {
  if (win.Cal) return;

  (function (C, A, L) {
    const p = function (a, ar) {
      a.q.push(ar);
    };
    const d = C.document;
    C.Cal = function () {
      const cal = C.Cal;
      const ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement('script')).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () {
          p(api, arguments);
        };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === 'string') {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ['initNamespace', namespace]);
        } else {
          p(cal, ar);
        }
        return;
      }
      p(cal, ar);
    };
  })(win, CAL_EMBED_SRC, 'init');
}

let inited = false;

export function initCal() {
  if (typeof window === 'undefined' || !calLink || inited) return;
  inited = true;
  installCalStub(window);
  window.Cal('init', { origin: configured.origin || CAL_ORIGIN });
  window.Cal('ui', {
    hideEventTypeDetails: false,
    layout: 'month_view',
    theme: 'light',
    cssVarsPerTheme: {
      light: { 'cal-brand': '#2d4f9e' }
    }
  });
}

export function openCalModal() {
  if (!calLink) return false;
  initCal();
  if (typeof window === 'undefined' || !window.Cal) return false;
  window.Cal('modal', {
    calLink,
    config: { layout: 'month_view' }
  });
  return true;
}

export function onBookMeetingClick(event, { placement } = {}) {
  trackEvent('calendar_handoff', {
    placement,
    page: window.location.pathname,
    mode: calLink ? 'calendar' : 'contact'
  });
  if (!calLink) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  openCalModal();
}
