import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PopupNewsModal from './PopupNewsModal';
import './header.css';

const HeaderMiddle = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="header-middle">
            <div className="container">
                {/* Logo Section */}
                <div className="header-logo">
                    <Link to="/">
                        <img src="/images/logo/Kingmakers-IAS-Academy-logo.webp" alt="Kingmakers IAS Academy" />
                    </Link>
                </div>

                {/* What's New Section */}
                <div className="header-action">
                    <button 
                        className="whats-new-btn"
                        onClick={() => setIsModalOpen(true)}
                    >
                        What's New
                    </button>
                    <PopupNewsModal 
                        isOpen={isModalOpen} 
                        onClose={() => setIsModalOpen(false)} 
                    />
                </div>

                {/* Branches Section */}
                <div className="header-branches">
                    <div className="branch-item">
                        <div className="branch-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="1.2">
                                {/* Base and Main Floor */}
                                <path d="M5 70 H95 V45 H5 V70 Z" />
                                {/* Central Tower Section */}
                                <path d="M40 45 V25 L50 10 L60 25 V45" />
                                <path d="M40 30 H60" />
                                <path d="M48 20 Q50 15 52 20 V25 H48 V20" />
                                {/* Side Sections (Domes) */}
                                <path d="M10 45 V38 Q15 32 20 38 V45" />
                                <path d="M80 45 V38 Q85 32 90 38 V45" />
                                {/* Arches and Windows */}
                                <path d="M45 60 Q50 54 55 60 M45 65 H55" />
                                <path d="M12 55 Q16 50 20 55 M12 62 H20" />
                                <path d="M28 55 Q32 50 36 55 M28 62 H36" />
                                <path d="M64 55 Q68 50 72 55 M64 62 H72" />
                                <path d="M80 55 Q84 50 88 55 M80 62 H88" />
                                {/* Ground Line */}
                                <path d="M2 72 H98" />
                            </svg>
                        </div>
                        <div className="branch-label">Chennai</div>
                    </div>
                    <div className="branch-divider">|</div>
                    <div className="branch-item">
                        <div className="branch-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 85" fill="none" stroke="currentColor" strokeWidth="1.2">
                                {/* Main Structure */}
                                <path d="M20 75 V25 H80 V75" />
                                <path d="M38 75 V45 Q50 32 62 45 V75" />
                                {/* Top Sections */}
                                <path d="M25 25 V18 H75 V25" />
                                <path d="M30 18 V12 H70 V18" />
                                <path d="M40 12 L50 7 L60 12" />
                                {/* Pillar Details */}
                                <path d="M20 35 H38 M62 35 H80" />
                                <path d="M20 55 H28 M72 55 H80" />
                                <path d="M20 65 H28 M72 65 H80" />
                                {/* Circles/Details */}
                                <circle cx="30" cy="40" r="3" />
                                <circle cx="70" cy="40" r="3" />
                                {/* Ground Line */}
                                <path d="M10 77 H90" />
                            </svg>
                        </div>
                        <div className="branch-label">Delhi</div>
                    </div>
                </div>

                {/* Contact & Social Section */}
                <div className="header-info">
                    <div className="info-wrapper">
                        <div className="info-contact">
                            
                            <div className="contact-item">
                                <i className="fa-solid fa-phone"></i>
                                <a href="tel:+919444227273">+91 94442 27273</a>
                            </div>
                            <div className="contact-item">
                                <i className="fa-solid fa-envelope"></i>
                                <a href="mailto:info@kingmakersiasacademy.com">info@kingmakersiasacademy.com</a>
                            </div>
                        </div>
                        <div className="info-social">
                            <a href="https://www.facebook.com/KingmakersIasAcademy/" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://t.me/kingmakersiasacademy" aria-label="Telegram"><i className="fab fa-telegram-plane"></i></a>
                            <a href="https://www.youtube.com/user/KingmakersIAS" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                            <a href="https://www.instagram.com/kingmakers_ias_academy/" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                            <a href="https://x.com/kingmakersias?s=11" aria-label="X (Twitter)"><i className="fab fa-x-twitter"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderMiddle;
