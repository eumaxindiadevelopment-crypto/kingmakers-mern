import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './events.css';

import API from '../../apiConfig';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const apiUrl = API;
      const res = await fetch(`${apiUrl}/api/events`);
      const data = await res.json();
      // Only show published events
      setEvents(data.filter(ev => ev.status === 'Published'));
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return {
      day: d.getDate(),
      month: d.toLocaleString('default', { month: 'short' }),
      year: d.getFullYear(),
      full: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    };
  };

  if (loading) {
    return (
      <div className="events-container">
        <div className="admin-loading"><div className="admin-spinner"></div></div>
      </div>
    );
  }

  return (
    <div className="events-page">
      <section className="events-hero">
        <div className="events-hero-content-new">
          <h1>Events & Workshops</h1>
          <p>Inspiring Stories & Knowledge Sharing Sessions</p>
          <div className="hero-underline"></div>
        </div>
      </section>

      <div className="events-container">

        <div className="events-grid">
          {events.length > 0 ? (
            events.map((event) => {
              return (
                <article key={event._id} className="event-card-new">
                  <div className="event-card-inner">
                    <img 
                      src={event.image || 'https://via.placeholder.com/600x400?text=Kingmakers+IAS+Event'} 
                      alt={event.title} 
                      className="event-bg-img"
                    />
                    <div className="event-overlay-bar">
                      <h3 className="event-title-new">{event.title}</h3>
                      <Link to={`/events/${event.slug}`} className="event-read-more-btn">
                        Read More
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="no-events-block" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem' }}>
              <h3>No upcoming events at the moment.</h3>
              <p>Please check back later for updates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
