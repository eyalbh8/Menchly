import { Link } from 'react-router-dom';
import { assessmentHref, footerIndustryItems, footerNavItems } from '../data.js';
import { trackEvent } from '../analytics.js';
import { AssessmentLink, BrandMark } from './UI.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__cta">
        <div className="shell">
          <h2>
            <span className="final-cta__line">See where</span>
            <span className="final-cta__line final-cta__line--ghost">to act</span>
          </h2>
          <AssessmentLink placement="footer-cta">Private assessment</AssessmentLink>
        </div>
      </div>
      <div className="shell">
        <div className="footer__main">
          <div className="footer__brand">
            <Link className="brand" to="/">
              <BrandMark />
              <span className="brand__name">Alora</span>
            </Link>
            <p>AI Search marketing infrastructure for brands built to lead the next iteration of the Internet.</p>
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
