import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner"></div>
      </div>
    );
  }

  return admin ? children : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;
