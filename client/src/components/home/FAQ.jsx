import React, { useState } from 'react';
import './faq.css';

const faqData = [
    {
        question: 'Which is the best IAS coaching institute in Chennai?',
        answer: 'KingMakers IAS Academy is widely recognized as one of the best IAS coaching institutes in Chennai for aspirants preparing for the UPSC Civil Services Examination, offering structured courses, expert faculty guidance, and mentorship from experienced civil servants.',
        icon: '🕐',
    },
    {
        question: 'What courses are offered for UPSC preparation?',
        answer: 'The academy offers foundation programs, integrated Prelims and Mains coaching, UPSC test series, essay writing programs, and interview guidance courses designed for comprehensive civil services preparation.',
        icon: '📝',
    },
    {
        question: 'How does the academy support answer-writing practice?',
        answer: 'Students receive regular Mains answer-writing sessions, descriptive practice tests, and feedback from faculty members to improve analytical writing skills required for the UPSC Mains examination.',
        icon: '🖥️',
    },
    {
        question: 'Is mentorship provided for UPSC interview preparation?',
        answer: 'Yes. The academy provides interview guidance programs, personality development sessions, and mock interviews conducted by experienced mentors and civil service experts.',
        icon: '👥',
    },
    {
        question: 'Are test series available for UPSC Prelims preparation?',
        answer: 'Yes. Aspirants receive extensive Prelims MCQ practice through structured test series covering the entire UPSC syllabus and current affairs topics.',
        icon: '🎤',
    },
    // {
    //     question: 'Do beginners need a foundation course for UPSC?',
    //     answer: 'Foundation courses help beginners build a strong conceptual understanding of subjects like polity, economics, geography, and history before advancing to full UPSC preparation.',
    //     icon: '📚',
    // },
    // {
    //     question: 'Do you provide coaching for both UPSC and TNPSC?',
    //     answer: 'Yes, KingMakers IAS Academy provides structured coaching programs for both the UPSC Civil Services Examination and the Tamil Nadu Public Service Commission Examination. Both powered by expert faculty guidance, current affairs preparation, and comprehensive test practice.',
    //     icon: '🎤',
    // },
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

    return (
        <section className="faq-section" id="faq">
            <div className="container">

                {/* Header */}
                <div className="faq-header">
                    {/* <span className="faq-badge">FAQ</span> */}
                    <h2>Frequently Asked Questions</h2>
                    {/* <p>Everything you need to know about civil service preparation at Kingmakers.</p> */}
                </div>

                {/* Two-column layout */}
                <div className="faq-layout">

                    {/* Left — Accordion */}
                    <div className="faq-accordion">
                        {faqData.map((faq, i) => (
                            <div
                                className={`faq-item ${activeIndex === i ? 'faq-item--active' : ''}`}
                                key={i}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => toggle(i)}
                                    aria-expanded={activeIndex === i}
                                >
                                    <div className="faq-q-left">
                                        {/* <span className="faq-icon">{faq.icon}</span> */}
                                        <span>{faq.question}</span>
                                    </div>
                                    <span className={`faq-chevron ${activeIndex === i ? 'faq-chevron--open' : ''}`}>
                                        ›
                                    </span>
                                </button>
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right — Contact card + image */}
                    <div className="faq-aside">

                        {/* Image */}
                        <div className="faq-img-wrap">
                            <img
                                src="/images/blogs/Current-Affairs-for-UPSC.webp"
                                alt="Current Affairs for UPSC Preparation"
                                className="faq-img"
                            />
                            <div className="faq-img-overlay">
                                <span>1000+ Officers Placed</span>
                            </div>
                        </div>

                        {/* Contact card */}
                        <div className="faq-contact-card">
                            <div className="faq-contact-icon">💬</div>
                            <h3>Still have questions?</h3>
                            <p>
                                Our expert counsellors are here to guide you — no obligation, just honest advice.
                            </p>
                            <a href="#contact" className="btn-primary faq-contact-btn">
                                Talk to a Counsellor
                            </a>
                            {/* <div className="faq-contact-meta">
                                <span>📞 Available Mon – Sat, 9am – 7pm</span>
                            </div> */}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
