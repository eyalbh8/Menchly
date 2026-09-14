import BookMeeting from './BookMeeting.jsx';

export default function FloatingCal() {
  return (
    <BookMeeting className="floating-cal" placement="floating" aria-label="Book appointment">
      <span className="floating-cal__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="16" rx="3" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
      </span>
      <span className="floating-cal__label">Book appointment</span>
    </BookMeeting>
  );
}
