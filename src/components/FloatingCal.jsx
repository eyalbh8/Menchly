import { trackEvent } from '../analytics.js';

const calendarUrl = import.meta.env.VITE_CALENDAR_URL || '';

export default function FloatingCal() {
  const href = calendarUrl || '#contact';
  const external = Boolean(calendarUrl);

  return (
    <a
      className="floating-cal"
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      onClick={() => trackEvent('calendar_handoff', {
        placement: 'floating',
        page: window.location.pathname,
        mode: external ? 'calendar' : 'contact'
      })}
    >
      <span className="floating-cal__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="16" rx="3" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
      </span>
      <span>Book appointment</span>
    </a>
  );
}
