import React from 'react';
import './topbar.css';

const TopBar = () => {
    return (
        <div className="topbar">
            <div className="container">
                <div className="topbar-content">
                    <div className="topbar-left">
                        <div className="topbar-contact">
                            <a href="tel:+919444227273" className="topbar-item">
                                <i className="fa-solid fa-phone"></i>
                                <span>+91 94442 27273</span>
                            </a>
                            <a href="mailto:kingmakersiasacademy@gmail.com" className="topbar-item">
                                <i className="fa-solid fa-envelope"></i>
                                <span>kingmakersiasacademy@gmail.com</span>
                            </a>
                        </div>
                    </div>
                    <div className="topbar-right">
                        <div className="topbar-social">
                            <a href="https://www.facebook.com/KingmakersIasAcademy/" aria-label="Facebook" target='_blank'><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="https://www.instagram.com/kingmakers_ias_academy/" aria-label="Instagram" target='_blank'><i className="fa-brands fa-instagram"></i></a>
                            <a href="https://www.youtube.com/user/KingmakersIAS" aria-label="YouTube" target='_blank'><i className="fa-brands fa-youtube"></i></a>
                            <a href="https://t.me/kingmakersiasacademy" aria-label="Telegram" target='_blank'><i className="fa-brands fa-telegram"></i></a>
                            <a href="https://x.com/kingmakersias?s=11" aria-label="X (Twitter)" target='_blank'><i className="fa-brands fa-x-twitter"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
