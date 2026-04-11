import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-404">404</div>
        <h1 className="notfound-title">Oops! Page not found.</h1>
        <p className="notfound-text">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <div style={{ color: 'red', marginTop: '20px', fontSize: '0.9rem' }}>
          Debug Current Path: {window.location.pathname}
        </div>
        <Link to="/" className="btn btn-primary notfound-btn">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
