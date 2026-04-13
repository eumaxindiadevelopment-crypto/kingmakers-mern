import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './events.css';

import API from '../../apiConfig';

const EventDetail = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImgIndex, setSelectedImgIndex] = useState(null); // Changed to index

  useEffect(() => {
    fetchEvent();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchEvent = async () => {
    try {
      const apiUrl = API;
      const res = await fetch(`${apiUrl}/api/events/${slug}`);
      if (!res.ok) throw new Error('Event not found');
      const data = await res.json();
      setEvent(data);
    } catch (err) {
      console.error('Error fetching event:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    });
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedImgIndex !== null && event?.gallery) {
      setSelectedImgIndex((selectedImgIndex + 1) % event.gallery.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedImgIndex !== null && event?.gallery) {
      setSelectedImgIndex((selectedImgIndex - 1 + event.gallery.length) % event.gallery.length);
    }
  };

  if (loading) {
    return (
      <div className="event-detail-loading">
        <div className="admin-loading"><div className="admin-spinner"></div></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="events-container" style={{ textAlign: 'center', padding: '10rem 2rem' }}>
        <h2>Event Not Found</h2>
        <p>The event you are looking for might have been moved or removed.</p>
        <Link to="/events" className="event-read-more-btn" style={{ display: 'inline-block', marginTop: '2rem' }}>
          Back to All Events
        </Link>
      </div>
    );
  }

  return (
    <div className="event-detail-page-new">
      {/* Lightbox Modal / Carousel */}
      {selectedImgIndex !== null && (event.gallery || selectedImgIndex === -1) && (
        <div className="wp-lightbox-overlay" onClick={() => setSelectedImgIndex(null)}>
          <button className="wp-lightbox-close" onClick={() => setSelectedImgIndex(null)}>×</button>
          
          {event.gallery && event.gallery.length > 0 && (
            <>
              <button className="wp-carousel-nav prev" onClick={prevImage}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              
              <button className="wp-carousel-nav next" onClick={nextImage}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </>
          )}
          
          <div className="wp-lightbox-content">
            <img 
              src={selectedImgIndex === -1 ? event.image : event.gallery[selectedImgIndex]} 
              className="wp-lightbox-img" 
              alt="Enlarged" 
              onClick={(e) => e.stopPropagation()} 
            />
            {selectedImgIndex !== -1 && event.gallery && (
              <div className="wp-carousel-counter">
                {selectedImgIndex + 1} / {event.gallery.length}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section - Updated to Hall of Fame style */}
      <section className="events-hero detail-hero">
        <div className="events-hero-content-new">
          <div className="event-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/events">Events</Link> / <span>{event.title}</span>
          </div>
          <h1>{event.title}</h1>
          <div className="hero-underline"></div>
          <div className="event-meta-hero">
            <span><i className="fa-solid fa-location-dot"></i> {event.location || 'Chennai'}</span>
            <span className="meta-divider">|</span>
            <span><i className="fa-solid fa-calendar-days"></i> {formatDate(event.date)}</span>
          </div>
        </div>
      </section>


      <div className="event-detail-container-new">
        <div className="event-content-layout">
          <div className="event-main-content">
            {event.image && (
              <div className="event-featured-image">
                <img src={event.image} alt={event.title} onClick={() => setSelectedImgIndex(-1)} />
              </div>
            )}
            <div className="event-full-description" dangerouslySetInnerHTML={{ __html: event.description }} />
            
            {event.gallery && event.gallery.length > 0 && (
              <div className="event-gallery-section-new">
                <h2 className="section-title-premium">Event Highlights <span>Gallery</span></h2>
                <div className="event-gallery-grid-new">
                  {event.gallery.map((url, idx) => (
                    <div key={idx} className="premium-gallery-item" onClick={() => setSelectedImgIndex(idx)}>
                      <img src={url} alt={`Gallery ${idx + 1}`} />
                      <div className="gallery-item-hover">
                        <i className="fa-solid fa-plus"></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Back to events */}
          <div className="event-detail-sidebar">
             <div className="sidebar-sticky-box">
                <h4>Looking for more?</h4>
                <p>Stay updated with our upcoming sessions and seminars.</p>
                <Link to="/events" className="event-read-more-btn full-width">
                  View All Events
                </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
