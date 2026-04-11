import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import EnquiryForm from '../forms/EnquiryForm';
import './blog.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [toc, setToc] = useState([]);
  const [activeFaq, setActiveFaq] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API}/api/blogs/${slug}`);
        if (!res.ok) throw new Error('Blog not found');
        const data = await res.json();
        setBlog(data);
        
        // Extract TOC from content
        extractTOC(data.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecent = async () => {
      try {
        const res = await fetch(`${API}/api/blogs`);
        const data = await res.json();
        // Filter out current blog and take top 2
        setRecentBlogs(data.filter(b => b.slug !== slug).slice(0, 2));
      } catch (err) {
        console.error("Error fetching recent blogs:", err);
      }
    };

    fetchBlog();
    fetchRecent();
  }, [slug]);

  // Extract headings for Table of Contents
  const extractTOC = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const headings = Array.from(doc.querySelectorAll('h2, h3')).map((h, i) => {
      const id = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      // We don't modify the actual content in the DB, but we add IDs to the rendered content later
      return { 
        id, 
        text: h.textContent,
        level: h.tagName.toLowerCase() 
      };
    });
    setToc(headings);
  };

  // Add IDs to content headings for TOC linking and wrap tables for responsiveness
  const injectHeadingsIds = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Add IDs to headings
    const headings = doc.querySelectorAll('h2, h3');
    headings.forEach(h => {
      const id = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      h.setAttribute('id', id);
    });

    // Make tables responsive by wrapping them
    const tables = doc.querySelectorAll('table');
    tables.forEach(table => {
      // Check if it's already wrapped to avoid double-wrapping
      if (table.parentElement && table.parentElement.classList.contains('table-responsive')) return;
      
      const wrapper = doc.createElement('div');
      wrapper.className = 'table-responsive';
      wrapper.style.overflowX = 'auto';
      wrapper.style.width = '100%';
      wrapper.style.marginBottom = '20px';
      wrapper.style.WebkitOverflowScrolling = 'touch';
      
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
    
    // Make iframes (videos) responsive by wrapping them
    const iframes = doc.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      // Avoid double wrapping
      if (iframe.parentElement && iframe.parentElement.classList.contains('video-container')) return;
      
      const wrapper = doc.createElement('div');
      wrapper.className = 'video-container';
      
      iframe.parentNode.insertBefore(wrapper, iframe);
      wrapper.appendChild(iframe);
    });

    return doc.body.innerHTML;
  };

  // Reading progress logic
  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;
      setReadingProgress(progress);
    };
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const textLength = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
    return Math.ceil(textLength / wordsPerMinute);
  };

  // Handle SEO Metadata natively
  useEffect(() => {
    if (blog) {
      document.title = `${blog.seoTitle || blog.title} - Kingmakers IAS`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", blog.seoDescription || blog.excerpt || blog.title);
      }

      if (blog.seoKeywords) {
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.name = "keywords";
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute("content", blog.seoKeywords);
      }

      // Inject JSON-LD FAQ Schema
      if (blog.faqs && blog.faqs.length > 0) {
        const schemaData = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": blog.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        };

        let scriptTag = document.getElementById('faq-schema');
        if (!scriptTag) {
          scriptTag = document.createElement('script');
          scriptTag.id = 'faq-schema';
          scriptTag.type = 'application/ld+json';
          document.head.appendChild(scriptTag);
        }
        scriptTag.text = JSON.stringify(schemaData);
      } else {
        const scriptTag = document.getElementById('faq-schema');
        if (scriptTag) scriptTag.remove();
      }
    }

    return () => {
      const scriptTag = document.getElementById('faq-schema');
      if (scriptTag) scriptTag.remove();
    };
  }, [blog]);

  const processedContent = React.useMemo(() => {
    if (!blog || !blog.content) return '';
    return injectHeadingsIds(blog.content);
  }, [blog]);

  if (loading) {
    return (
      <div className="pt-32 pb-16 min-h-screen flex justify-center items-center h-[100vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DAA520]"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="pt-32 pb-16 min-h-screen flex flex-col justify-center items-center bg-gray-50 h-[100vh]">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Post not found</h1>
        <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/blogs" className="px-6 py-2 bg-[#1B365D] text-white rounded-md hover:bg-[#122440] transition-colors">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-detail-container bg-gray-50 min-h-screen">
      {/* Reading Progress Bar */}
      <div className="reading-progress-container">
        <div className="reading-progress-bar" style={{ width: `${readingProgress}%` }} />
      </div>

      {/* Hero Header Section (King Layout) */}
      <div className="blog-hero-king">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="breadcrumbs">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blogs" className="hover:text-white transition-colors">Blogs</Link>
          </div>

          <div className="hero-grid-king">
            <div className="fade-up">
              <h1 className="hero-title-king">{blog.title}</h1>
              <div className="hero-image-container">
                {blog.image ? (
                  <img src={blog.image} alt={blog.title} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20 text-6xl">📄</div>
                )}
              </div>
            </div>
            
            <div className="hero-form-card">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="container-fluid mx-auto px-4 max-w-7xl content-wrapper-king">
        <div className="row g-5">
          
          {/* Left Column: Content Card */}
          {/* <div className="col-lg-1 d-none d-lg-block"></div> */}
          <div className="col-lg-9 col-md-12 mb-5 mb-lg-0">
            <div className="main-content-card">
            {/* Metadata Row */}
            <div className="meta-info-row">
              <div className="meta-item">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                <span>{blog.author}</span>
              </div>
              <div className="meta-item">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="meta-item">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>{calculateReadTime(blog.content)} min read</span>
              </div>
            </div>

            {/* Rendered Content */}
            <div 
              className="blog-content-king leading-relaxed"
              dangerouslySetInnerHTML={{ __html: processedContent }} 
            />

            {/* FAQs Section (Accordion) */}
            {blog.faqs && blog.faqs.length > 0 && (
              <section className="mt-20 pt-12 border-t border-gray-100">
                <h2 className="text-3xl font-extrabold text-[#1B365D] mb-10 blog-title">Frequently Asked Questions</h2>
                <div className="faq-accordion">
                  {blog.faqs.map((faq, index) => (
                    <div key={index} className={`faq-accordion-item ${activeFaq === index ? 'active' : ''}`}>
                      <button 
                        className="faq-accordion-header"
                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      >
                        <span className="faq-accordion-question">{faq.question}</span>
                        <span className="faq-accordion-icon">
                          {activeFaq === index ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                          ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                          )}
                        </span>
                      </button>
                      <div className="faq-accordion-content">
                        <div className="faq-accordion-answer">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tags */}
            {(blog.tags && blog.tags.length > 0) && (
              <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
                {blog.tags.map(tag => (
                  <span key={tag} className="px-4 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <aside className="col-lg-3 col-md-12 sidebar-king md-5">
            {/* Table of Contents */}
            {toc.length > 0 && (
              <div className="sidebar-card">
                <h3 className="sidebar-title">Table of Contents</h3>
                <ul className="toc-list">
                  {toc.map((item, index) => (
                    <li key={index} className={item.level === 'h3' ? 'ml-4' : ''}>
                      <a href={`#${item.id}`} className="toc-link" onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(item.id);
                        if (element) {
                          const y = element.getBoundingClientRect().top + window.scrollY - 110;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }}>
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recent Posts */}
            <div className="sidebar-card">
              <h3 className="sidebar-title">Recent Posts</h3>
              <div className="recent-posts-list">
                {recentBlogs.map(post => (
                  <Link to={`/blogs/${post.slug}`} key={post._id} className="recent-post-item group">
                    <div className="recent-thumb">
                      <img src={post.image || '/logo.png'} alt={post.title} />
                    </div>
                    <div className="recent-info">
                      <span className="text-[10px] font-bold text-[#DAA520] uppercase tracking-wider mb-1 block">
                        {post.category || 'Blogs'}
                      </span>
                      <h4 className="group-hover:text-[#DAA520] transition-colors">{post.title}</h4>
                      <div className="recent-date">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
          {/* <div className="col-lg-1 d-none d-lg-block"></div> */}

        </div>
      </main>
    </div>
  );
};

export default BlogDetail;
