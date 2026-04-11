import React, { useState, useRef, useEffect } from 'react';
import '../../css/commitment.css';

const mentorData = [
    {
        name: 'Mr. Elango S.',
        designation: 'Managing Director & Mentor',
        image: '/images/faculties/Mr.-Elango-S-212x300.webp',
    },
    {
        name: 'Mr. Bharath',
        designation: 'Academic Dean',
        image: '/images/faculties/Mr.-Bharath-1-212x300.webp',
    },
    {
        name: 'Ms. Madhavi',
        designation: 'Senior General Manager',
        image: '/images/faculties/Ms.-Madhavi-212x300.webp',
    },
    {
        name: 'Mr. Harikrishnan K.',
        designation: 'Academic Coordinator',
        image: '/images/faculties/Mr.-Harikrishnan-K-212x300.webp',
    },
    {
        name: 'Ms. Vijetha Dhinakaran',
        designation: 'Academic Coordinator',
        image: '/images/faculties/Ms.-Vijetha-Dhinakaran-212x300.webp',
    },
    {
        name: 'Mr. Dhinakaran',
        designation: 'Academic Coordinator',
        image: '/images/faculties/IMG_9563-final-image-227x300.jpg',
    },
];

const Commitment = () => {
    const [visibleCards, setVisibleCards] = useState(4);
    const [current, setCurrent] = useState(0);
    const timerRef = useRef(null);
    const total = mentorData.length;

    // Update visible cards based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 480) setVisibleCards(1);
            else if (window.innerWidth <= 768) setVisibleCards(2);
            else if (window.innerWidth <= 1024) setVisibleCards(3);
            else setVisibleCards(4);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, total - Math.floor(visibleCards));

    const goTo = (index) => {
        setCurrent(Math.min(Math.max(index, 0), maxIndex));
    };

    const prev = () => goTo(current - 1);
    const next = () => goTo(current + 1);

    const resetTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrent(c => (c >= maxIndex ? 0 : c + 1));
        }, 3500);
    };

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setCurrent(c => (c >= maxIndex ? 0 : c + 1));
        }, 3500);
        return () => clearInterval(timerRef.current);
    }, [maxIndex]);

    return (
        <section className="commitment-section" id="faculties">
            <div className="container">

                {/* Header */}
                <div className="faculty-header">
                    {/* <span className="faculty-badge">OUR TEAM</span> */}
                    <h2>Our Expert Faculties</h2>
                    {/* <p>
                        "All faculties teach. The greatest inspire." — Our team of visionaries
                        guide every aspirant with expertise, care, and dedication.
                    </p> */}
                </div>

                {/* Carousel */}
                <div className="faculty-carousel-outer">

                    {/* Prev */}
                    <button
                        className="faculty-arrow faculty-arrow--prev"
                        onClick={() => { prev(); resetTimer(); }}
                        disabled={current === 0}
                        aria-label="Previous Faculty"
                    >
                        ‹
                    </button>

                    {/* Viewport */}
                    <div className="faculty-carousel-viewport">
                        <div
                            className="faculty-carousel-track"
                            style={{ transform: `translateX(calc(-${current} * (100% / ${visibleCards})))` }}
                        >
                            {mentorData.map((mentor, index) => (
                                <div className="faculty-slide" key={index} style={{ flex: `0 0 calc(100% / ${visibleCards})` }}>
                                    <div className="faculty-card">
                                        {/* Photo */}
                                        <div className="faculty-img-wrap">
                                            <img
                                                src={mentor.image}
                                                alt={mentor.name}
                                                className="faculty-photo"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="faculty-info">
                                            <h4>{mentor.name}</h4>
                                            <span className="faculty-designation">{mentor.designation}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next */}
                    <button
                        className="faculty-arrow faculty-arrow--next"
                        onClick={() => { next(); resetTimer(); }}
                        disabled={current >= maxIndex}
                        aria-label="Next Faculty"
                    >
                        ›
                    </button>
                </div>

                {/* Dots */}
                <div className="faculty-dots">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            className={`faculty-dot ${i === current ? 'faculty-dot--active' : ''}`}
                            onClick={() => { goTo(i); resetTimer(); }}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Commitment;
