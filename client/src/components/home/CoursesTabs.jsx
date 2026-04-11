import React, { useState, useEffect } from 'react';
import './courses.css';

const API = 'http://localhost:5000';

const CoursesTabs = () => {
    const [activeTab, setActiveTab] = useState('UPSC');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API}/api/courses?category=${activeTab}`);
                const data = await res.json();
                // Filter published and sort by order
                const published = Array.isArray(data) 
                    ? data.filter(c => c.status === 'Published' && c.showOnHomePage !== false).sort((a, b) => a.order - b.order)
                    : [];
                setCourses(published);
            } catch (err) {
                console.error('Error fetching home courses:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [activeTab]);

    const tabs = ['UPSC', 'TNPSC'];

    return (
        <section className="home-courses-section" id="courses">
            <div className="container-fluid">
                <div className="row">
                    {/* Header */}
                    <div className="col-md-12">
                        <div className="courses-header">
                            <h2>Courses & Fees</h2>
                        </div>
                    </div>

                    {/* Tab switcher */}
                    <div className="col-md12">
                        <div className="home-courses-tabs">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    className={`courses-tab-btn ${activeTab === tab ? 'courses-tab-btn--active' : ''}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab === 'UPSC' ? '🏛️' : '📋'} {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Cards grid */}
                <div className="row justify-content-center">
                    {loading ? (
                        <div className="col-12 text-center py-5">
                             <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                             </div>
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="col-12 text-center py-5">No courses available in this category.</div>
                    ) : courses.map((course, index) => (
                        <div className="col-lg-3 col-md-6 mb-4 d-flex" key={course._id || index}>
                            <div className={`course-card w-100 ${course.badge === 'Most Popular' ? 'course-card--featured' : ''}`}>
                                {/* Badge */}
                                {course.badge && course.badge !== 'None' && (
                                    <div className="course-popular-badge">{course.badge}</div>
                                )}

                                {/* Top */}
                                <div className="course-card-top">
                                    <h3 className="course-title">{course.title}</h3>
                                    <div className="course-batches-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                                        {course.upcomingBatches && course.upcomingBatches.length > 0 ? (
                                            course.upcomingBatches.map((batch, bidx) => (
                                                <div key={bidx} className="home-batch-date">
                                                    {batch.startDate}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="home-batch-date">{course.startDate || 'TBA'}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="course-divider" />

                                {/* Features */}
                                <ul className="course-features">
                                    {course.features && course.features.map((feature, idx) => (
                                        <li key={idx}>
                                            <span className="course-check">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Fees */}
                                <div className="course-fees-block">
                                    <span className="course-fees-label">Total Fees</span>
                                    <div className="course-fees-wrap">
                                        <span className="course-fees">₹{course.fees?.toLocaleString('en-IN')}</span>
                                        <span className="course-fees-gst">({course.isGstIncluded ? 'inclusive of GST' : '+ GST'})</span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <a 
                                    href={course.buttonLink || '#contact'} 
                                    className={`course-enroll-btn ${course.badge === 'Most Popular' ? 'course-enroll-btn--light' : ''}`}
                                    style={{ textDecoration: 'none', textAlign: 'center' }}
                                >
                                    {course.buttonText || 'Enroll Now'} →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer note */}
                <div className="row">
                    <div className="col-12">
                        <p className="courses-note">
                            📞 Need help choosing? <a href="#contact">Talk to our counsellor</a> — free, no obligation.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoursesTabs;