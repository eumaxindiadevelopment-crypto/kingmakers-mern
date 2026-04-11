import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const sourceLabels = { upsc: 'UPSC Enquiry', tnpsc: 'TNPSC Enquiry', contact: 'Contact Forms' };

const LeadsTable = ({ type, title }) => {
  const { admin } = useAuth();
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ totalThisMonth: 0, newToday: 0, contactedThisMonth: 0, pendingThisMonth: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [noteInput, setNoteInput] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const headers = { Authorization: `Bearer ${admin?.token}` };

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ source: type, limit: 200 });
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      if (startDate) params.set('startDate', startDate);
      if (endDate)   params.set('endDate', endDate);
      const res = await fetch(`${API}/api/leads?${params}`, { headers });
      const data = await res.json();
      setLeads(data.leads || []);
      setStats(data.stats || {});
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [type, search, statusFilter, startDate, endDate, admin?.token]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const handleStatusUpdate = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${API}/api/leads/${id}/status`, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const updated = await res.json();
      setLeads(prev => prev.map(l => l._id === id ? updated : l));
      if (selectedLead?._id === id) setSelectedLead(updated);
    } catch (e) { console.error(e); }
    finally { setUpdatingId(null); }
  };

  const handleSaveNote = async (id) => {
    const res = await fetch(`${API}/api/leads/${id}/status`, {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: noteInput })
    });
    const updated = await res.json();
    setLeads(prev => prev.map(l => l._id === id ? updated : l));
    setSelectedLead(updated);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry permanently?')) return;
    await fetch(`${API}/api/leads/${id}`, { method: 'DELETE', headers });
    setLeads(prev => prev.filter(l => l._id !== id));
    if (selectedLead?._id === id) setSelectedLead(null);
  };

  const exportCSV = () => {
    const cols = ['Name', 'Phone', 'Email', 'Course', 'City', 'Source', 'Status', 'Date'];
    const rows = leads.map(l => [
      l.name, l.phone, l.email || '', l.course || '', l.city || '', l.source,
      l.status, new Date(l.createdAt).toLocaleString('en-IN')
    ]);
    const csv = [cols, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${type}-leads.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const openDetail = (lead) => {
    setSelectedLead(lead);
    setNoteInput(lead.notes || '');
    // Mark as read
    if (!lead.isRead) {
      fetch(`${API}/api/leads/${lead._id}/read`, { method: 'PUT', headers });
    }
  };

  const statusBadge = (status) => {
    const cls = { New: 'badge-new', Contacted: 'badge-contacted', Pending: 'badge-pending' };
    return <span className={`leads-badge ${cls[status] || ''}`}>{status}</span>;
  };

  const fmtDate = (d) => {
    const dt = new Date(d);
    return { date: dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), time: dt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) };
  };

  return (
    <div className={`leads-page ${selectedLead ? 'panel-open' : ''}`}>
      {/* Header */}
      <div className="leads-header">
        <div>
          <h2 className="leads-title">{title || sourceLabels[type]}</h2>
          <p className="leads-breadcrumb">Dashboard › Leads › {title || sourceLabels[type]}</p>
        </div>
        <button className="leads-export-btn" onClick={exportCSV}>
          <i className="fa-solid fa-download"></i> Export
        </button>
      </div>

      {/* Stat Cards */}
      <div className="leads-stats">
        <div className="leads-stat-card leads-stat-blue">
          <i className="fa-solid fa-users"></i>
          <div>
            <div className="stat-value">{stats.totalThisMonth}</div>
            <div className="stat-label">Total Enquiries</div>
            <div className="stat-sub">This Month</div>
          </div>
        </div>
        <div className="leads-stat-card leads-stat-green">
          <i className="fa-solid fa-phone"></i>
          <div>
            <div className="stat-value">{stats.newToday}</div>
            <div className="stat-label">New Today</div>
            <div className="stat-sub">Today</div>
          </div>
        </div>
        <div className="leads-stat-card leads-stat-purple">
          <i className="fa-solid fa-chart-line"></i>
          <div>
            <div className="stat-value">{stats.contactedThisMonth}</div>
            <div className="stat-label">Contacted</div>
            <div className="stat-sub">This Month</div>
          </div>
        </div>
        <div className="leads-stat-card leads-stat-orange">
          <i className="fa-regular fa-clock"></i>
          <div>
            <div className="stat-value">{stats.pendingThisMonth}</div>
            <div className="stat-label">Pending</div>
            <div className="stat-sub">This Month</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="leads-filters">
        <div className="leads-search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="leads-filter-select">
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Pending">Pending</option>
        </select>

        {/* Date Range */}
        <div className="leads-date-range">
          <i className="fa-regular fa-calendar"></i>
          <input
            type="date"
            className="leads-date-input"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            title="From date"
          />
          <span className="leads-date-sep">→</span>
          <input
            type="date"
            className="leads-date-input"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            title="To date"
          />
        </div>

        {/* Quick presets */}
        <div className="leads-date-presets">
          {[
            { label: 'Today', days: 0 },
            { label: '7D',    days: 7 },
            { label: '30D',   days: 30 },
          ].map(({ label, days }) => (
            <button
              key={label}
              className="leads-preset-btn"
              onClick={() => {
                const now = new Date();
                const from = new Date(now);
                from.setDate(now.getDate() - days);
                const fmt = d => d.toISOString().slice(0, 10);
                setStartDate(fmt(from));
                setEndDate(fmt(now));
              }}
            >{label}</button>
          ))}
        </div>

        <button className="leads-filter-btn" onClick={() => { setSearch(''); setStatusFilter(''); setStartDate(''); setEndDate(''); }}>
          <i className="fa-solid fa-rotate-left"></i> Reset
        </button>
      </div>

      {/* Table */}
      <div className="leads-table-wrap">
        {loading ? (
          <div className="admin-loading"><div className="admin-spinner"></div></div>
        ) : leads.length === 0 ? (
          <div className="empty-state">No enquiries found.</div>
        ) : (
          <table className="leads-table">
            <thead>
              <tr>
                <th>#</th><th>Name</th><th>Phone</th><th>Email</th>
                <th>Course</th><th>City</th><th>Date</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, idx) => {
                const { date, time } = fmtDate(lead.createdAt);
                return (
                  <tr key={lead._id} className={!lead.isRead ? 'leads-row-unread' : ''}>
                    <td className="leads-num">{idx + 1}</td>
                    <td><strong>{lead.name}</strong></td>
                    <td>{lead.phone}</td>
                    <td className="leads-email">{lead.email || '—'}</td>
                    <td>{lead.course || '—'}</td>
                    <td>{lead.city || '—'}</td>
                    <td>
                      <div className="leads-date">{date}</div>
                      <div className="leads-time">{time}</div>
                    </td>
                    <td>{statusBadge(lead.status)}</td>
                    <td>
                      <div className="leads-actions">
                        <button className="leads-action-btn" title="View Details" onClick={() => openDetail(lead)}>
                          <i className="fa-regular fa-eye"></i>
                        </button>
                        <button className="leads-action-btn leads-action-delete" title="Delete" onClick={() => handleDelete(lead._id)}>
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <div className="leads-count">Showing 1 to {leads.length} of {leads.length} entries</div>
      </div>

      {/* Detail Drawer */}
      {selectedLead && (
        <div className="leads-drawer">
          <div className="leads-drawer-header">
            <h3>Enquiry Details</h3>
            <button className="leads-drawer-close" onClick={() => setSelectedLead(null)}>✕</button>
          </div>
          <div className="leads-drawer-body">
            <div className="leads-detail-item"><i className="fa-solid fa-user"></i><div><span>Name</span><strong>{selectedLead.name}</strong></div></div>
            <div className="leads-detail-item"><i className="fa-solid fa-phone"></i><div><span>Phone</span><a href={`tel:${selectedLead.phone}`}>{selectedLead.phone}</a></div></div>
            <div className="leads-detail-item"><i className="fa-solid fa-envelope"></i><div><span>Email</span><a href={`mailto:${selectedLead.email}`}>{selectedLead.email || '—'}</a></div></div>
            <div className="leads-detail-item"><i className="fa-solid fa-book-open"></i><div><span>Course</span><strong>{selectedLead.course || '—'}</strong></div></div>
            <div className="leads-detail-item"><i className="fa-solid fa-location-dot"></i><div><span>City</span><strong>{selectedLead.city || '—'}</strong></div></div>
            {selectedLead.message && (
              <div className="leads-detail-item leads-detail-message"><i className="fa-solid fa-message"></i><div><span>Message</span><p>{selectedLead.message}</p></div></div>
            )}
            <div className="leads-detail-item"><i className="fa-solid fa-circle-info"></i><div><span>Source</span><strong>{sourceLabels[selectedLead.source] || selectedLead.source}</strong></div></div>
            <div className="leads-detail-item"><i className="fa-regular fa-calendar"></i><div><span>Date</span><strong>{new Date(selectedLead.createdAt).toLocaleString('en-IN')}</strong></div></div>
            <div className="leads-detail-item"><i className="fa-solid fa-tag"></i><div><span>Status</span>{statusBadge(selectedLead.status)}</div></div>

            <div className="leads-drawer-actions">
              {selectedLead.status !== 'Contacted' && (
                <button
                  className="leads-contact-btn"
                  disabled={updatingId === selectedLead._id}
                  onClick={() => handleStatusUpdate(selectedLead._id, 'Contacted')}
                >
                  <i className="fa-solid fa-circle-check"></i> Mark as Contacted
                </button>
              )}
              {selectedLead.status !== 'Pending' && (
                <button
                  className="leads-pending-btn"
                  disabled={updatingId === selectedLead._id}
                  onClick={() => handleStatusUpdate(selectedLead._id, 'Pending')}
                >
                  <i className="fa-regular fa-clock"></i> Mark as Pending
                </button>
              )}
              <button className="leads-delete-btn" onClick={() => handleDelete(selectedLead._id)}>
                <i className="fa-regular fa-trash-can"></i> Delete Enquiry
              </button>
            </div>

            <div className="leads-notes-section">
              <div className="leads-notes-header">
                Notes <button>+</button>
              </div>
              <textarea
                className="leads-notes-input"
                placeholder="Add notes about this enquiry... Only admin can see this."
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
                rows={4}
              />
              <button className="leads-notes-save" onClick={() => handleSaveNote(selectedLead._id)}>Save Note</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsTable;
