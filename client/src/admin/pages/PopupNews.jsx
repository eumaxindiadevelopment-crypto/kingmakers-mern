import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSearchParams } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const EMPTY_FORM = {
  category: 'UPSC',
  title: '',
  link: '',
  order: 0,
  status: 'Published',
};

const PopupNews = ({ defaultCategory = 'UPSC' }) => {
  const { admin } = useAuth();
  const [searchParams] = useSearchParams();
  
  // If category comes from URL or prop
  const activeCategory = searchParams.get('category') || defaultCategory;

  const headers = {
    Authorization: `Bearer ${admin?.token}`,
    'Content-Type': 'application/json',
  };

  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ ...EMPTY_FORM, category: activeCategory });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/popup-news?category=${activeCategory}`, {
        headers: { Authorization: `Bearer ${admin?.token}` },
      });
      const data = await res.json();
      setNewsList(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, admin?.token]);

  useEffect(() => {
    fetchNews();
    setForm(f => ({ ...f, category: activeCategory }));
  }, [fetchNews, activeCategory]);

  const filtered = newsList.filter(
    (n) => !search || n.title.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const openAdd = () => {
    setEditItem(null);
    setForm({ ...EMPTY_FORM, category: activeCategory });
    setError('');
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      category: item.category,
      title: item.title,
      link: item.link,
      order: item.order,
      status: item.status,
    });
    setError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditItem(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.link.trim()) {
      setError('Title and Link are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const url = editItem
        ? `${API}/api/popup-news/${editItem._id}`
        : `${API}/api/popup-news`;
      const method = editItem ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers, body: JSON.stringify(form) });
      if (!res.ok) throw new Error('Save failed');
      await fetchNews();
      closeModal();
    } catch (e) {
      setError(e.message || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      const res = await fetch(`${API}/api/popup-news/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${admin?.token}` },
      });
      if (res.ok) {
        setNewsList((prev) => prev.filter((n) => n._id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const statusBadge = (s) => (
    <span className={`slider-badge ${s === 'Published' ? 'slider-badge-published' : 'slider-badge-draft'}`}>
      {s}
    </span>
  );

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="sliders-page-header">
        <div>
          <h2 className="sliders-page-title">{activeCategory} Popup News</h2>
          <p className="sliders-page-sub">Manage all the {activeCategory} popup news items.</p>
        </div>
        <button className="sliders-add-btn" onClick={openAdd}>
          <i className="fa-solid fa-plus"></i> Add Item
        </button>
      </div>

      {/* Filter Bar */}
      <div className="sliders-filters">
        <input
          type="text"
          className="sliders-search-input"
          placeholder="Search news..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <button className="sliders-search-btn" onClick={fetchNews}>
          <i className="fa-solid fa-magnifying-glass"></i> Search
        </button>
      </div>

      {/* Table */}
      <div className="leads-table-wrap">
        {loading ? (
          <div className="admin-loading"><div className="admin-spinner"></div></div>
        ) : paginated.length === 0 ? (
          <div className="empty-state">
            No popup news found for {activeCategory}.
          </div>
        ) : (
          <table className="leads-table">
            <thead>
              <tr>
                <th style={{ width: '50px' }}>#</th>
                <th>Title</th>
                <th style={{ maxWidth: '300px' }}>Link</th>
                <th style={{ width: '120px' }}>Status</th>
                <th style={{ width: '80px' }}>Order</th>
                <th style={{ width: '150px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((item, idx) => (
                <tr key={item._id}>
                  <td className="leads-num">{(page - 1) * perPage + idx + 1}</td>
                  <td><strong>{item.title}</strong></td>
                  <td style={{ 
                    maxWidth: '300px', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap',
                    color: 'var(--admin-text-muted)',
                    fontSize: '0.85rem'
                  }} title={item.link}>
                    {item.link}
                  </td>
                  <td>{statusBadge(item.status)}</td>
                  <td className="sliders-order">{item.order}</td>
                  <td>
                    <div className="leads-actions">
                      <button className="leads-action-btn" title="Edit" onClick={() => openEdit(item)}>
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                      <button
                        className="leads-action-btn leads-action-delete"
                        title="Delete"
                        onClick={() => handleDelete(item._id, item.title)}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && filtered.length > perPage && (
        <div className="sliders-pagination">
          <span className="sliders-count">
            Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of {filtered.length} entries
          </span>
          <div className="sliders-pages">
            <button className="sliders-page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`sliders-page-btn ${page === i + 1 ? 'active' : ''}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button className="sliders-page-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showModal && (
        <div className="sliders-modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="sliders-modal">
            <div className="sliders-modal-header">
              <h3>{editItem ? 'Edit Popup News' : 'Add Popup News'}</h3>
              <button className="sliders-modal-close" onClick={closeModal}>✕</button>
            </div>

            <form className="sliders-modal-body" onSubmit={handleSave}>
              {error && <div className="sliders-modal-error">{error}</div>}

              <div className="sliders-field">
                <label>Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                >
                  <option value="UPSC">UPSC</option>
                  <option value="TNPSC">TNPSC</option>
                </select>
              </div>

              <div className="sliders-field">
                <label>Title *</label>
                <input
                  type="text"
                  placeholder="Enter headline..."
                  value={form.title}
                  onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                  required
                />
              </div>

              <div className="sliders-field">
                <label>Link *</label>
                <input
                  type="text"
                  placeholder="/upsc-course or external link"
                  value={form.link}
                  onChange={(e) => setForm(f => ({ ...f, link: e.target.value }))}
                  required
                />
              </div>

              <div className="sliders-field-row">
                <div className="sliders-field">
                  <label>Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="sliders-field">
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="sliders-modal-footer">
                <button type="button" className="sliders-cancel-btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="sliders-save-btn" disabled={saving}>
                  {saving ? 'Saving...' : editItem ? 'Update News' : 'Add News'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupNews;
