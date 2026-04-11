import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const StatCard = ({ icon, label, count, sub, color, to }) => (
  <Link to={to || '#'} className={`dash-stat-card dash-stat-${color}`} style={{ textDecoration: 'none' }}>
    <div className="dash-stat-icon">{icon}</div>
    <div className="dash-stat-info">
      <div className="dash-stat-count">{count ?? <span className="dash-stat-loading">—</span>}</div>
      <div className="dash-stat-label">{label}</div>
      {sub && <div className="dash-stat-sub">{sub}</div>}
    </div>
  </Link>
);

const Dashboard = () => {
  const { admin } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${admin?.token}` };

    const fetchStats = async () => {
      try {
        // Fetch all lead sources + blogs + achievers concurrently
        const [upscRes, tnpscRes, contactRes, blogsRes, achieversRes] = await Promise.all([
          fetch(`${API}/api/leads?source=upsc&limit=5`, { headers }).then(r => r.json()),
          fetch(`${API}/api/leads?source=tnpsc&limit=1`, { headers }).then(r => r.json()),
          fetch(`${API}/api/leads?source=contact&limit=1`, { headers }).then(r => r.json()),
          fetch(`${API}/api/blogs`).then(r => r.json()),
          // fetch(`${API}/api/achievers`).then(r => r.json()),
        ]);

        // All three sources give us the combined today count via their stats
        const newToday =
          (upscRes.stats?.newToday || 0) +
          (tnpscRes.stats?.newToday || 0) +
          (contactRes.stats?.newToday || 0);

        const totalLeads =
          (upscRes.total || 0) +
          (tnpscRes.total || 0) +
          (contactRes.total || 0);

        setStats({
          totalLeads,
          upscLeads: upscRes.total || 0,
          tnpscLeads: tnpscRes.total || 0,
          contactLeads: contactRes.total || 0,
          newToday,
          blogs: Array.isArray(blogsRes) ? blogsRes.length : (blogsRes?.length || 0),
          // achievers: Array.isArray(achieversRes) ? achieversRes.length : 0,
        });

        // Most recent 5 UPSC leads for mini-table
        setRecentLeads(upscRes.leads?.slice(0, 5) || []);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [admin]);

  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 17 ? 'Good afternoon' : 'Good evening';
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });

  const statusBadge = (s) => {
    const map = { New: '#3b82f6', Contacted: '#10b981', Pending: '#f59e0b' };
    const color = map[s] || '#888';
    return (
      <span className={`wp-status-badge ${s.toLowerCase()}`} style={{ 
        padding: '4px 10px', 
        fontSize: '0.7rem',
        background: `${color}15`, 
        color: color,
        border: `1px solid ${color}33`
      }}>{s}</span>
    );
  };

  return (
    <div className="admin-page wp-style">
      {/* Header */}
      <div className="dash-header">
        <div>
          <h2 className="dash-welcome">{greeting}, {admin?.name} 👋</h2>
          <p className="dash-date">{dateStr}</p>
        </div>
        <Link to="/admin/leads/upsc" className="dash-action-btn">
          <i className="fa-solid fa-plus"></i> New Enquiries
        </Link>
      </div>

      {loading ? (
        <div className="admin-loading"><div className="admin-spinner"></div></div>
      ) : (
        <>
          {/* Primary Stat Cards */}
          <div className="dash-stats-primary">
            <StatCard icon="📋" label="Total Leads" count={stats?.totalLeads} sub="All Sources" color="blue" to="/admin/leads/upsc" />
            <StatCard icon="🆕" label="New Today" count={stats?.newToday} sub="Across All Forms" color="green" to="/admin/leads/upsc" />
            <StatCard icon="📝" label="Blog Posts" count={stats?.blogs} sub="Published" color="purple" to="/admin/blogs" />
            {/* <StatCard icon="🏆" label="Achievers" count={stats?.achievers} sub="On Website" color="orange" to="/admin/achievers" /> */}
          </div>

          {/* Leads Breakdown */}
          <div className="dash-section-title">Leads Breakdown</div>
          <div className="dash-stats-secondary">
            <Link to="/admin/leads/upsc" className="dash-lead-card">
              <div className="dash-lead-icon" style={{ background: 'rgba(168,85,247,0.12)', color: '#a855f7' }}>🎓</div>
              <div className="dash-lead-info">
                <span className="dash-lead-count">{stats?.upscLeads ?? '—'}</span>
                <span className="dash-lead-label">UPSC Enquiries</span>
              </div>
              <i className="fa-solid fa-chevron-right dash-lead-arrow"></i>
            </Link>
            <Link to="/admin/leads/tnpsc" className="dash-lead-card">
              <div className="dash-lead-icon" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}>🏛️</div>
              <div className="dash-lead-info">
                <span className="dash-lead-count">{stats?.tnpscLeads ?? '—'}</span>
                <span className="dash-lead-label">TNPSC Enquiries</span>
              </div>
              <i className="fa-solid fa-chevron-right dash-lead-arrow"></i>
            </Link>
            <Link to="/admin/leads/contact" className="dash-lead-card">
              <div className="dash-lead-icon" style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}>📞</div>
              <div className="dash-lead-info">
                <span className="dash-lead-count">{stats?.contactLeads ?? '—'}</span>
                <span className="dash-lead-label">Contact Forms</span>
              </div>
              <i className="fa-solid fa-chevron-right dash-lead-arrow"></i>
            </Link>
          </div>

          {/* Recent Leads Mini Table */}
          {recentLeads.length > 0 && (
            <div className="dash-recent">
              <div className="dash-recent-header">
                <h3>Recent UPSC Enquiries</h3>
                <Link to="/admin/leads/upsc" className="dash-recent-view">View All →</Link>
              </div>
              <div className="dash-recent-table-wrap">
                <table className="dash-recent-table">
                  <thead>
                    <tr><th>Name</th><th>Phone</th><th>Course</th><th>City</th><th>Status</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    {recentLeads.map(lead => (
                      <tr key={lead._id}>
                        <td><strong>{lead.name}</strong></td>
                        <td>{lead.phone}</td>
                        <td>{lead.course || '—'}</td>
                        <td>{lead.city || '—'}</td>
                        <td>{statusBadge(lead.status)}</td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                          {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div className="dash-quick-links">
            <div className="dash-section-title">Quick Actions</div>
            <div className="dash-quick-grid">
              <Link to="/admin/leads/upsc"    className="dash-quick-card">📋 UPSC Enquiries</Link>
              <Link to="/admin/leads/tnpsc"   className="dash-quick-card">🏛️ TNPSC Enquiries</Link>
              <Link to="/admin/leads/contact" className="dash-quick-card">📞 Contact Forms</Link>
              <Link to="/admin/blogs"         className="dash-quick-card">✏️ Blog Posts</Link>
              {/* <Link to="/admin/achievers"     className="dash-quick-card">🏆 Achievers</Link> */}
              <Link to="/admin/events"        className="dash-quick-card">📅 Events</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
