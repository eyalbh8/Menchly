import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  createAssessmentPayload,
  initialAssessmentValues,
  parseBudgetRanges,
  rememberAttribution,
  submitAssessment,
  validateAssessment
} from '../assessment.js';
import { setAnalyticsConsent, trackEvent } from '../analytics.js';

const roles = ['Founder / owner', 'Chief executive', 'Marketing / brand leader', 'Communications / reputation leader', 'Digital / growth leader', 'Adviser / agency partner', 'Other'];
const industries = ['Yachting', 'Private aviation', 'Luxury real estate', 'Jewellery & watches', 'Luxury hospitality', 'Financial / professional services', 'Other high-consideration category'];
const objectives = ['Establish an AI recommendation baseline', 'Improve visibility with priority buyers', 'Correct inaccurate or outdated interpretation', 'Strengthen authority and reputation signals', 'Prepare for a market, brand or reputation initiative', 'Explore strategic fit'];
const approvedBudgets = parseBudgetRanges(import.meta.env.VITE_BUDGET_RANGES || '');
const endpoint = import.meta.env.VITE_ASSESSMENT_ENDPOINT || '';

function Field({ id, label, hint, error, children, className = '' }) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div className={`form-field ${className}`.trim()}>
      <label htmlFor={id}>{label}</label>
      {hint && <p className="field-hint" id={`${id}-hint`}>{hint}</p>}
      {children({ id, describedBy, invalid: Boolean(error) })}
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}

export default function AssessmentPage() {
  const [values, setValues] = useState(initialAssessmentValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const started = useRef(false);
  const errorSummary = useRef(null);
  const navigate = useNavigate();

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };
  const updateAnalyticsConsent = (event) => {
    const granted = event.target.checked;
    setValues((current) => ({ ...current, analyticsConsent: granted }));
    setAnalyticsConsent(granted);
  };
  const onStart = () => {
    if (started.current) return;
    started.current = true;
    trackEvent('form_start', { page: '/private-ai-visibility-assessment' });
  };
  const inputProps = (field, details) => ({
    id: details.id,
    name: field,
    value: values[field],
    onChange: update(field),
    onFocus: onStart,
    'aria-describedby': details.describedBy,
    'aria-invalid': details.invalid
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (values.websiteConfirmation) {
      setStatus('error');
      setStatusMessage('We could not process this request Please contact Menchly through an approved direct channel.');
      return;
    }
    const nextErrors = validateAssessment(values, approvedBudgets);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus('idle');
      trackEvent('validation_error', { fieldCount: Object.keys(nextErrors).length, page: '/private-ai-visibility-assessment' });
      requestAnimationFrame(() => errorSummary.current?.focus());
      return;
    }

    setAnalyticsConsent(values.analyticsConsent);
    setStatus('loading');
    setStatusMessage('');
    const attribution = rememberAttribution(window.location, document.referrer);
    const payload = createAssessmentPayload(values, attribution, approvedBudgets);
    const result = await submitAssessment(endpoint, payload);
    if (!result.ok) {
      const unavailable = result.reason === 'unavailable';
      setStatus('error');
      setStatusMessage(unavailable
        ? 'Online assessment requests are not available yet Your information has not been sent Please return once a secure enquiry endpoint has been configured.'
        : 'We could not securely send your request Nothing has been confirmed Please try again later or contact Menchly through an approved direct channel.');
      trackEvent('submit_error', { reason: result.reason, page: '/private-ai-visibility-assessment' });
      return;
    }
    trackEvent('submit_success', { page: '/private-ai-visibility-assessment' });
    navigate('/thank-you', { state: { assessmentSubmitted: true } });
  };

  return (
    <>
      <section className="assessment-hero">
        <div className="shell">
          <div className="assessment-intro">
            <div>
              <p className="eyebrow">Private AI visibility assessment</p>
              <h1>A discreet first look at how your brand is understood.</h1>
            </div>
            <div>
              <p>This confidential enquiry helps us assess strategic fit, category context and the buyer questions most relevant to your organisation It is not an automated score or a promise of model placement.</p>
              <ul>
                <li>Reviewed for fit and potential category conflict</li>
                <li>No confidential client or project details required</li>
                <li>Submitted only to your configured secure endpoint</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="assessment-section">
        <div className="shell assessment-layout">
          <aside>
            <p className="eyebrow">Before you begin</p>
            <h2>Share only what is appropriate at this stage.</h2>
            <p>Please do not include passwords, special-category personal data, privileged material or confidential client identities We will agree information boundaries before any substantive review.</p>
          </aside>

          <form className="assessment-form" noValidate onSubmit={onSubmit}>
            {Object.keys(errors).length > 0 && (
              <div className="error-summary" role="alert" tabIndex="-1" ref={errorSummary}>
                <h2>Please review the highlighted details.</h2>
                <ul>{Object.entries(errors).filter(([, message]) => message).map(([field, message]) => <li key={field}><a href={`#${field}`}>{message}</a></li>)}</ul>
              </div>
            )}

            <fieldset>
              <legend>About you and your organisation</legend>
              <p className="fieldset-intro">Fields marked “required” are needed to assess and respond to your request.</p>
              <div className="form-grid">
                <Field id="name" label="Name  -  required" error={errors.name}>{(details) => <input {...inputProps('name', details)} autoComplete="name" />}</Field>
                <Field id="email" label="Work email  -  required" hint="Use an address where you are authorised to discuss this enquiry" error={errors.email}>{(details) => <input {...inputProps('email', details)} type="email" autoComplete="email" />}</Field>
                <Field id="company" label="Company  -  required" error={errors.company}>{(details) => <input {...inputProps('company', details)} autoComplete="organization" />}</Field>
                <Field id="website" label="Company website  -  required" hint="For example, example.com" error={errors.website}>{(details) => <input {...inputProps('website', details)} type="url" inputMode="url" autoComplete="url" />}</Field>
                <Field id="role" label="Your role  -  required" error={errors.role}>{(details) => <select {...inputProps('role', details)}><option value="">Select a role</option>{roles.map((role) => <option key={role}>{role}</option>)}</select>}</Field>
                <Field id="industry" label="Industry  -  required" error={errors.industry}>{(details) => <select {...inputProps('industry', details)}><option value="">Select an industry</option>{industries.map((industry) => <option key={industry}>{industry}</option>)}</select>}</Field>
              </div>
            </fieldset>

            <fieldset>
              <legend>Your priorities</legend>
              <div className="form-grid">
                <Field id="markets" label="Primary markets  -  required" hint="Countries, regions or buyer markets most relevant to the brief" error={errors.markets} className="form-field--wide">{(details) => <input {...inputProps('markets', details)} />}</Field>
                <Field id="objective" label="Main objective  -  required" error={errors.objective} className="form-field--wide">{(details) => <select {...inputProps('objective', details)}><option value="">Select an objective</option>{objectives.map((objective) => <option key={objective}>{objective}</option>)}</select>}</Field>
                {approvedBudgets.length > 0 && <Field id="budget" label="Approximate investment" hint="Optional Only approved ranges configured by Menchly are shown" error={errors.budget} className="form-field--wide">{(details) => <select {...inputProps('budget', details)}><option value="">Prefer to discuss privately</option>{approvedBudgets.map((range) => <option key={range}>{range}</option>)}</select>}</Field>}
                <Field id="concern" label="Current concern or optional message" hint="Avoid sensitive, privileged or confidential details at this stage" error={errors.concern} className="form-field--wide">{(details) => <textarea {...inputProps('concern', details)} rows="6" maxLength="2000" />}</Field>
              </div>
            </fieldset>

            <div className="form-honeypot" hidden>
              <label htmlFor="websiteConfirmation">Leave this field empty</label>
              <input id="websiteConfirmation" name="websiteConfirmation" value={values.websiteConfirmation} onChange={update('websiteConfirmation')} tabIndex="-1" autoComplete="off" />
            </div>

            <Field id="privacyConsent" label="Privacy consent  -  required" error={errors.privacyConsent} className="consent-field">
              {(details) => (
                <div className="consent-control">
                  <input id={details.id} name="privacyConsent" type="checkbox" checked={values.privacyConsent} onChange={update('privacyConsent')} onFocus={onStart} aria-describedby={details.describedBy} aria-invalid={details.invalid} />
                  <p>I consent to Menchly processing the information in this request and its attribution context to assess fit and respond I understand this site still requires an approved final privacy notice <Link to="/privacy">Read the current privacy notice.</Link></p>
                </div>
              )}
            </Field>
            <Field id="analyticsConsent" label="Anonymous journey measurement  -  optional" className="consent-field">
              {(details) => (
                <div className="consent-control">
                  <input
                    id={details.id}
                    name="analyticsConsent"
                    type="checkbox"
                    checked={values.analyticsConsent}
                    onChange={updateAnalyticsConsent}
                    onFocus={onStart}
                  />
                  <p>Allow non-identifying first-party journey events to help improve this assessment experience This choice does not affect whether we review your request.</p>
                </div>
              )}
            </Field>

            <div className="form-submit">
              <button className="button button--primary" type="submit" disabled={status === 'loading'}>
                <span>{status === 'loading' ? 'Sending securely…' : 'Request a private review'}</span><span aria-hidden="true">→</span>
              </button>
              <p>Submission does not create an engagement or guarantee availability.</p>
            </div>
            <div className={`form-status ${status === 'error' ? 'form-status--error' : ''}`} role="status" aria-live="polite">
              {statusMessage}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
