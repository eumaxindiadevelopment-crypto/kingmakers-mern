import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../apiConfig';
import { getMediaUrl } from '../../utils/mediaUtils';
import './blog.css';

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch(`${API}/api/blogs`);
                const data = await res.json();
                // Get latest 3 published blogs
                const latest = data.filter(b => b.isPublished).slice(0, 3);
                setBlogs(latest);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading || blogs.length === 0) return null;

    const [featured, ...rest] = blogs;

    return (
        <section className="blog-section" id="blog">
            <div className="container">
                <div className="blog-header-row" data-aos="fade-up">
                    <div className="blog-header-text">
                        <span className="blog-badge">INSIGHTS & TIPS</span>
                        <h2>Latest from Our Blog</h2>
                        <p>Stay ahead with exam notifications, preparation strategies, and current affairs analysis.</p>
                    </div>
                    <Link to="/blogs" className="blog-view-all">View All Posts →</Link>
                </div>

                <div className="blog-magazine">
                    {/* Featured large card */}
                    <div className="blog-card blog-card--featured" data-aos="fade-right">
                        <div className="blog-img">
                            <img
                                src={getMediaUrl(featured.image)}
                                alt={featured.title}
                                className="blog-photo"
                            />
                            <div className="blog-img-overlay" />
                        </div>
                        <div className="blog-featured-info">
                            <div className="blog-meta">
                                <span className="blog-category">LATEST UPDATE</span>
                                <span className="blog-readtime">⏱ {new Date(featured.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span>
                            </div>
                            <h3>{featured.title}</h3>
                            <p>{featured.excerpt || (featured.content ? featured.content.replace(/<[^>]+>/g, '').substring(0, 120) + '...' : '')}</p>
                            <Link to={`/blogs/${featured.slug}`} className="blog-read-link">Read Article →</Link>
                        </div>
                    </div>

                    {/* Right stacked cards */}
                    <div className="blog-stack">
                        {rest.map((blog, i) => (
                            <div className="blog-card blog-card--small" key={blog._id} data-aos="fade-left" data-aos-delay={i * 100}>
                                <div className="blog-img">
                                    <img
                                        src={getMediaUrl(blog.image)}
                                        alt={blog.title}
                                        className="blog-photo"
                                    />
                                </div>
                                <div className="blog-info">
                                    <div className="blog-meta">
                                        <span className="blog-category">ARTICLE</span>
                                        <span className="blog-readtime">⏱ {new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span>
                                    </div>
                                    <h3>{blog.title}</h3>
                                    <p>{blog.excerpt || (blog.content ? blog.content.replace(/<[^>]+>/g, '').substring(0, 60) + '...' : '')}</p>
                                    <Link to={`/blogs/${blog.slug}`} className="blog-read-link">Read More →</Link>
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
