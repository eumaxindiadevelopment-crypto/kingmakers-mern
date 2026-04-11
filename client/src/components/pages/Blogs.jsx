import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EnquiryForm from '../forms/EnquiryForm';
import './blog.css';

const API = 'http://localhost:5000';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API}/api/blogs`);
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="blog-list-page bg-gray-50 min-h-screen">
      {/* Hero Section (Matching About Us Style) */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Our Latest Blogs</h1>
          <p>Mentoring Future Bureaucrats</p>
          <div className="hero-accent"></div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl pb-16 mt-16">

        {loading ? (
          <div className="flex justify-center items-center h-64">
          </div>
        ) : (
          <div className="row g-4 lg:g-5 mt-16 mb-16">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog._id} className="col-lg-4 col-md-6 mb-4 flex">
                  <article className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col w-full h-full border border-gray-100 overflow-hidden transform hover:-translate-y-2">
                    <Link to={`/blogs/${blog.slug}`} className="block relative h-64 overflow-hidden">
                      {blog.image ? (
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1B365D] to-[#2a4d80] flex items-center justify-center">
                          <span className="text-white text-opacity-20 text-6xl">📄</span>
                        </div>
                      )}
                      {/* <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#1B365D] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                        {blog.category || 'Opinion'}
                      </div> */}
                    </Link>

                    <div className="flex flex-col flex-grow" style={{padding:"20px"}}>
                      <div className="text-xs text-gray-500 mb-4 font-medium tracking-wide uppercase" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', color: '#DAA520' }}>
                          <svg style={{ width: '18px', height: '18px', marginRight: '6px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          {new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        {/* <span style={{ display: 'flex', alignItems: 'center' }}>
                          <svg style={{ width: '18px', height: '18px', marginRight: '6px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                          {blog.author}
                        </span> */}
                      </div>

                      <h2 className="text-2xl font-black text-[#1B365D] mb-4 leading-snug group-hover:text-[#DAA520] transition-colors duration-300 blog-title" style={{ fontFamily: 'Figtree, sans-serif' }}>
                        <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                      </h2>
                      
                      <p className="text-gray-600 mb-8 flex-grow line-clamp-3 text-base leading-relaxed">
                        {(() => {
                           const rawText = blog.excerpt || blog.content.replace(/<[^>]+>/g, '');
                           const words = rawText.split(' ').filter(Boolean);
                           return words.length > 15 ? words.slice(0, 15).join(' ') + '...' : rawText;
                        })()}
                      </p>

                      <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                        <Link 
                          to={`/blogs/${blog.slug}`} 
                          className="font-bold text-[#1B365D] group-hover:text-[#DAA520] transition-colors text-sm uppercase tracking-widest"
                          style={{ display: 'inline-flex', alignItems: 'center' }}
                        >
                          Read More 
                          <svg style={{ width: '20px', height: '20px', marginLeft: '8px' }} className="transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 text-gray-500">
                No articles published yet. Check back soon!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
