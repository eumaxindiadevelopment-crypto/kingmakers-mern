import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer" id="contact">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col">
                        <h4>About Us</h4>
                        <p className="footer-desc">
                            Kingmakers IAS Academy is a premier institution dedicated to training future civil servants.
                            Our mission is to empower aspirants with knowledge and ethics for success in UPSC & TNPSC exams.
                        </p>
                    </div>

                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about-us/">About Us</Link></li>
                            <li><Link to="/faculties/">Faculties</Link></li>
                            <li><Link to="/achievers/">Achievers</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Important Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/upsc-course/">UPSC</Link></li>
                            <li><Link to="/tnpsc-course/">TNPSC</Link></li>
                            <li><Link to="/events/">Events</Link></li>
                            <li><Link to="/blogs/">Blogs</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Contact Information</h4>
                        <div className="footer-contact-info">
                            <div className="footer-contact-item">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>62, 6th Ave, P Block, Anna Nagar, Chennai - 600040</span>
                            </div>
                            <div className="footer-contact-item">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+91 94442 27273</span>
                            </div>
                            <div className="footer-contact-item">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>kingmakersiasacademy@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <div className="footer-copyright">
                            <p> ©{new Date().getFullYear()} Kingmakers IAS Academy. All Rights Reserved.</p>
                        </div>
                        <div className="footer-social">
                            <a href="https://www.facebook.com/KingmakersIasAcademy/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://x.com/kingmakersias?s=11" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                                <i className="fab fa-x-twitter"></i>
                            </a>
                            <a href="https://www.instagram.com/kingmakers_ias_academy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://www.linkedin.com/company/kingmakers-ias-academy/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="https://www.youtube.com/user/KingmakersIAS" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
