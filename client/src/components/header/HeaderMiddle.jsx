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
                    <Link to="/best-ias-coaching-centre-in-chennai-sri-sai-tower/" className="branch-item" style={{ textDecoration: 'none' }}>
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
                    </Link>
                    <div className="branch-divider">|</div>
                    <Link to="/best-ias-coaching-centre-in-delhi/" className="branch-item" style={{ textDecoration: 'none' }}>
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
                    </Link>
                     <div className="branch-divider">|</div>
                    <Link to="/best-ias-coaching-centre-in-trichy/" className="branch-item" style={{ textDecoration: 'none' }}>
                        <div className="branch-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 85" fill="none" stroke="currentColor" strokeWidth="1.2">
                                <title>Trichy Building</title>
                                {/* Trichy Building Silhouette */}
                                <path d="M30 75 V30 H70 V75" /> {/* Main Structure */}
                                <path d="M35 40 H45 M55 40 H65" /> {/* Upper Windows */}
                                <path d="M35 55 H45 M55 55 H65" /> {/* Lower Windows */}
                                <path d="M45 75 V60 H55 V75" /> {/* Door */}
                                <path d="M25 30 H75" /> {/* Roof line */}
                                <path d="M15 77 H85" />
                            </svg>
                        </div>
                        <div className="branch-label">Trichy</div>
                    </Link>

                     <div className="branch-divider">|</div>
                    <Link to="/best-ias-coaching-centre-in-coimbatore/" className="branch-item" style={{ textDecoration: 'none' }}>
                        <div className="branch-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 85" fill="none" stroke="currentColor" strokeWidth="1.2">
                                <title>Clock Tower, Coimbatore</title>
                                {/* Coimbatore Clock Tower Silhouette */}
                                <rect x="42" y="20" width="16" height="55" /> {/* Main Tower */}
                                <circle cx="50" cy="30" r="4" strokeWidth="0.8" /> {/* Clock Face */}
                                <path d="M42 20 L50 10 L58 20 Z" /> {/* Pyramid Roof */}
                                <path d="M42 25 H58" />
                                <rect x="38" y="70" width="24" height="5" /> {/* Base */}
                                <path d="M15 77 H85" />
                            </svg>
                        </div>
                        <div className="branch-label">Coimbatore</div>
                    </Link>

                     <div className="branch-divider">|</div>
                    <Link to="/best-ias-coaching-centre-in-madurai/" className="branch-item" style={{ textDecoration: 'none' }}>
                        <div className="branch-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 85" fill="none" stroke="currentColor" strokeWidth="1.2">
                                {/* Madurai Meenakshi Gopuram Style */}
                                <path d="M30 75 H70 V65 H30 Z" />
                                <path d="M35 65 H65 V55 H35 Z" />
                                <path d="M40 55 H60 V45 H40 Z" />
                                <path d="M45 45 H55 V35 H45 Z" />
                                <path d="M48 35 L50 25 L52 35 Z" />
                                <path d="M15 77 H85" />
                            </svg>
                        </div>
                        <div className="branch-label">Madurai</div>
                    </Link>


                     <div className="branch-divider">|</div>
                    <Link to="/best-ias-coaching-centre-in-pondicherry/" className="branch-item" style={{ textDecoration: 'none' }}>
                        <div className="branch-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 85" fill="none" stroke="currentColor" strokeWidth="1.2">
                                <title>Aayi Mandapam, Pondicherry</title>
                                {/* Aayi Mandapam Greco-Roman Monument Silhouette */}
                                <rect x="30" y="70" width="40" height="5" /> {/* Base */}
                                <rect x="32" y="30" width="4" height="40" /> {/* Pillar 1 */}
                                <rect x="42" y="30" width="4" height="40" /> {/* Pillar 2 */}
                                <rect x="54" y="30" width="4" height="40" /> {/* Pillar 3 */}
                                <rect x="64" y="30" width="4" height="40" /> {/* Pillar 4 */}
                                <rect x="30" y="25" width="40" height="5" /> {/* Lintel */}
                                <path d="M30 25 L50 10 L70 25 Z" /> {/* Pediment/Triangle Roof */}
                                <path d="M42 70 Q50 50 58 70" /> {/* Archway detail */}
                                <path d="M15 77 H85" />
                            </svg>
                        </div>
                        <div className="branch-label">Puducherry</div>
                    </Link>

                      {/* <div className="branch-divider">|</div>
                    <div className="branch-item">
                        <div className="branch-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 85" fill="none" stroke="currentColor" strokeWidth="1.2">
                             
                                <path d="M25 75 H75 L70 60 H30 L25 75 Z" />
                                <path d="M30 60 L65 30 L35 30 L30 60 Z" />
                                <path d="M35 30 L50 10 L65 30" />
                                <circle cx="50" cy="10" r="3" />
                                <path d="M10 77 H90" />
                            </svg>
                        </div>
                        <div className="branch-label">Thanjavur</div>
                    </div> */}

                </div>

                {/* Contact & Social Section */}
            </div>
        </div>
    );
};

export default HeaderMiddle;
