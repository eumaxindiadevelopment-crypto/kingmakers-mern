import React, { useState, useRef, useEffect } from 'react';
import '../../css/achievers.css';

const achieversData = [
    {
        name: 'Ishita Kishore',
        position: 'IAS Officer',
        rank: 'AIR 1 – UPSC 2022',
        image: '/images/our-star-achievers/Ishita-Kishore-IAS-300x300.webp',
    },
    {
        name: 'Ganesh Kumar Baskar',
        position: 'IAS Officer',
        rank: 'AIR 7 – UPSC 2019',
        image: '/images/our-star-achievers/Ganesh-Kumar-Baskar-300x300.webp',
    },
    {
        name: 'M. Prathap',
        position: 'IAS Officer',
        rank: 'AIR 21 – UPSC 2017',
        image: '/images/our-star-achievers/M.-Prathap-IAS-300x300.webp',
    },
    {
        name: 'Aparna Ramesh',
        position: 'IAS Officer',
        rank: 'AIR 35 – UPSC 2020',
        image: '/images/our-star-achievers/Aparna-Ramesh-IAS-300x300.webp',
    },
    {
        name: 'C.A. Rishab',
        position: 'IAS Officer',
        rank: 'AIR 42 – UPSC 2019',
        image: '/images/our-star-achievers/C.A.-Rishab-300x300.webp',
    },
    {
        name: 'Beno Zephine',
        position: 'IFS Officer',
        rank: 'AIR 343 – UPSC 2014',
        image: '/images/our-star-achievers/N.L.-Beno-Zephine-1-300x300.webp',
    },
];

const Achievers = () => {
    const [visibleCards, setVisibleCards] = useState(4);
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const timerRef = useRef(null);
    const total = achieversData.length;
    
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
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrent(Math.min(Math.max(index, 0), maxIndex));
        setTimeout(() => setIsAnimating(false), 450);
    };

    const prev = () => goTo(current - 1);
    const next = () => goTo(current + 1);

    // Auto-advance
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setCurrent(c => (c >= maxIndex ? 0 : c + 1));
        }, 3200);
        return () => clearInterval(timerRef.current);
    }, [maxIndex]);

    const resetTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrent(c => (c >= maxIndex ? 0 : c + 1));
        }, 3200);
    };

    return (
        <section className="achievers-section" id="achievers">
            <div className="container">

                {/* Header */}
                <div className="achievers-header">
                    {/* <span className="achievers-badge">OUR ALUMNI</span> */}
                    <h2>Our Star Achievers</h2>
                    {/* <p>The achievements of our students speaks about our coaching effectiveness.</p> */}
                </div>

                {/* Carousel wrapper */}
                <div className="achievers-carousel-outer">

                    {/* Prev button */}
                    <button
                        className="carousel-arrow carousel-arrow--prev"
                        onClick={() => { prev(); resetTimer(); }}
                        disabled={current === 0}
                        aria-label="Previous"
                    >
                        ‹
                    </button>

                    {/* Track */}
                    <div className="achievers-carousel-viewport">
                        <div
                            className="achievers-carousel-track"
                            style={{ transform: `translateX(calc(-${current} * (100% / ${visibleCards})))` }}
                        >
                            {achieversData.map((person, index) => (
                                <div className="achiever-card-container" key={index} style={{ flex: `0 0 calc(100% / ${visibleCards})`, padding: '0 5px' }}>
                                    <div className="achiever-card">
                                        {/* Photo area */}
                                        <div className="achiever-img-wrap">
                                            <div className="achiever-img-border">
                                                <img
                                                    src={person.image}
                                                    alt={person.name}
                                                    className="achiever-photo"
                                                />
                                            </div>
                                            
                                            {/* Award Badge Image */}
                                            <div className="achiever-award-badge">
                                                <img src="/images/award-badge.webp" alt="Award Badge" />
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="achiever-info">
                                             <h4>{person.name}</h4>
                                            <span className="achiever-position">{person.position}</span>
                                            <div className="achiever-rank-badge">{person.rank}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next button */}
                    <button
                        className="carousel-arrow carousel-arrow--next"
                        onClick={() => { next(); resetTimer(); }}
                        disabled={current >= maxIndex}
                        aria-label="Next"
                    >
                        ›
                    </button>
                </div>

                {/* Dot indicators */}
                <div className="achievers-dots">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            className={`achievers-dot ${i === current ? 'achievers-dot--active' : ''}`}
                            onClick={() => { goTo(i); resetTimer(); }}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                {/* View More Button */}
                <div className="achievers-footer">
                    <a href="/achievers/" className="btn-primary achievers-more-btn">
                        View All Achievers
                        <i className="fa-solid fa-arrow-right"></i>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default Achievers;
