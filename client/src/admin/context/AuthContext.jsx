import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('km_admin');
    if (stored) setAdmin(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = (adminData) => {
    localStorage.setItem('km_admin', JSON.stringify(adminData));
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem('km_admin');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
