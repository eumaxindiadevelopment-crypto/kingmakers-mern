import React, { useState, useEffect } from 'react';
import './hero.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Fallback images when DB has no sliders
// const FALLBACK = [
//     { imageUrl: '/images/slider/slider-1.jpeg', title: 'KingMakers IAS Academy' },
//     { imageUrl: '/images/slider/slider-2.jpg',  title: 'KingMakers IAS Academy' },
//     { imageUrl: '/images/slider/slider-3.jpg',  title: 'KingMakers IAS Academy' },
//     { imageUrl: '/images/slider/slider-4.jpeg', title: 'KingMakers IAS Academy' },
//     { imageUrl: '/images/slider/slider-5.jpg',  title: 'KingMakers IAS Academy' },
// ];

const HeroSlider = () => {
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Fetch published sliders from the API; fallback to local images
    useEffect(() => {
        fetch(`${API}/api/sliders?status=published`)
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setSlides(data);
                } else {
                    setSlides(FALLBACK);
                }
            })
            .catch(() => setSlides(FALLBACK));
    }, []);

    useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [slides]);

    const nextSlide = () => setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));

    if (slides.length === 0) return null;

    return (
        <section className="hero-slider">
            <div
                className="hero-slider-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div className="hero-slide" key={slide._id || index}>
                        {slide.link ? (
                            <a href={slide.link} target="_blank" rel="noreferrer">
                                <img src={slide.imageUrl} alt={slide.altText || slide.title} />
                            </a>
                        ) : (
                            <img src={slide.imageUrl} alt={slide.altText || slide.title} />
                        )}
                    </div>
                ))}
            </div>

            <button className="hero-arrow hero-arrow-left" onClick={prevSlide} aria-label="Previous Slide">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button className="hero-arrow hero-arrow-right" onClick={nextSlide} aria-label="Next Slide">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <div className="hero-dots">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`hero-dot ${currentSlide === index ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </section>
    );
};

export default HeroSlider;
