import React, { useState, useRef, useEffect } from 'react';
import './testimonials.css';

const mentors = [
    {
        name: 'Shri. D.P.Agrwal, Former UPSC Chairman',
        designation: 'Personality Development Training',
        image: '/images/our-pride-our-mentors/Agrawal.webp',
    },
    {
        name: 'Shri. Chhatar Singh IAS (R)',
        designation: "Personality Development Training, Coach & Mentor",
        image: '/images/our-pride-our-mentors/chhatar-singh-ias.webp',
    },
    {
        name: 'Shri. Vivek Harinarain IAS (R)',
        designation: "Personality Development Training, Coach & Mentor",
        image: '/images/our-pride-our-mentors/Vivek-Harinarain.webp',
    },
    {
        name: 'Shri.B.S.Baswan IAS(R)',
        designation: 'Personality Development Training Coach & Mentor',
        image: '/images/our-pride-our-mentors/baswan-ias.webp',
    },
    {
        name: 'Shri. Sivasailam IAS(R)',
        designation: 'Coach & Mentor, Panelist for Interview Guidance Program',
        image: '/images/our-pride-our-mentors/Sivasailam.webp',
    },
    {
        name: 'Shri.G. Balachandharan IAS(R)',
        designation: "Teaches Ethics, Social Issues and Panelist for Interview Guidance Program",
        image: '/images/our-pride-our-mentors/balachandhran.webp',
    },
    {
        name: 'Smt.B.Bhamathi IAS(R)',
        designation: 'Personality Development Training Coach & Mentor',
        image: '/images/our-pride-our-mentors/bhamathi-ias.webp',
    },
    {
        name: 'Mr.S.S.Jawahar IAS(R)',
        designation: 'Handles Essay Enrichment Program, Current Affairs and panelist for interview guidance program & Mentor',
        image: '/images/our-pride-our-mentors/Jawahar.webp',
    },
    {
        name: 'Shri R. Sekar IRS(R)',
        designation: 'Teaches GST, Public finance, Ethics, Economic Development and Schemes of Government of India; Panelist for Interview Guidance Program & Mentor.',
        image: '/images/our-pride-our-mentors/sekar.webp',
    },
    {
        name: 'Dr.V.Thiruppugazh IAS(R)',
        designation: 'General Studies, Essay, Disaster Management, Personality Development Training Coach & Mentor',
        image: '/images/our-pride-our-mentors/thiruppugazh-ias.webp',
    },
    {
        name: 'Shri.Tamizh Vendhan IAS(R)',
        designation: 'Personality Development Training Coach & Mentor',
        image: '/images/our-pride-our-mentors/tamizh-vendan-ias.webp',
    },
    {
        name: 'Shri.Venkadesh Narayanan IRAS(R)',
        designation: "Teaches Georaphy,CSAT and Essay; Panelist for Interview Guidance Program & Mentor",
        image: '/images/our-pride-our-mentors/venkadesh-narayanan.webp',
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
                                                <div className="pride-card-inner">
                                                    {/* Photo container stays full height */}
                                                    <div className="pride-card-img-3d">
                                                        <img
                                                            src={m.image}
                                                            alt={m.name}
                                                            className="pride-photo-3d"
                                                        />
                                                    </div>

                                                    {/* Unified Info Overlay */}
                                                    <div className="pride-card-overlay">
                                                        <div className="pride-card-footer">
                                                            <h4>{m.name}</h4>
                                                        </div>
                                                        <div className="pride-card-quote">
                                                            <p>{m.designation}</p>
                                                        </div>
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
