import React from 'react';
import './itenary.css';

const DEFAULT_EVENTS = [
  { time: '06:00 AM', title: 'Ganesh Puja & Shubh Muhurat', location: 'Home / Mandap', details: 'Begin the auspicious day with Lord Ganesha for blessings.' },
  { time: '08:00 AM', title: 'Haldi Ceremony', location: 'Home / Venue Lawn', details: 'Close family application of turmeric for bride & groom.' },
  { time: '10:30 AM', title: 'Baraat Arrival', location: 'Venue Entrance', details: 'Groom procession arrives with music and dance.' },
  { time: '11:00 AM', title: 'Jaimala (Varmala)', location: 'Stage', details: 'Exchange of garlands between the couple.' },
  { time: '11:30 AM', title: 'Kanyadaan', location: 'Mandap', details: 'Bride is given away by her parents.' },
  { time: '12:00 PM', title: 'Saat Phere (Saptapadi)', location: 'Mandap', details: 'Seven sacred rounds around the holy fire.' },
  { time: '01:00 PM', title: 'Sindoor & Mangalsutra', location: 'Mandap', details: 'Final rituals to unite the couple.' },
  { time: '01:30 PM', title: 'Lunch / Bhog', location: 'Dining Area', details: 'Traditional vegetarian meal served to guests.' },
  { time: '05:00 PM', title: 'Reception / Evening Celebrations', location: 'Banquet Hall', details: 'Music, dinner and blessings from guests.' },
];

export default function Itenary({ events = DEFAULT_EVENTS, title = 'Wedding Itinerary', compact = false }) {
  return (
    <section className="itenary" aria-label={title}>
      <div className="itenary-card">
        <header className="itenary-header">
          <h3 className="itenary-title">{title}</h3>
        </header>

        <div className={`itenary-body ${compact ? 'compact' : ''}`}>
          {events.map((ev, idx) => (
            <article key={idx} className="itenary-item">
              <div className="itenary-time">{ev.time}</div>
              <div className="itenary-main">
                <div className="itenary-row">
                  <div className="itenary-event">{ev.title}</div>
                  <div className="itenary-location">{ev.location}</div>
                </div>
                {ev.details && <div className="itenary-details">{ev.details}</div>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

