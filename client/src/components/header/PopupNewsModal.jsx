import React, { useEffect, useState } from 'react';
import './PopupNewsModal.css';

import API from '../../apiConfig';

const PopupNewsModal = ({ isOpen, onClose }) => {
  const [upscNews, setUpscNews] = useState([]);
  const [tnpscNews, setTnpscNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchNews();
    }
  }, [isOpen]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const [upscRes, tnpscRes] = await Promise.all([
        fetch(`${API}/api/popup-news?category=UPSC`),
        fetch(`${API}/api/popup-news?category=TNPSC`)
      ]);
      const upscData = await upscRes.json();
      const tnpscData = await tnpscRes.json();
      
      // Filter for published items and limit if necessary
      setUpscNews(upscData.filter(item => item.status === 'Published'));
      setTnpscNews(tnpscData.filter(item => item.status === 'Published'));
    } catch (err) {
      console.error('Error fetching popup news:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="news-modal-overlay" onClick={onClose}>
      <div className="news-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="news-modal-header">
          <h2><i className="fa-solid fa-bullhorn"></i> What's New</h2>
          <button className="news-modal-close" onClick={onClose}>&times;</button>
        </div>
        
        <div className="news-modal-body">
          {loading ? (
            <div className="news-loading">Loading latest news...</div>
          ) : (
            <div className="news-grid">
              {/* UPSC Section */}
              <div className="news-category-section upsc">
                <div className="category-title">
                  <span className="dot"></span> UPSC Latest News
                </div>
                <ul className="news-list">
                  {upscNews.length > 0 ? (
                    upscNews.map(item => (
                      <li key={item._id} className="news-item">
                        <a href={item.link} className="news-link">
                          <span className="news-icon">👉</span>
                          {item.title}
                          {item.order === 1 && <span className="new-badge">New</span>}
                        </a>
                      </li>
                    ))
                  ) : (
                    <li className="no-news">No new updates</li>
                  )}
                </ul>
              </div>

              {/* TNPSC Section */}
              <div className="news-category-section tnpsc">
                <div className="category-title">
                  <span className="dot"></span> TNPSC Latest News
                </div>
                <ul className="news-list">
                  {tnpscNews.length > 0 ? (
                    tnpscNews.map(item => (
                      <li key={item._id} className="news-item">
                        <a href={item.link} className="news-link">
                          <span className="news-icon">👉</span>
                          {item.title}
                          {item.order === 1 && <span className="new-badge">New</span>}
                        </a>
                      </li>
                    ))
                  ) : (
                    <li className="no-news">No new updates</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
        
        <div className="news-modal-footer">
          <p>Stay informed with Kingmakers IAS Academy</p>
        </div>
      </div>
    </div>
  );
};

export default PopupNewsModal;
