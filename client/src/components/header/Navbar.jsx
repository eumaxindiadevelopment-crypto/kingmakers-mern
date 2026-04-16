import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isUpscOpen, setIsUpscOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsAboutOpen(false);
        setIsUpscOpen(false);
    };

    return (
        <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
            <div className="container">
                <div className="navbar-logo">
                    <Link to="/" onClick={closeMenu}>
                        <img
                            src="/images/logo/Kingmakers-IAS-Academy-logo.webp"
                            alt="Kingmakers IAS Academy"
                        />
                    </Link>
                </div>

                <button className={`navbar-hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle Navigation">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={closeMenu}>Home</Link>
                    <div className={`nav-dropdown ${isAboutOpen ? 'mobile-open' : ''}`}>
                        <span className="nav-dropdown-toggle" onClick={() => setIsAboutOpen(!isAboutOpen)}>
                            About Us <span className="nav-dropdown-arrow">&#9660;</span>
                        </span>
                        <div className="nav-dropdown-menu">
                            <Link to="/about-us/" onClick={closeMenu}>About Us</Link>
                            <Link to="/faculty-team/" onClick={closeMenu}>Faculty Team</Link>
                            <Link to="/our-philanthropy/" onClick={closeMenu}>Our Philanthropy</Link>
                        </div>
                    </div>
                    <div className={`nav-dropdown ${isUpscOpen ? 'mobile-open' : ''}`}>
                        <span className="nav-dropdown-toggle" onClick={() => setIsUpscOpen(!isUpscOpen)}>
                            UPSC <span className="nav-dropdown-arrow">&#9660;</span>
                        </span>
                        <div className="nav-dropdown-menu">
                            <Link to="/upsc/" onClick={closeMenu}>UPSC Courses</Link>
                            <Link to="/about-upsc/" onClick={closeMenu}>About UPSC</Link>
                        </div>
                    </div>
                    <Link to="/tnpsc/" onClick={closeMenu}>TNPSC</Link>
                    {/* <a href="/#courses" onClick={closeMenu}>Courses</a> */}
                    <Link to="/achievers/" onClick={closeMenu}>Achievers</Link>
                    <Link to="/blogs/" onClick={closeMenu}>Blog</Link>
                    <Link to="/events/" onClick={closeMenu}>Events</Link>
                    <Link to="/banking/" onClick={closeMenu}>Banking</Link>
                    <Link to="/learning-circle/" onClick={closeMenu}>Learning Circle</Link>
                    <Link to="/faq/" onClick={closeMenu}>FAQ</Link>
                    <Link to="/contact-us/" onClick={closeMenu}>Contact Us</Link>
                </div>

                <div className={`navbar-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
            </div>
        </nav>
    );
};

export default Navbar;
