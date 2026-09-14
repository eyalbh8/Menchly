import { useState } from 'react';
import { Link } from 'react-router-dom';
import { rememberAttribution, submitAssessment } from '../assessment.js';
import { trackEvent } from '../analytics.js';

const endpoint = import.meta.env.VITE_ASSESSMENT_ENDPOINT || '';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues = {
  name: '',
  email: '',
  company: '',
  phone: '',
  websiteConfirmation: ''
};

export default function ContactLead() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Enter your name.';
    if (!values.email.trim() || !EMAIL_PATTERN.test(values.email.trim())) next.email = 'Enter a valid email.';
    if (!values.company.trim()) next.company = 'Enter your company name.';
    return next;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (values.websiteConfirmation) return;
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus('error');
      setStatusMessage('Please review the highlighted details.');
      return;
    }

    setStatus('submitting');
    setStatusMessage('Sending…');
    const attribution = rememberAttribution(window.location, document.referrer);
    const payload = {
      schemaVersion: 1,
      formType: 'contact-lead',
      submittedAt: new Date().toISOString(),
      contact: {
        name: values.name.trim().slice(0, 120),
        workEmail: values.email.trim().toLowerCase().slice(0, 254),
        company: values.company.trim().slice(0, 200),
        phone: values.phone.trim().slice(0, 40) || null
      },
      attribution
    };

    const result = await submitAssessment(endpoint, payload);
    if (!result.ok) {
      setStatus('error');
      setStatusMessage(result.reason === 'unavailable'
        ? 'Online enquiries are not configured yet Please use Private assessment or email Menchly directly.'
        : 'We could not send your details Please try again.');
      trackEvent('submit_error', { reason: result.reason, page: window.location.pathname, form: 'contact-lead' });
      return;
    }

    setStatus('success');
    setStatusMessage('Thanks  -  we have your details and will be in touch.');
    setValues(initialValues);
    trackEvent('submit_success', { page: window.location.pathname, form: 'contact-lead' });
  };

  return (
    <section id="contact" className="contact-lead">
      <div className="shell contact-lead__layout">
        <div>
          <p className="eyebrow">Leave your details</p>
          <h2>Tell us who to reach.</h2>
          <p>Share a few details and we will follow up Prefer a full private assessment? <Link to="/private-ai-visibility-assessment">Start here</Link>.</p>
        </div>
        <form className="contact-lead__form contact-lead__card" noValidate onSubmit={onSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="lead-name">Name</label>
              <input id="lead-name" name="name" autoComplete="name" value={values.name} onChange={onChange} aria-invalid={Boolean(errors.name)} />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>
            <div className="form-field">
              <label htmlFor="lead-email">Email</label>
              <input id="lead-email" name="email" type="email" autoComplete="email" value={values.email} onChange={onChange} aria-invalid={Boolean(errors.email)} />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>
            <div className="form-field">
              <label htmlFor="lead-company">Company name</label>
              <input id="lead-company" name="company" autoComplete="organization" value={values.company} onChange={onChange} aria-invalid={Boolean(errors.company)} />
              {errors.company && <p className="field-error">{errors.company}</p>}
            </div>
            <div className="form-field">
              <label htmlFor="lead-phone">Phone number <span className="field-optional">optional</span></label>
              <input id="lead-phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={onChange} />
            </div>
          </div>
          <div className="form-honeypot" aria-hidden="true">
            <label htmlFor="lead-website">Leave this field empty</label>
            <input id="lead-website" name="websiteConfirmation" tabIndex={-1} autoComplete="off" value={values.websiteConfirmation} onChange={onChange} />
          </div>
          <div className="form-submit">
            <button className="button button--primary" type="submit" disabled={status === 'submitting'}>
              <span>{status === 'submitting' ? 'Sending…' : 'Send details'}</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
          {statusMessage && (
            <p className={`form-status${status === 'error' ? ' form-status--error' : ''}`} role="status">
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
