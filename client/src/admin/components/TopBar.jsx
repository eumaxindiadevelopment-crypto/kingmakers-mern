import React from 'react';
import { useLocation } from 'react-router-dom';

const pageTitles = {
  '/admin/dashboard': 'Dashboard',
  '/admin/leads': 'Leads',
  '/admin/blogs': 'Blogs',
  '/admin/events': 'Events',
  '/admin/achievers': 'Achievers',
};

const TopBar = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Admin';

  return (
    <header className="admin-topbar">
      <div className="topbar-title">
        <h1>{title}</h1>
      </div>
      <div className="topbar-right">
        <span className="topbar-brand">Kingmakers IAS Academy</span>
        <a href="/" target="_blank" rel="noopener noreferrer" className="topbar-visit">
          🌐 View Website
        </a>
      </div>
    </header>
  );
};

export default TopBar;
