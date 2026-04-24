import React, { useEffect, useState } from 'react';

import API from '../../apiConfig';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchLeads = async () => {
    const params = filter !== 'all' ? `?source=${filter}` : '';
    const res = await fetch(`${API}/api/leads${params}`);
    const data = await res.json();
    setLeads(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, [filter]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    await fetch(`${API}/api/leads/${id}`, {
      method: 'DELETE',
    });
    setLeads(leads.filter(l => l._id !== id));
  };

  const handleMarkRead = async (id) => {
    const res = await fetch(`${API}/api/leads/${id}/read`, {
      method: 'PUT',
    });
    const updated = await res.json();
    setLeads(leads.map(l => l._id === id ? updated : l));
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>📋 Leads ({leads.length})</h2>
        <div className="filter-tabs">
          {['all', 'enquiry', 'tnpsc', 'upsc', 'homepage'].map(f => (
            <button key={f} className={`tab-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="admin-loading"><div className="admin-spinner"></div></div>
      ) : leads.length === 0 ? (
        <div className="empty-state">No leads found.</div>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th><th>Phone</th><th>Email</th>
                <th>Course</th><th>Source</th><th>Date</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead._id} className={lead.isRead ? '' : 'unread-row'}>
                  <td><strong>{lead.name}</strong></td>
                  <td>{lead.phone}</td>
                  <td>{lead.email || '—'}</td>
                  <td>{lead.course || '—'}</td>
                  <td><span className={`badge badge-${lead.source}`}>{lead.source}</span></td>
                  <td>{new Date(lead.createdAt).toLocaleDateString('en-IN')}</td>
                  <td className="action-btns">
                    {!lead.isRead && (
                      <button className="btn-sm btn-success" onClick={() => handleMarkRead(lead._id)}>✓ Read</button>
                    )}
                    <button className="btn-sm btn-danger" onClick={() => handleDelete(lead._id)}>🗑 Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leads;
