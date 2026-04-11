import React from 'react';
import './why-kingmakers.css';

const features = [
    {
        number: '01',
        title: 'Expert Civil Services Faculty',
        icon: 'fa-solid fa-chalkboard-user',
        text: 'Learn from experienced faculty members and mentors for in-depth subject knowledge and exam-focused guidance.',
        tag: 'Expert-led',
        featured: true,
    },
    {
        number: '02',
        title: 'Good Morning Test Program',
        icon: 'fa fa-edit',
        text: 'Start every day with structured preparation to strengthen current affairs knowledge and answer-writing skills.',
        tag: 'Daily practice',
    },
    {
        number: '03',
        title: 'Optimal Batch Size',
        icon: 'fa-solid fa-users-between-lines',
        text: 'Smaller and well-managed batch sizes ensure better interaction with faculty and focused academic guidance.',
        tag: 'Mains-focused',
    },
    {
        number: '04',
        title: 'Intensive Answer Writing Practice',
        icon: 'fa-solid fa-pen-nib',
        text: 'Extensive writing sessions help aspirants master descriptive answers, essay writing, and analytical thinking skills.',
        tag: 'Personal attention',
    },
    {
        number: '05',
        title: 'Personalized Mentorship',
        icon: 'fa-solid fa-user-graduate',
        text: 'Individual Assessment Program (IAP) enables regular evaluation and personalized mentoring.',
        tag: 'Progress tracked',
    },
    {
        number: '06',
        title: 'Proven Success Record',
        icon: 'fa-solid fa-award',
        text: 'A strong history of successful UPSC and TNPSC achievers since 2013.',
        tag: 'Always with you',
        featured: false,
    },
];

const WhyKingmakers = () => {
    return (
        <section className="why-section" id="why">
            <div className="container">

                {/* Header */}
                <div className="why-header">
                    {/* <span className="why-badge">WHY CHOOSE US</span> */}
                    <h2>Why Kingmakers IAS Academy?</h2>
                    <p>
                        Your civil services preparation must start at the right place - here’s why KingMakers IAS Academy is the right choice.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="why-grid">
                    {features.map((f, i) => (
                        <div
                            className={`why-card`}
                            key={i}
                        >
                            <div className="why-card-top">
                                {/* <span className="why-card-num">{f.number}</span> */}
                                {/* <span className="why-card-tag">{f.tag}</span> */}
                            </div>
                            <div className="why-card-icon">
                                <i className={f.icon}></i>
                            </div>
                            <h3>{f.title}</h3>
                            <p>{f.text}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default WhyKingmakers;
