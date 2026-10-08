import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { assessmentHref, primaryNavItems } from '../data.js';
import { trackEvent } from '../analytics.js';
import { BrandMark } from './UI.jsx';

const hoverCapable = () => window.matchMedia('(hover: hover) and (min-width: 900px)').matches;

function NavGroup({ item, onNavigate }) {
  const [expanded, setExpanded] = useState(false);
  const groupRef = useRef(null);
  const toggleRef = useRef(null);
  const location = useLocation();
  const menuId = `nav-${item.label.toLowerCase()}-menu`;

  useEffect(() => {
    setExpanded(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!expanded) return undefined;
    const closeOnOutside = (event) => {
      if (!groupRef.current?.contains(event.target)) setExpanded(false);
    };
    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return;
      event.stopPropagation();
      setExpanded(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('pointerdown', closeOnOutside);
    groupRef.current?.addEventListener('keydown', closeOnEscape);
    const group = groupRef.current;
    return () => {
      document.removeEventListener('pointerdown', closeOnOutside);
      group?.removeEventListener('keydown', closeOnEscape);
    };
  }, [expanded]);

  return (
    <div
      className={`nav-group ${expanded ? 'is-open' : ''}`.trim()}
      ref={groupRef}
      onMouseEnter={() => { if (hoverCapable()) setExpanded(true); }}
      onMouseLeave={() => { if (hoverCapable()) setExpanded(false); }}
    >
      <div className="nav-group__trigger">
        <NavLink to={item.href} className={({ isActive }) => isActive ? 'is-active' : undefined} onClick={onNavigate}>
          {item.label}
        </NavLink>
        <button
          type="button"
          className="nav-group__toggle"
          aria-expanded={expanded}
          aria-controls={menuId}
          onClick={(event) => {
            const pointerOnHoverDevice = event.detail > 0 && hoverCapable();
            setExpanded((value) => (pointerOnHoverDevice ? true : !value));
          }}
          ref={toggleRef}
        >
          <span className="sr-only">{expanded ? 'Hide' : 'Show'} {item.label.toLowerCase()} pages</span>
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 4.5 6 8l3.5-3.5" />
          </svg>
        </button>
      </div>
      <ul id={menuId} className="nav-submenu">
        {item.children.map((child) => (
          <li key={child.href}>
            <NavLink to={child.href} className={({ isActive }) => isActive ? 'is-active' : undefined} onClick={onNavigate}>
              {child.label}
            </NavLink>
          </li>
        ))}
        <li className="nav-submenu__all">
          <NavLink to={item.href} end className={({ isActive }) => isActive ? 'is-active' : undefined} onClick={onNavigate}>
            All {item.label.toLowerCase()}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

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

  const [overHero, setOverHero] = useState(false);

  useEffect(() => {
    const hero = location.pathname === '/' ? document.getElementById('top') : null;
    if (!hero) {
      setOverHero(false);
      return undefined;
    }
    const update = () => setOverHero(hero.getBoundingClientRect().bottom > 72);
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [location.pathname]);

  const isHomeTop = overHero && !open;

  return (
    <>
    <header className={`site-header${isHomeTop ? ' site-header--on-dark' : ''}`}>
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
          <span aria-hidden="true">
            {open ? 'Close' : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </span>
        </button>
        <div id="primary-menu" className={`nav-menu ${open ? 'is-open' : ''}`}>
          <div className="nav-links">
            {primaryNavItems.map((item) => (item.children ? (
              <NavGroup key={item.href} item={item} onNavigate={() => setOpen(false)} />
            ) : (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => isActive ? 'is-active' : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            )))}
          </div>
          <NavLink className="nav-assessment" to={assessmentHref} onClick={() => {
            trackEvent('cta_click', { placement: 'navigation', page: location.pathname });
            setOpen(false);
          }}>
            Private assessment
          </NavLink>
        </div>
      </nav>
    </header>
      {open && <button className="nav-scrim" aria-label="Close navigation" onClick={() => setOpen(false)} />}
    </>
  );
}
