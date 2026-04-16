import React, { useState, useRef, useEffect } from 'react';
import './testimonials.css';

const mentors = [
    {
        name: 'Balachandran',
        service: 'IAS Officer',
        rank: 'AIR 5 - UPSC 2021',
        quote: "Kingmakers' commitment to student success is unparalleled. Their personalised approach helped me clear UPSC on the very first attempt.",
        image: '/images/our-pride-our-mentors/balachandhran-ias-e1708407152847.jpg',
    },
    {
        name: 'K.P. Singh',
        service: 'IRS Officer',
        rank: 'AIR 8 - UPSC 2020',
        quote: 'The mentors at Kingmakers provide exactly what an aspirant needs — direction and emotional support throughout the rigorous journey.',
        image: '/images/our-pride-our-mentors/KPSingh_IRS-e1708406971886.png',
    },
    {
        name: 'Sivasailam',
        service: 'IAS Officer',
        rank: 'AIR 7 - UPSC 2019',
        quote: 'The environment here is competitive yet supportive. The Good Morning Tests built my accuracy and discipline like nothing else.',
        image: '/images/our-pride-our-mentors/Sivasailam.png',
    },
    {
        name: 'Tamizhvendan',
        service: 'IRS Officer',
        rank: 'AIR 10 - UPSC 2022',
        quote: "Kingmakers is not just an academy — it's a family. Mr. Elango's personal feedback helped me refine my Mains strategy significantly.",
        image: '/images/our-pride-our-mentors/tamizhvendan-irs-300x300.jpg',
    },
    {
        name: 'Vengadesh Narayan',
        service: 'IRAS Officer',
        rank: 'AIR 1 - UPSC 2018',
        quote: 'The study materials and interview guidance program are top-notch. It truly prepares you for the real pressure of civil services.',
        image: '/images/our-pride-our-mentors/vengadesh-narayan-iras.jpg',
    },
    {
        name: 'Sekar',
        service: 'IRS Officer',
        rank: 'AIR 4 - UPSC 2017',
        quote: "One of the best academies if you're serious about TNPSC or UPSC. The teachers go above and beyond to clarify doubts.",
        image: '/images/our-pride-our-mentors/sekar-irs.jpg',
    },
    {
        name: 'Vivek',
        service: 'IAS Officer',
        rank: 'AIR 2 - UPSC 2021',
        quote: 'The writing practice sessions transformed my Mains answers. Kingmakers shaped not just my knowledge but my expression.',
        image: '/images/our-pride-our-mentors/Vivek_crop1-e1708339568186-258x300.jpg',
    },
    {
        name: 'D.P. Agrawal',
        service: 'IAS Officer',
        rank: 'AIR 3 - UPSC 2015',
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

    const total = mentors.length;
    const maxIndex = total - 1;

    const goTo = (i) => setCurrent((i + total) % total);
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

                        {/* Viewport */}
                        <div className="pride-carousel-viewport">
                            <div className="pride-carousel-track-3d">
                                {mentors.map((m, i) => {
                                    let position = "inactive";
                                    let diff = i - current;

                                    if (diff < -total / 2) diff += total;
                                    else if (diff > total / 2) diff -= total;

                                    if (diff === 0) position = "active";
                                    else if (diff === -1) position = "prev";
                                    else if (diff === 1) position = "next";
                                    else if (diff === -2) position = "prev-2";
                                    else if (diff === 2) position = "next-2";

                                    return (
                                        <div
                                            key={i}
                                            className={`pride-slide-3d ${position}`}
                                            onClick={() => setCurrent(i)}
                                        >
                                            <div className="pride-card-3d">
                                                {/* Quote mark decoration */}
                                                <div className="pride-quote-icon">"</div>

                                                <div className="pride-card-inner">
                                                    {/* Photo */}
                                                    <div className="pride-card-img-3d">
                                                        <img
                                                            src={m.image}
                                                            alt={m.name}
                                                            className="pride-photo-3d"
                                                        />
                                                    </div>

                                                    {/* Quote overlay or text */}
                                                    <div className="pride-card-quote">
                                                        <p>{m.quote}</p>
                                                    </div>

                                                    {/* Orange Footer */}
                                                    <div className="pride-card-footer">
                                                        <h4>{m.name}</h4>
                                                        <span className="pride-card-rank">{m.rank}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="pride-actions-3d">
                        <button
                            className="pride-nav-btn pride-nav-btn--prev"
                            onClick={() => { prev(); resetTimer(); }}
                            aria-label="Previous"
                        >
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>

                        <button
                            className="pride-nav-btn pride-nav-btn--next"
                            onClick={() => { next(); resetTimer(); }}
                            aria-label="Next"
                        >
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>

                    {/* Dots */}
                    {/* <div className="pride-dots-3d">
                        {mentors.map((_, i) => (
                            <button
                                key={i}
                                className={`pride-dot-3d ${i === current ? 'active' : ''}`}
                                onClick={() => { setCurrent(i); resetTimer(); }}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div> */}
                </div>
            </div>

        </section>
    );
};

export default Testimonials;
