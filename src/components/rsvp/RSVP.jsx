import React, { useEffect, useState } from 'react';
import './RSVP.css';

const STORAGE_KEY = 'rsvp_responses_v1';

function isEmail(val) {
  return /\S+@\S+\.\S+/.test(val);
}

export default function RSVP({ title = 'RSVP', showResponses = false }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState('yes');
  const [guests, setGuests] = useState(0);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [responses, setResponses] = useState([]);

  // prefill name from URL params if present (?to=Name or ?name=Name)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const p = params.get('to') || params.get('name') || '';
      if (p) setName(p);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setResponses(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  function saveResponse(resp) {
    try {
      const next = [resp, ...responses];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setResponses(next);
    } catch {
      console.error('Failed to save RSVP');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setSuccess({ ok: false, msg: 'Please enter your name.' });
      return;
    }
    if (email && !isEmail(email)) {
      setSuccess({ ok: false, msg: 'Please enter a valid email address.' });
      return;
    }
    if (attending === 'yes' && (isNaN(guests) || guests < 0)) {
      setSuccess({ ok: false, msg: 'Please enter a valid number of guests.' });
      return;
    }

    setSubmitting(true);
    // emulate async save (could be replaced with a network request)
    const resp = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      attending,
      guests: Number(guests) || 0,
      message: message.trim(),
      ts: new Date().toISOString(),
    };

    try {
      saveResponse(resp);
      setSuccess({ ok: true, msg: 'Thanks! Your RSVP has been recorded.' });
      // clear form except name/email for convenience
      setMessage('');
      setAttending('yes');
      setGuests(0);
    } catch {
      setSuccess({ ok: false, msg: 'Failed to save. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="rsvp" aria-labelledby="rsvp-title">
      <div className="rsvp-card">
        <header className="rsvp-header">
          <h3 id="rsvp-title" className="rsvp-title">{title}</h3>
        </header>

        <form className="rsvp-form" onSubmit={handleSubmit}>
          <label className="rsvp-field">
            <span className="rsvp-label">Name</span>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" required />
          </label>

          <label className="rsvp-field">
            <span className="rsvp-label">Email (optional)</span>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </label>

          <fieldset className="rsvp-field rsvp-fieldset">
            <legend className="rsvp-label">Will you attend?</legend>
            <label><input type="radio" name="attend" value="yes" checked={attending === 'yes'} onChange={() => setAttending('yes')} /> Yes</label>
            <label><input type="radio" name="attend" value="no" checked={attending === 'no'} onChange={() => setAttending('no')} /> No</label>
            <label><input type="radio" name="attend" value="maybe" checked={attending === 'maybe'} onChange={() => setAttending('maybe')} /> Maybe</label>
          </fieldset>

          <label className="rsvp-field">
            <span className="rsvp-label">Number of additional guests</span>
            <input type="number" min="0" value={guests} onChange={e => setGuests(e.target.value)} />
          </label>

          <label className="rsvp-field">
            <span className="rsvp-label">Message (optional)</span>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} placeholder="Any dietary needs or notes" />
          </label>

          <div className="rsvp-actions">
            <button type="submit" className="rsvp-button" disabled={submitting}>{submitting ? 'Saving…' : 'Send RSVP'}</button>
          </div>

          {success && (
            <div className={`rsvp-feedback ${success.ok ? 'ok' : 'err'}`}>{success.msg}</div>
          )}
        </form>

        {showResponses && responses.length > 0 && (
          <div className="rsvp-responses">
            <h4>Recent responses</h4>
            <ul>
              {responses.map(r => (
                <li key={r.id}><strong>{r.name}</strong> — {r.attending} — {r.guests} guests</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

