import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AdminLoginData } from '../../data/AdminLoginData';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Match credentials against static AdminLoginData
    const match = AdminLoginData.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (match) {
      login({ email: match.email, role: match.role });
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }

    setLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <div className="login-logo">
          <h2>👑 KM Admin</h2>
          <p>Kingmakers IAS Academy</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@kingmakers.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          {error && <div className="login-error">⚠️ {error}</div>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
