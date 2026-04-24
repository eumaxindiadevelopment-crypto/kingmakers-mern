import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMediaUrl } from '../../utils/mediaUtils';

import API from '../../apiConfig';

const emptyForm = { name: '', rank: '', year: new Date().getFullYear(), exam: 'UPSC', photo: '', description: '', isVisible: true };

const Achievers = () => {
  const { admin } = useAuth();
  const [achievers, setAchievers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [examFilter, setExamFilter] = useState('all');

  const token = admin?.token;
  const headers = { 'Content-Type': 'application/json' };

  const fetchAchievers = async () => {
    const params = examFilter !== 'all' ? `?exam=${examFilter}` : '';
    const res = await fetch(`${API}/api/achievers${params}`);
    const data = await res.json();
    setAchievers(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchAchievers(); }, [examFilter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API}/api/achievers/${editId}` : `${API}/api/achievers`;
    await fetch(url, { method, headers, body: JSON.stringify(form) });
    setForm(emptyForm); setEditId(null); setShowForm(false);
    fetchAchievers();
  };

  const handleEdit = (a) => {
    setForm({ name: a.name, rank: a.rank, year: a.year, exam: a.exam, photo: a.photo, description: a.description, isVisible: a.isVisible });
    setEditId(a._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this achiever?')) return;
    await fetch(`${API}/api/achievers/${id}`, { method: 'DELETE', headers });
    setAchievers(achievers.filter(a => a._id !== id));
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>🏆 Achievers ({achievers.length})</h2>
        <div className="header-right">
          <div className="filter-tabs">
            {['all', 'UPSC', 'TNPSC', 'OTHER'].map(f => (
              <button key={f} className={`tab-btn ${examFilter === f ? 'active' : ''}`} onClick={() => setExamFilter(f)}>{f}</button>
            ))}
          </div>
          <button className="btn-primary" onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm); }}>
            {showForm ? '✕ Cancel' : '+ Add Achiever'}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <h3>{editId ? 'Edit Achiever' : 'Add Achiever'}</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Name *</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Rank *</label>
              <input type="text" required placeholder="e.g. AIR 5" value={form.rank} onChange={(e) => setForm({ ...form, rank: e.target.value })} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Year *</label>
              <input type="number" required value={form.year} onChange={(e) => setForm({ ...form, year: +e.target.value })} />
            </div>
            <div className="form-group">
              <label>Exam *</label>
              <select value={form.exam} onChange={(e) => setForm({ ...form, exam: e.target.value })}>
                <option value="UPSC">UPSC</option>
                <option value="TNPSC">TNPSC</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Photo URL</label>
            <input type="text" placeholder="https://..." value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="form-check">
            <input type="checkbox" id="isVisible" checked={form.isVisible} onChange={(e) => setForm({ ...form, isVisible: e.target.checked })} />
            <label htmlFor="isVisible">Visible on website</label>
          </div>
          <button type="submit" className="btn-primary">{editId ? 'Update Achiever' : 'Add Achiever'}</button>
        </form>
      )}

      {loading ? <div className="admin-loading"><div className="admin-spinner"></div></div> :
        achievers.length === 0 ? <div className="empty-state">No achievers found.</div> : (
          <div className="achievers-grid">
            {achievers.map(a => (
              <div key={a._id} className="achiever-card">
                <div className="achiever-photo">
                  {a.photo ? <img src={getMediaUrl(a.photo)} alt={a.name} /> : <div className="achiever-initials">{a.name?.charAt(0)}</div>}
                </div>
                <div className="achiever-info">
                  <h4>{a.name}</h4>
                  <div className="achiever-rank">{a.rank}</div>
                  <div className="achiever-meta">{a.exam} · {a.year}</div>
                  <span className={`badge ${a.isVisible ? 'badge-green' : 'badge-grey'}`}>{a.isVisible ? 'Visible' : 'Hidden'}</span>
                </div>
                <div className="card-actions">
                  <button className="btn-sm btn-edit" onClick={() => handleEdit(a)}>✏️</button>
                  <button className="btn-sm btn-danger" onClick={() => handleDelete(a._id)}>🗑</button>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default Achievers;
