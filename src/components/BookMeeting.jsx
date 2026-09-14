import { calendarUrl, calLink, onBookMeetingClick } from '../cal.js';

export default function BookMeeting({
  className = 'button button--primary',
  placement = 'content',
  children,
  ...props
}) {
  return (
    <a
      className={className}
      href={calLink ? calendarUrl : '#contact'}
      onClick={(event) => onBookMeetingClick(event, { placement })}
      {...props}
    >
      {children}
    </a>
  );
}
