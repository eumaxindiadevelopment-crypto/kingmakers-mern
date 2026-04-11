import React from 'react';
import './founder.css';



const Founder = () => {
    return (
        <section className="founder-section" id="founder">
            {/* Decorative accent bar */}
            {/* <div className="founder-accent-bar" /> */}

            <div className="container">
                <div className="founder-layout">

                    {/* Left — Photo column */}
                    <div className="founder-photo-col">
                        <div className="founder-photo-wrap">
                            <img
                                src="/images/boominathan-new.webp"
                                alt="Mr. Boominathan – Founder, Kingmakers IAS Academy"
                                className="founder-photo"
                            />
                            {/* Floating name card */}
                            <div className="founder-name-card">
                                <span className="founder-name-card-title">Mr. Boominathan</span>
                                <span className="founder-name-card-sub">Founder, Kingmakers IAS Academy</span>
                            </div>
                        </div>

                        {/* Stats strip below photo */}
                        {/* <div className="founder-stats">
                            {milestones.map((m, i) => (
                                <div className="founder-stat" key={i}>
                                    <span className="founder-stat-num">{m.num}</span>
                                    <span className="founder-stat-label">{m.label}</span>
                                </div>
                            ))}
                        </div> */}
                    </div>

                    {/* Right — Content column */}
                    <div className="founder-content">

                        {/* <span className="founder-badge">MEET THE FOUNDER</span> */}

                        <h2>Our Founder</h2>

                        {/* Pull quote */}
                        <blockquote className="founder-quote">
                            "Civil service is not just a career — it's a calling. My mission is to
                            ensure no deserving aspirant is left behind for lack of
                            the right guidance."
                            <cite>— Mr. Boominathan, M.A., M.Phil., Ph.D.</cite>
                        </blockquote>

                        <p className="founder-para">
                            Mr. Boominathan, founder of KingMakers IAS Academy, is an entrepreneur and mentor committed to guiding civil service aspirants toward impactful careers in public administration. With a background in Economics and doctoral research from the University of Madras, he has over a decade of experience mentoring UPSC aspirants. Driven to empower students across Tamil Nadu and India, he built a structured learning ecosystem that has produced 1000+ civil service officers and 3000+ other government servants.
                        </p>
                        
                        {/* Values list */}
                        {/* <div className="founder-values">
                            <p className="founder-values-title">Core Founding Principles</p>
                            <div className="founder-values-grid">
                                {values.map((v, i) => (
                                    <div className="founder-value-item" key={i}>
                                        <span className="founder-value-icon">{v.icon}</span>
                                        <span>{v.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div> */}

                        <div className="founder-cta">
                            <a href="#about" className="btn-primary">Learn About Us</a>
                            <a href="#contact" className="founder-contact-link">Get in Touch →</a>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Founder;
