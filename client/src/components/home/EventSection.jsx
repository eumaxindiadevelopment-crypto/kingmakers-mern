import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../apiConfig';
import { getMediaUrl } from '../../utils/mediaUtils';
import './events-home.css';

const EventSection = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch(`${API}/api/events`);
                const data = await res.json();
                // Get latest 3 active events
                const active = data.filter(ev => ev.status === 'Published').slice(0, 3);
                setEvents(active);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading || events.length === 0) return null;

    return (
        <section className="events-home-section">
            <div className="container">
                <div className="events-home-header" data-aos="fade-up">
                    <div className="header-text">
                        <span className="section-badge">UPCOMING</span>
                        <h2>Events & Workshops</h2>
                        <p>Join our expert-led sessions and transform your preparation journey.</p>
                    </div>
                    <Link to="/events" className="view-all-btn">Explore All Events →</Link>
                </div>

                <div className="events-home-grid">
                    {events.map((event, index) => (
                        <div 
                            key={event._id} 
                            className="event-home-card" 
                            data-aos="zoom-in" 
                            data-aos-delay={index * 100}
                        >
                            <div className="event-date-badge">
                                <span className="day">{new Date(event.date).getDate()}</span>
                                <span className="month">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                            </div>
                            <div className="event-home-img">
                                <img src={getMediaUrl(event.image)} alt={event.title} />
                                <div className="event-type-label">{event.location || 'Online'}</div>
                            </div>
                            <div className="event-home-content">
                                <h3>{event.title}</h3>
                                <p className="event-desc">{event.description ? event.description.substring(0, 100).replace(/<[^>]+>/g, '') + '...' : ''}</p>
                                <Link to={`/events/${event.slug}`} className="register-now-btn">
                                    Register Now
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventSection;
