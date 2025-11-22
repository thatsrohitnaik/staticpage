import React, { useEffect, useRef, useState, useMemo } from 'react';
import './Letter.css';

const DEFAULT_MESSAGE = `To our dearest friends and family,\n\nWith hearts full of love and excitement, we are thrilled to share that we’re getting married! Please join us as we begin this beautiful new chapter of our lives together. Your presence, blessings, and good wishes will make our day truly complete.`;

export default function Letter({ message = DEFAULT_MESSAGE, typingSpeed = 20 }) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);
  const [isDone, setIsDone] = useState(false);

  // read recipient from URL params (supports ?to=Name or ?recipient=Name or ?name=Name)
  const recipient = useMemo(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('to') || params.get('recipient') || params.get('name') || '';
    } catch {
      return '';
    }
  }, []);

  // compute the final message: replace greeting if recipient provided
  const finalMessage = useMemo(() => {
    const parts = message.split('\n\n');
    const body = parts.length > 1 ? parts.slice(1).join('\n\n') : parts.join('\n\n');
    const greeting = recipient ? `To ${recipient},` : parts[0];
    return `${greeting}\n\n${body}`;
  }, [message, recipient]);

  useEffect(() => {
    // reset when finalMessage changes (defer state updates to avoid synchronous setState in effect)
    indexRef.current = 0;
    const resetTimeout = window.setTimeout(() => {
      setDisplayed('');
      setIsDone(false);
    }, 0);

    // start typing immediately
    let typingIntervalId = null;
    function tick() {
      indexRef.current += 1;
      const next = finalMessage.slice(0, indexRef.current);
      setDisplayed(next);
      if (indexRef.current >= finalMessage.length) {
        setIsDone(true);
        if (typingIntervalId) {
          clearInterval(typingIntervalId);
          typingIntervalId = null;
        }
      }
    }

    typingIntervalId = window.setInterval(tick, typingSpeed);

    return () => {
      if (typingIntervalId) clearInterval(typingIntervalId);
      clearTimeout(resetTimeout);
    };
  }, [finalMessage, typingSpeed]);

  return (
    <div className="letter-wrapper">
      <article className="letter-paper" aria-live="polite">
        <div className="letter-content">
          <p className="letter-paragraph">{displayed}<span className={`caret ${isDone ? 'hidden' : ''}`} aria-hidden>┃</span></p>
        </div>

        <footer className="letter-signature">
          <div>With love,</div>
          <div className="signature-name">Bhakti & Rohit</div>
        </footer>
      </article>
    </div>
  );
}
