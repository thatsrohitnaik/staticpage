import React, { useMemo } from 'react';
import './Letter.css';
import letterBg from '../../assets/images/letter.png';

export default function Letter() {
  // read recipient from URL params (supports ?to=Name or ?recipient=Name or ?name=Name)
  const recipient = useMemo(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('to') || params.get('recipient') || params.get('name') || '';
    } catch {
      return '';
    }
  }, []);

  const salutation = recipient ? `To ${recipient},` : 'To our dearest friends and family,';


  return (
      <div>
          <div className="letter-header">{salutation}</div>
    <div className="letter-wrapper">
      <article
        className="letter-paper"
        style={{
          backgroundImage: `url(${letterBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
      </article>
    </div>
      </div>
  );
}
