import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { assessmentHref, primaryNavItems } from '../data.js';
import { trackEvent } from '../analytics.js';
import { BrandMark } from './UI.jsx';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const closeOnWide = () => {
      if (window.innerWidth >= 900) setOpen(false);
    };
    window.addEventListener('resize', closeOnWide);
    return () => window.removeEventListener('resize', closeOnWide);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    const closeOnEscape = (event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.classList.remove('nav-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <header className="site-header">
      <nav className="nav shell" aria-label="Primary navigation">
        <Link className="brand" to="/" aria-label="Menchly, home">
          <BrandMark />
          <span className="brand__name">Menchly</span>
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-menu"
          onClick={() => setOpen((value) => !value)}
          ref={toggleRef}
        >
          <span className="sr-only">{open ? 'Close' : 'Open'} navigation</span>
          <span aria-hidden="true">{open ? 'Close' : 'Menu'}</span>
        </button>
        <div id="primary-menu" className={`nav-menu ${open ? 'is-open' : ''}`}>
          <div className="nav-links">
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => isActive ? 'is-active' : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <NavLink className="nav-assessment" to={assessmentHref} onClick={() => {
            trackEvent('cta_click', { placement: 'navigation', page: location.pathname });
            setOpen(false);
          }}>
            Private assessment
          </NavLink>
        </div>
      </nav>
      {open && <button className="nav-scrim" aria-label="Close navigation" onClick={() => setOpen(false)} />}
    </header>
  );
}
