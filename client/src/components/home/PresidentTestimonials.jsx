import React, { useState } from 'react';
import './president-testimonials.css';

const PresidentTestimonials = () => {
    const [current, setCurrent] = useState(0);

    const data = [
        {
            name: "Shri. RAM NATH KOVIND",
            title: "Hon'ble Former President of India",
            image: "/images/President/shri-ram-nath-kovind.webp",
            quotes: [
                "KingMakers Academy puts a special emphasis on educating students from rural areas and especially from socially and economically weaker sections. This commitment deserves highest appreciation.",
                "You are giving these students not just knowledge but also the confidence to compete with the best. I congratulate KingMakers IAS academy for its noble mission. I am confident that many of the future nation builders of India will emerge from these very halls."
            ]
        },
        {
            name: "Bharath Ratna Shri. PRANAB MUKHERJEE",
            title: "Hon'ble Former President of India",
            image: "/images/President/pranab-mukherjee.webp",
            quotes: [
                "I am happy to know that KingMakers IAS Academy is going to train up and prepare the students boys and girls coming from rural background and lower stratum of society, so that they can equip themselves and acquire the knowledge to compete with those who got better education, those who had better family background and better working environment.",
                "I wish KingMakers IAS Academy all success in their mission and in their objective. I do hope that future administrators of the country will emanate from KingMakers IAS academy and do their job very successfully."
            ]
        }
    ];

    const next = () => setCurrent((current + 1) % data.length);
    const prev = () => setCurrent((current - 1 + data.length) % data.length);

    return (
        <section className="presidential-section">
            <div className="container">
                <div className="presidential-header">
                    <span className="presidential-badge">Statesmanship Endorsements</span>
                    <h2>Voices of India's Statesmanship</h2>
                    <div className="presidential-line"></div>
                </div>

                <div className="presidential-carousel-outer">
                    <div className="presidential-viewport">
                        <div 
                            className="presidential-track" 
                            style={{ transform: `translateX(-${current * 100}%)` }}
                        >
                            {data.map((item, index) => (
                                <div key={index} className="presidential-slide">
                                    <div className="presidential-item">
                                        <div className="presidential-photo-col">
                                            <div className="presidential-photo-wrap">
                                                <img src={item.image} alt={item.name} className="presidential-img" />
                                                <div className="presidential-frame"></div>
                                            </div>
                                        </div>

                                        <div className="presidential-content-col">
                                            <div className="presidential-quote-icon">“</div>
                                            <div className="presidential-quotes">
                                                {item.quotes.map((q, i) => (
                                                    <p key={i} className="presidential-para">{q}</p>
                                                ))}
                                            </div>
                                            <div className="presidential-attribution">
                                                <h4 className="presidential-name">{item.name}</h4>
                                                <p className="presidential-title">{item.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <button className="presidential-nav prev" onClick={prev} aria-label="Previous">
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button className="presidential-nav next" onClick={next} aria-label="Next">
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>

                    {/* Indicators */}
                    <div className="presidential-dots">
                        {data.map((_, i) => (
                            <button 
                                key={i} 
                                className={`presidential-dot ${i === current ? 'active' : ''}`}
                                onClick={() => setCurrent(i)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PresidentTestimonials;
