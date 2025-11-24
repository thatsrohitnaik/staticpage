import React from 'react';
import './GooglePhotos.css';
import FormfacadeEmbed from "@formfacade/embed-react";

export default function GooglePhotos({ className = '' }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [embedKey, setEmbedKey] = React.useState(0);

  const handleSubmit = () => {
    // mark as submitted and trigger the auto-refresh timer
    setSubmitted(true);
  };

  // when submitted becomes true, remount the embed after 2 seconds
  React.useEffect(() => {
    if (!submitted) return undefined;
    const timer = setTimeout(() => {
      setEmbedKey((k) => k + 1); // force remount
      setSubmitted(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [submitted]);

  return (
      <>
    <div className={`googlephotos ${className}`}>
      <FormfacadeEmbed
        key={embedKey}
        formFacadeURL={"https://formfacade.com/include/104146597040257106925/form/1FAIpQLScUSyNzxf6EDnIhKYwRyOV-RyG3CEaiGISnHf6BJYr4eu_zBA/classic.js/?div=ff-compose"}
        onSubmitForm={handleSubmit}
      />
    </div>

      <div>
      {submitted && (
        <div className="googlephotos__message" aria-live="polite">
          Submitted — refreshing the form...
        </div>
      )}
    </div>
          </>
  );
}
