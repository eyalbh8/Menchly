import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Homepage from './components/Homepage.jsx';
import Footer from './components/Footer.jsx';
import FloatingCal from './components/FloatingCal.jsx';
import SeoManager from './components/SeoManager.jsx';
import AssessmentPage from './components/AssessmentPage.jsx';
import { trackEvent } from './analytics.js';
import { rememberAttribution } from './assessment.js';
import {
  AboutPage,
  IndustriesPage,
  IndustryPage,
  InsightArticlePage,
  InsightsPage,
  LegalPage,
  MethodologyPage,
  NotFoundPage,
  ServicesPage,
  ThankYouPage
} from './components/Pages.jsx';

function RouteScrollManager() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    const pathChanged = previousPath.current !== pathname;
    previousPath.current = pathname;

    if (hash) {
      const timer = window.setTimeout(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (target) target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      }, 0);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    if (pathChanged) document.getElementById('main-content')?.focus({ preventScroll: true });
    return undefined;
  }, [pathname, hash]);

  return null;
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span style={{ height: `${progress * 100}%` }} />
    </div>
  );
}

function RouteAnalytics() {
  const { pathname } = useLocation();
  useEffect(() => {
    rememberAttribution(window.location, document.referrer);
    if (pathname === '/methodology') trackEvent('methodology_view', { page: pathname });
    if (pathname.startsWith('/industries/')) trackEvent('industry_view', { page: pathname, industry: pathname.split('/').pop() });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="site">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <ScrollProgress />
      <RouteScrollManager />
      <RouteAnalytics />
      <SeoManager />
      <Nav />
      <main id="main-content" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/industries/:industrySlug" element={<IndustryPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:slug" element={<InsightArticlePage />} />
          <Route path="/private-ai-visibility-assessment" element={<AssessmentPage />} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingCal />
    </div>
  );
}
