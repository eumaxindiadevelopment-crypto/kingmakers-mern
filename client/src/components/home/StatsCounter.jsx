import React, { useState, useEffect, useRef } from 'react';
import '../../css/stats.css';

const StatItem = ({ number, label, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        // Extract numeric part if suffix is included in the string (though we handle suffix separately)
        const end = parseInt(number.replace(/[^0-9]/g, ''));
        if (start === end) return;

        let timer = setInterval(() => {
            start += Math.ceil(end / 40);
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 50);

        return () => clearInterval(timer);
    }, [isVisible, number]);

    return (
        <div className="stat-card" ref={elementRef}>
            <div className="stat-number">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="stat-label">{label}</div>
        </div>
    );
};

const StatsCounter = () => {
    return (
        <section className="stats-section">
            <div className="container">
                <div className="stats-grid">
                    <StatItem number="10000" suffix="+" label="Total Aspirants Enrolled" />
                    <StatItem number="1000" suffix="+" label="Successful Students" />
                    <StatItem number="30" suffix="+" label="Dedicated Faculties" />
                    <StatItem number="20" suffix="+" label="UPSC Courses" />
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;
