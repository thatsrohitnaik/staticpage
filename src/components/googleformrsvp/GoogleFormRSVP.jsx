import React from 'react';
import './GoogleFormRSVP.css';
import FormfacadeEmbed from "@formfacade/embed-react";

export default function GoogleFormRSVP({ className = '' }) {
  return (
    <div className={`googleform-rsvp ${className}`}>
      <div className="googleform-rsvp__embed">
          <FormfacadeEmbed
              formFacadeURL="https://formfacade.com/include/104146597040257106925/form/1FAIpQLScrmj3hJ6Ycdt8tiPKxZ2vz3I0082dMCjiXMcEQsG4xOYo0cw/classic.js/?div=ff-compose"
              onSubmitForm={() => console.log('Form submitted')}
          />
      </div>
    </div>
  );
}

