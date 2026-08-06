import { Link } from 'react-router-dom';
import { assessmentHref, footerIndustryItems, footerNavItems } from '../data.js';
import { trackEvent } from '../analytics.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__main">
          <div className="footer__brand">
            <Link className="brand" to="/"><span className="brand__name">Alora</span></Link>
            <p>AI visibility and reputation strategy for luxury and high-consideration brands.</p>
          </div>
          <div className="footer__links">
            <p>Explore</p>
            {footerNavItems.map((item) => <Link key={item.href} to={item.href}>{item.label}</Link>)}
          </div>
          <div className="footer__links">
            <p>Industries</p>
            {footerIndustryItems.map((item) => <Link key={item.href} to={item.href}>{item.label}</Link>)}
          </div>
          <div className="footer__links">
            <p>Enquiries</p>
            <Link to={assessmentHref} onClick={() => trackEvent('cta_click', { placement: 'footer', page: window.location.pathname })}>Private assessment</Link>
            <span>Engagements are reviewed for fit and category conflict.</span>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Alora. All rights reserved.</span>
          <div>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
