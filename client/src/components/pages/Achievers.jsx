import React, { useState, useEffect } from 'react';
import { upscAchieversByYear, tnpscAchieversByYear, starAchievers } from '../../data/achieversData';
import '../../css/achievers-page.css';

const EXAM_TABS = [
    { key: 'upsc', label: 'UPSC' },
    { key: 'tnpsc', label: 'TNPSC' },
];

const Achievers = () => {
    const [activeExam, setActiveExam] = useState('upsc');
    const [activeYear, setActiveYear] = useState(null);
    const [filteredAchievers, setFilteredAchievers] = useState([]);

    const dataSource = activeExam === 'upsc' ? upscAchieversByYear : tnpscAchieversByYear;
    const availableYears = dataSource.map(item => item.year);

    // When exam tab changes, reset to the first available year
    useEffect(() => {
        const firstYear = dataSource[0]?.year || null;
        setActiveYear(firstYear);
    }, [activeExam]);

    // When year changes, update filtered achievers
    useEffect(() => {
        if (!activeYear) return;
        const yearData = dataSource.find(item => item.year === activeYear);
        setFilteredAchievers(yearData ? yearData.toppers : []);
    }, [activeYear, dataSource]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="achievers-page">
            {/* Hero Section */}
            <section className="achievers-hero">
                <div className="achievers-hero-content">
                    <h1>Our Hall of Fame</h1>
                    <p>Celebrating Our Success Stories</p>
                    <div className="hero-accent"></div>
                </div>
            </section>

            <div className="achievers-container">
                {/* ── Controls Bar: Exam Tabs (left) + Year Filter (right) ── */}
                <div className="achievers-controls-bar">
                    {/* Left: Exam Tabs */}
                    <div className="exam-tabs">
                        {EXAM_TABS.map(tab => (
                            <button
                                key={tab.key}
                                className={`exam-tab ${activeExam === tab.key ? 'active' : ''}`}
                                onClick={() => setActiveExam(tab.key)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Right: Year Filter Dropdown */}
                    <div className="year-filter-wrap">
                        <label className="year-filter-label" htmlFor="year-select">Filter by Year</label>
                        <select
                            id="year-select"
                            className="year-filter-select"
                            value={activeYear || ''}
                            onChange={(e) => setActiveYear(e.target.value)}
                        >
                            {availableYears.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Section Header */}
                <div className="year-section">
                    <div className="year-title">
                        <h2>
                            {activeExam === 'upsc' ? 'UPSC' : 'TNPSC'} {activeYear} Achievers
                        </h2>
                        <span className="ta-count">{filteredAchievers.length} Toppers</span>
                    </div>

                    {/* Toppers Grid */}
                    <div className="results-grid">
                        {filteredAchievers.length > 0 ? (
                            filteredAchievers.map((topper, index) => (
                                <div
                                    className={`result-card ${topper.photo ? 'has-photo' : ''}`}
                                    key={index}
                                    style={{ animationDelay: `${index * 0.04}s` }}
                                >
                                    {topper.photo && (
                                        <div className="result-photo">
                                            <img src={topper.photo} alt={topper.name} className="topper-img" />
                                            <img src="/images/award-badge.webp" alt="Award Badge" className="award-badge" />
                                        </div>
                                    )}
                                    <div className="result-info">
                                        <h3>{topper.name}</h3>
                                        {topper.position && <p>{topper.position}</p>}
                                    </div>
                                    <div className="result-rank">
                                        {topper.rank}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-results">
                                <p>No results found for this year.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Achievers;
