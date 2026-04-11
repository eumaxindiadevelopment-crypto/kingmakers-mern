import React from 'react';
import './blog.css';

const blogData = [
    {
        title: 'How to Crack UPSC in First Attempt',
        desc: 'Success tips from toppers on how to optimize your first attempt with the right strategy, mindset, and resources.',
        image: '/images/blogs/How-To-Crack-Upsc-Exam-In-First-Attempt.webp',
        category: 'UPSC Strategy',
        readTime: '6 min read',
        featured: true,
    },
    {
        title: 'Current Affairs for UPSC Preparation',
        desc: 'How to efficiently cover current affairs from newspapers and magazines for the civil service exam.',
        image: '/images/blogs/Current-Affairs-for-UPSC.webp',
        category: 'Current Affairs',
        readTime: '4 min read',
    },
    {
        title: 'Everything about TNPSC Group 4 Exams',
        desc: 'Deep dive into the syllabus, preparation strategy, and eligibility criteria for TNPSC Group 4.',
        image: '/images/blogs/everything-aout-tnpsc-group-4-exams.webp',
        category: 'TNPSC',
        readTime: '5 min read',
    },
];

const BlogSection = () => {
    const [featured, ...rest] = blogData;

    return (
        <section className="blog-section" id="blog">
            <div className="container">

                {/* Header row */}
                <div className="blog-header-row">
                    <div className="blog-header-text">
                        <span className="blog-badge">INSIGHTS & TIPS</span>
                        <h2>Latest from Our Blog</h2>
                        <p>Stay ahead with exam notifications, preparation strategies, and current affairs analysis.</p>
                    </div>
                    <a href="#" className="blog-view-all">View All Posts →</a>
                </div>

                {/* Magazine grid */}
                <div className="blog-magazine">

                    {/* Featured large card */}
                    <div className="blog-card blog-card--featured">
                        <div className="blog-img">
                            <img
                                src={featured.image}
                                alt={featured.title}
                                className="blog-photo"
                            />
                            <div className="blog-img-overlay" />
                        </div>
                        <div className="blog-featured-info">
                            <div className="blog-meta">
                                <span className="blog-category">{featured.category}</span>
                                <span className="blog-readtime">⏱ {featured.readTime}</span>
                            </div>
                            <h3>{featured.title}</h3>
                            <p>{featured.desc}</p>
                            <a href="#" className="blog-read-link">Read Article →</a>
                        </div>
                    </div>

                    {/* Right stacked cards */}
                    <div className="blog-stack">
                        {rest.map((blog, i) => (
                            <div className="blog-card blog-card--small" key={i}>
                                <div className="blog-img">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="blog-photo"
                                    />
                                </div>
                                <div className="blog-info">
                                    <div className="blog-meta">
                                        <span className="blog-category">{blog.category}</span>
                                        <span className="blog-readtime">⏱ {blog.readTime}</span>
                                    </div>
                                    <h3>{blog.title}</h3>
                                    <p>{blog.desc}</p>
                                    <a href="#" className="blog-read-link">Read More →</a>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BlogSection;
