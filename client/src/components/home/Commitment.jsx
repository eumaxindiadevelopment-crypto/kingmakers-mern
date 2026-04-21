import React, { useState, useRef, useEffect } from 'react';
import '../../css/commitment.css';

const facultyData = [
    {
        name: "Mr. Sathyamoorthi",
        subject: "Geography",
        initial: "S",
        color: "#043053",
        image: "/images/faculty/Sathyamoorthi.webp"
    },
    {
        name: "Mr. Arun, IPoS (Ex)",
        subject: "Psychology",
        initial: "A",
        color: "#0a5a8f",
        image: "/images/faculty/Arun.webp"
    },
    {
        name: "Mr. Sadik, M.A.",
        subject: "History",
        initial: "S",
        color: "#0a5a8f",
        image: "/images/faculty/Sadik.webp"
    },
    {
        name: "Mr. Sabarinathan",
        subject: "Public Administration",
        initial: "S",
        color: "#1a7ab3",
        image: "/images/faculty/Sabarinathan.webp"
    },
    {
        name: "Mr. Vivekanandhan",
        subject: "CSAT – English Comprehension",
        initial: "V",
        color: "#043053",
        image: "/images/faculty/Vivekanandhan.webp"
    },
    {
        name: "Mr. Sathiya Paul Deepak S",
        subject: "PSIR",
        initial: "S",
        color: "#043053",
        image: "/images/faculty/Sathiya-Paul-Deepak.webp"
    },
    {
        name: "Ms. Vijetha Dhinakaran",
        subject: "Sociology",
        initial: "V",
        color: "#8B5E3C",
        image: "/images/faculty/Vijetha-Dhinakaran.webp"
    },
    {
        name: "Ms. Madhavi",
        subject: "Mentorship Programme",
        initial: "M",
        color: "#6B4226",
        image: "/images/faculty/Madhavi.webp"
    },
    {
        name: "Ms. Guhapriya",
        subject: "Mentorship Programme",
        initial: "G",
        color: "#8B5E3C",
        image: "/images/faculty/Guhapriya.webp"
    },
    {
        name: "Ms. Adhithya",
        subject: "Environment, Current Affairs",
        initial: "A",
        color: "#0a5a8f",
        image: "/images/faculty/Adhithya.webp"
    },
    {
        name: "Ms. Sathyakalavani",
        subject: "Geography, Current Affairs",
        initial: "S",
        color: "#043053",
        image: "/images/faculty/Sathyakalavani.webp"
    },
    {
        name: "Mr. Prabhakaran R",
        subject: "Tamil Lit Optional, International Relations, Ethics",
        initial: "P",
        color: "#1a7ab3",
        image: "/images/faculty/Prabhakaran.webp"
    },
    {
        name: "Mr. Prabhakaran A",
        subject: "Anthropology Optional, World History, History & Ethics",
        initial: "P",
        color: "#043053",
        image: "/images/faculty/Prabhakaran-two.webp"
    },
    {
        name: "Mr. Adil Baig",
        subject: "Economy, Internal Security, IR, Ethics",
        initial: "A",
        color: "#0a5a8f",
        image: "/images/faculty/Adil-Baig.webp"
    },
    {
        name: "Dr. Vignesh",
        subject: "Geography, Internal Security",
        initial: "V",
        color: "#1a7ab3",
        image: "/images/faculty/Vignesh.webp"
    },
    {
        name: "Mr. Sri Iyappan",
        subject: "CSAT",
        initial: "S",
        color: "#043053",
        image: "/images/faculty/Sri-Iyappan.webp"
    },
    {
        name: "Mr. Balajee K S",
        subject: "Environment, Geography",
        initial: "B",
        color: "#6B4226",
        image: "/images/faculty/Balajee.webp"
    },
    {
        name: "Mr. Prasad",
        subject: "Economy, IR",
        initial: "P",
        color: "#0a5a8f",
        image: "/images/faculty/Prasad.webp"
    },
    {
        name: "Ms. Vahinisri D",
        subject: "Geography, Polity, History & Current Affairs",
        initial: "V",
        color: "#8B5E3C",
        image: "/images/faculty/Vahinisri.webp"
    },
    {
        name: "Mr. Bharath",
        subject: "Agriculture, Geography, Environment",
        initial: "B",
        color: "#1a7ab3",
        image: "/images/faculty/Bharath.webp"
    },
    {
        name: "Mr. Akash K",
        subject: "Economy",
        initial: "A",
        color: "#043053",
        image: "/images/faculty/Akash.webp"
    },
   
    {
        name: "Ms. Priyanka",
        subject: "Economy",
        initial: "P",
        color: "#8B5E3C",
        image: "/images/faculty/Priyanka.webp"
    },
   
    {
        name: "Mr. Aravindhan T",
        subject: "Economy, Geography",
        initial: "A",
        color: "#1a7ab3",
        image: "/images/faculty/Aravindhan.webp"
    },
    {
        name: "Mr. Ramachandran M",
        subject: "INM, TN Development Administration",
        initial: "R",
        color: "#6B4226",
        image: "/images/faculty/Ramachandran.webp"
    },
    {
        name: "Mr. Elango S",
        subject: "History, Tamil Litt.",
        initial: "E",
        color: "#043053",
        image: "/images/faculty/Elango.webp"
    },
    {
        name: "Mr. Muthukumaran M",
        subject: "Science, INM",
        initial: "M",
        color: "#0a5a8f",
        image: "/images/faculty/Muthukumaran.webp"
    },
    //  {
    //     name: "Mr. Vetriselvan",
    //     subject: "Polity",
    //     initial: "V",
    //     color: "#0a5a8f"
    // },
    //  {
    //     name: "Mr. Sharan S",
    //     subject: "History, Polity",
    //     initial: "S",
    //     color: "#1a7ab3"
    // },
    // {
    //     name: "Mr. Junaid Ahmed",
    //     subject: "Polity, IR",
    //     initial: "J",
    //     color: "#043053"
    // },
    // {
    //     name: "Mr. Kesavamoorthi",
    //     subject: "Polity, IR",
    //     initial: "K",
    //     color: "#0a5a8f"
    // },
];

const Commitment = () => {
    const [visibleCards, setVisibleCards] = useState(4);
    const [current, setCurrent] = useState(0);
    const timerRef = useRef(null);
    const total = facultyData.length;

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
                            {facultyData.map((mentor, index) => (
                                <div className="faculty-slide" key={index} style={{ flex: `0 0 calc(100% / ${visibleCards})` }}>
                                    <div className="faculty-card">
                                        {/* Photo or Initial Placeholder */}
                                        <div className="faculty-img-wrap">
                                            {mentor.image ? (
                                                <img
                                                    src={mentor.image}
                                                    alt={mentor.name}
                                                    className="faculty-photo"
                                                />
                                            ) : (
                                                <div 
                                                    className="faculty-photo-placeholder"
                                                    style={{ backgroundColor: mentor.color || '#0a5a8f' }}
                                                >
                                                    {mentor.initial || mentor.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="faculty-info">
                                            <h4>{mentor.name}</h4>
                                            <span className="faculty-designation">{mentor.subject}</span>
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
