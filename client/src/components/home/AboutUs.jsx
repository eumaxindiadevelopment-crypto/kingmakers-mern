import React from 'react';
import { Link } from 'react-router-dom';
import './about.css';

const highlights = [
    { icon: '🏆', label: 'Extensive Syllabus Coverage', desc: 'Structured UPSC syllabus with a result-oriented learning approach.' },
    { icon: '🎓', label: 'Intensive Practice Modules', desc: '10,000+ Prelims MCQs and 3,000+ Mains answer-writing sessions.' },
    { icon: '📚', label: 'Exam-Oriented Daily Practice', desc: 'Structured practice covering current affairs, answer writing, and essay.' },
    { icon: '🤝', label: 'Expert Mentorship & Guidance', desc: 'Guidance from 13 former civil servants with personalized mentoring.' },
];

const AboutUs = () => {
    return (
        <section className="about-section" id="about">
            <div className="container">

                {/* Section Header */}
                {/* Main Grid */}
                <div className="about-grid">

                    {/* Left — Image Panel */}
                    <div className="about-image-panel">
                        <div className="about-image-wrapper">
                            <img
                                src="/images/kingmakers-building.webp"
                                alt="Founder – Kingmakers IAS Academy"
                                className="about-founder-img"
                            />
                            {/* Floating experience badge */}
                            <div className="about-exp-badge">
                                <span className="about-exp-num">13+</span>
                                <span className="about-exp-label">Years of<br />Excellence</span>
                            </div>
                        </div>
                    </div>

                    {/* Right — Content */}
                    <div className="about-content">
                        <h3 className="about-founder-title">
                            Best IAS Coaching Centre in Chennai for UPSC Aspirants
                        </h3>
                        <p className="about-intro">
                            KingMakers IAS Academy is the best IAS coaching in Chennai, offering high-quality UPSC Civil Services preparation with expert mentorship and structured training programs. Established in June 2013, the academy stands out with its unique concept of “IAS training by IAS officers,” This officer-led mentorship model makes it a trusted destination for students searching for the top UPSC coaching institute to achieve success in the Civil Services Examination.
                        </p>

                        {/* Highlights grid */}
                        <div className="about-highlights">
                            {highlights.map((item, i) => (
                                <div className="about-highlight-card" key={i}>
                                    <span className="about-highlight-icon">{item.icon}</span>
                                    <div>
                                        <strong>{item.label}</strong>
                                        {/* <p>{item.desc}</p> */}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Stats row */}
                        <div className="about-stats-row">
                            <div className="about-stat">
                                <span className="about-stat-num">1000+</span>
                                <span className="about-stat-label">Officers</span>
                            </div>
                            <div className="about-stat-divider"></div>
                            <div className="about-stat">
                                <span className="about-stat-num">13+</span>
                                <span className="about-stat-label">Years</span>
                            </div>
                            <div className="about-stat-divider"></div>
                            <div className="about-stat">
                                <span className="about-stat-num">15k+</span>
                                <span className="about-stat-label">Students</span>
                            </div>
                            <div className="about-stat-divider"></div>
                            <div className="about-stat">
                                <span className="about-stat-num">10</span>
                                <span className="about-stat-label">Centres</span>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="home-about-cta">
                            <Link to="/about-us/" className="btn btn-primary">Explore Our Story</Link>
                            <Link to="/upsc-course/" className="about-link-cta">View Courses →</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
