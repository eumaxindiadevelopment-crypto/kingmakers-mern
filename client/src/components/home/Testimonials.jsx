import React, { useState, useRef, useEffect } from 'react';
import './testimonials.css';

const mentors = [
    {
        name: 'Balachandran',
        service: 'IAS',
        serviceColor: 'ias',
        quote: 'Kingmakers\' commitment to student success is unparalleled. Their personalised approach helped me clear UPSC on the very first attempt.',
        image: '/images/our-pride-our-mentors/balachandhran-ias-e1708407152847.jpg',
    },
    {
        name: 'K.P. Singh',
        service: 'IRS',
        serviceColor: 'irs',
        quote: 'The mentors at Kingmakers provide exactly what an aspirant needs — direction and emotional support throughout the rigorous journey.',
        image: '/images/our-pride-our-mentors/KPSingh_IRS-e1708406971886.png',
    },
    {
        name: 'Sivasailam',
        service: 'IAS',
        serviceColor: 'ias',
        quote: 'The environment here is competitive yet supportive. The Good Morning Tests built my accuracy and discipline like nothing else.',
        image: '/images/our-pride-our-mentors/Sivasailam.png',
    },
    {
        name: 'Tamizhvendan',
        service: 'IRS',
        serviceColor: 'irs',
        quote: 'Kingmakers is not just an academy — it\'s a family. Mr. Elango\'s personal feedback helped me refine my Mains strategy significantly.',
        image: '/images/our-pride-our-mentors/tamizhvendan-irs-300x300.jpg',
    },
    {
        name: 'Vengadesh Narayan',
        service: 'IRAS',
        serviceColor: 'iras',
        quote: 'The study materials and interview guidance program are top-notch. It truly prepares you for the real pressure of civil services.',
        image: '/images/our-pride-our-mentors/vengadesh-narayan-iras.jpg',
    },
    {
        name: 'Sekar',
        service: 'IRS',
        serviceColor: 'irs',
        quote: 'One of the best academies if you\'re serious about TNPSC or UPSC. The teachers go above and beyond to clarify doubts.',
        image: '/images/our-pride-our-mentors/sekar-irs.jpg',
    },
    {
        name: 'Vivek',
        service: 'IAS',
        serviceColor: 'ias',
        quote: 'The writing practice sessions transformed my Mains answers. Kingmakers shaped not just my knowledge but my expression.',
        image: '/images/our-pride-our-mentors/Vivek_crop1-e1708339568186-258x300.jpg',
    },
    {
        name: 'D.P. Agrawal',
        service: 'IAS',
        serviceColor: 'ias',
        quote: 'A well-structured academy with exceptional faculty. The focus on both Prelims and Mains is perfectly balanced across all programs.',
        image: '/images/our-pride-our-mentors/dp-agrawal.jpg',
    },
];

const Testimonials = () => {
    const [visibleCards, setVisibleCards] = useState(4);
    const [current, setCurrent] = useState(0);
    const timerRef = useRef(null);

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

    const maxIndex = Math.max(0, mentors.length - Math.floor(visibleCards));

    const goTo = (i) => setCurrent(Math.min(Math.max(i, 0), maxIndex));
    const prev = () => goTo(current - 1);
    const next = () => goTo(current + 1);

    const resetTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrent(c => (c >= maxIndex ? 0 : c + 1));
        }, 3800);
    };

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setCurrent(c => (c >= maxIndex ? 0 : c + 1));
        }, 3800);
        return () => clearInterval(timerRef.current);
    }, [maxIndex]);

    return (
        <section className="pride-section" id="our-pride">

            {/* Dark header band */}
            <div className="pride-header-band">
                <div className="container">
                    {/* <span className="pride-badge">OUR PRIDE</span> */}
                    <h2>Our Pride. Our Mentors.</h2>
                    {/* <p>
                        Officers who walked this journey, and now inspire the next generation.
                        Their success is the foundation of Kingmakers' legacy.
                    </p> */}

                    {/* Stats strip */}
                    {/* <div className="pride-stats">
                        <div className="pride-stat">
                            <span className="pride-stat-num">1000+</span>
                            <span className="pride-stat-label">Officers Placed</span>
                        </div>
                        <div className="pride-stat-div"></div>
                        <div className="pride-stat">
                            <span className="pride-stat-num">15+</span>
                            <span className="pride-stat-label">Years Legacy</span>
                        </div>
                        <div className="pride-stat-div"></div>
                        <div className="pride-stat">
                            <span className="pride-stat-num">UPSC & TNPSC</span>
                            <span className="pride-stat-label">Top Ranks</span>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Carousel panel */}
            <div className="pride-carousel-section">
                <div className="container">
                    <div className="pride-carousel-outer">

                        {/* Prev */}
                        <button
                            className="pride-arrow pride-arrow--prev"
                            onClick={() => { prev(); resetTimer(); }}
                            disabled={current === 0}
                            aria-label="Previous"
                        >‹</button>

                        {/* Viewport */}
                        <div className="pride-carousel-viewport">
                            <div
                                className="pride-carousel-track"
                                style={{ transform: `translateX(calc(-${current} * (100% / ${visibleCards})))` }}
                            >
                                {mentors.map((m, i) => (
                                    <div className="pride-slide" key={i} style={{ flex: `0 0 calc(100% / ${visibleCards})` }}>
                                        <div className="pride-card">
                                            {/* Service badge */}
                                            <span className="pride-service-badge">
                                                {m.service}
                                            </span>

                                            {/* Photo */}
                                            <div className="pride-card-img">
                                                <img
                                                    src={m.image}
                                                    alt={m.name}
                                                    className="pride-photo"
                                                />
                                            </div>

                                            {/* Name */}
                                            <div className="pride-card-info">
                                                <h4>{m.name}</h4>
                                                <span className="pride-card-service">{m.service} Officer</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Next */}
                        <button
                            className="pride-arrow pride-arrow--next"
                            onClick={() => { next(); resetTimer(); }}
                            disabled={current >= maxIndex}
                            aria-label="Next"
                        >›</button>
                    </div>

                    {/* Dots */}
                    <div className="pride-dots">
                        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                            <button
                                key={i}
                                className={`pride-dot ${i === current ? 'pride-dot--active' : ''}`}
                                onClick={() => { goTo(i); resetTimer(); }}
                                aria-label={`Slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Testimonials;
