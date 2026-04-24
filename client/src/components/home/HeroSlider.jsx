import React, { useState, useEffect } from 'react';
import './hero.css';

const SLIDES = [
    { imageUrl: '/images/slider/slider-1.jpeg', title: 'KingMakers IAS Academy' },
    { imageUrl: '/images/slider/slider-2.jpg', title: 'KingMakers IAS Academy' },
    { imageUrl: '/images/slider/slider-3.jpeg', title: 'KingMakers IAS Academy' },
    { imageUrl: '/images/slider/slider-4.jpg', title: 'KingMakers IAS Academy' },
    { imageUrl: '/images/slider/slider-5.jpg', title: 'KingMakers IAS Academy' },
    { imageUrl: '/images/slider/slider-6.jpg', title: 'KingMakers IAS Academy' },
];

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = SLIDES;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));

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
