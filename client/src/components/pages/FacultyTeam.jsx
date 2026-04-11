import React, { useEffect } from 'react';
import '../../css/faculty-team.css';

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
     {
        name: "Mr. Vetriselvan",
        subject: "Polity",
        initial: "V",
        color: "#0a5a8f"
    },
     {
        name: "Mr. Sharan S",
        subject: "History, Polity",
        initial: "S",
        color: "#1a7ab3"
    },
    {
        name: "Mr. Junaid Ahmed",
        subject: "Polity, IR",
        initial: "J",
        color: "#043053"
    },
    {
        name: "Mr. Kesavamoorthi",
        subject: "Polity, IR",
        initial: "K",
        color: "#0a5a8f"
    },
];


const FacultyTeam = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="faculty-page">
            {/* Hero Section */}
            <section className="faculty-hero">
                <div className="faculty-hero-bg-circle circle-1"></div>
                <div className="faculty-hero-bg-circle circle-2"></div>
                <div className="faculty-hero-content">
                    <p className="faculty-hero-subtitle">Meet Our Esteemed</p>
                    <h1>Our Faculty Team</h1>
                    <div className="faculty-hero-accent"></div>
                    <p className="faculty-hero-desc">
                        Highly skilled UPSC coaching experts dedicated to shaping the next generation of civil servants
                    </p>
                </div>
            </section>

            {/* Faculty Grid */}
            <section className="faculty-section">
                <div className="faculty-container">
                    <div className="faculty-section-header">
                        <h2>Expert Mentors &amp; Educators</h2>
                        <p>Our team of {facultyData.length} experienced faculty members brings decades of combined expertise across all UPSC subjects</p>
                    </div>

                    <div className="faculty-grid">
                        {facultyData.map((faculty, index) => (
                            <div
                                className="faculty-card"
                                key={index}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div
                                    className="faculty-avatar"
                                    style={{
                                        backgroundColor: !faculty.image ? faculty.color : 'transparent',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {faculty.image ? (
                                        <img
                                            src={faculty.image}
                                            alt={faculty.name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    ) : (
                                        <span>{faculty.initial}</span>
                                    )}
                                </div>
                                <div className="faculty-info">
                                    <h3 className="faculty-name">{faculty.name}</h3>
                                    <p className="faculty-subject">{faculty.subject}</p>
                                </div>
                                <div className="faculty-card-accent"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {/* <section className="faculty-cta">
                <div className="faculty-cta-content">
                    <h2>Learn from the Best</h2>
                    <p>Join KingMakers IAS Academy and get mentored by India's finest UPSC coaching experts</p>
                    <a href="/contact-us/" className="faculty-cta-btn">Enquire Now</a>
                </div>
            </section> */}
        </div>
    );
};

export default FacultyTeam;
