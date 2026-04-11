import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const EMPTY_FORM = {
  title: '',
  imageUrl: '',
  altText: '',
  link: '',
  order: 0,
  status: 'published',
};

import MediaLibraryModal from '../components/MediaLibraryModal';

/* ─────────────────────────────────────────
   Main AdminSliders Component
───────────────────────────────────────── */
const AdminSliders = ({ openNew = false }) => {
  const { admin } = useAuth();
  const headers = {
    Authorization: `Bearer ${admin?.token}`,
    'Content-Type': 'application/json',
  };

  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Slider form modal
  const [showModal, setShowModal] = useState(openNew);
  const [editSlider, setEditSlider] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Media Library popup
  const [showMediaLib, setShowMediaLib] = useState(false);

  /* ── Reactive Modal Open per Prop ── */
  useEffect(() => {
    if (openNew) {
      setEditSlider(null);
      setForm(EMPTY_FORM);
      setError('');
      setShowModal(true);
    }
  }, [openNew]);

  /* ── Fetch ── */
  const fetchSliders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      const res = await fetch(`${API}/api/sliders?${params}`, {
        headers: { Authorization: `Bearer ${admin?.token}` },
      });
      const data = await res.json();
      setSliders(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, admin?.token]);

  useEffect(() => { fetchSliders(); }, [fetchSliders]);

  /* ── Filter + paginate ── */
  const filtered = sliders.filter(
    (s) => !search || s.title.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  /* ── Open/Close ── */
  const openAdd = () => {
    setEditSlider(null);
    setForm(EMPTY_FORM);
    setError('');
    setShowModal(true);
  };

  const openEdit = (slider) => {
    setEditSlider(slider);
    setForm({
      title: slider.title,
      imageUrl: slider.imageUrl,
      altText: slider.altText || '',
      link: slider.link || '',
      order: slider.order,
      status: slider.status,
    });
    setError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditSlider(null);
    setForm(EMPTY_FORM);
    setShowMediaLib(false);
  };

  /* ── Save ── */
  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!form.imageUrl.trim()) {
      setError('Please select an image from the Media Library.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const url = editSlider
        ? `${API}/api/sliders/${editSlider._id}`
        : `${API}/api/sliders`;
      const method = editSlider ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers, body: JSON.stringify(form) });
      if (!res.ok) throw new Error('Save failed');
      await fetchSliders();
      closeModal();
    } catch (e) {
      setError(e.message || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  /* ── Delete ── */
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    await fetch(`${API}/api/sliders/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${admin?.token}` },
    });
    setSliders((prev) => prev.filter((s) => s._id !== id));
  };

  /* ── Media select callback ── */
  const handleMediaSelect = (mediaItem) => {
    setForm((f) => ({ ...f, imageUrl: mediaItem.url }));
    setShowMediaLib(false);
  };

  /* ── Status badge ── */
  const statusBadge = (s) => (
    <span className={`slider-badge ${s === 'published' ? 'slider-badge-published' : 'slider-badge-draft'}`}>
      {s === 'published' ? 'Published' : 'Draft'}
    </span>
  );

  /* ─────────────── Render ─────────────── */
  return (
    <div className="admin-page">

      {/* ── Page Header ── */}
      <div className="sliders-page-header">
        <div>
          <h2 className="sliders-page-title">Sliders</h2>
          <p className="sliders-page-sub">Manage and display home page slider images.</p>
        </div>
        <button className="sliders-add-btn" onClick={openAdd}>
          <i className="fa-solid fa-plus"></i> Add New Slider
        </button>
      </div>

      {/* ── Filter Bar ── */}
      <div className="sliders-filters">
        <input
          type="text"
          className="sliders-search-input"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select
          className="sliders-filter-select"
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
        >
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <button className="sliders-search-btn" onClick={fetchSliders}>
          <i className="fa-solid fa-magnifying-glass"></i> Search
        </button>
        <button
          className="sliders-reset-btn"
          onClick={() => { setSearch(''); setStatusFilter(''); setPage(1); }}
        >
          Reset
        </button>
      </div>

      {/* ── Table ── */}
      <div className="sliders-table-wrap">
        {loading ? (
          <div className="admin-loading"><div className="admin-spinner"></div></div>
        ) : paginated.length === 0 ? (
          <div className="empty-state">
            No sliders found. Click <strong>+ Add New Slider</strong> to get started.
          </div>
        ) : (
          <table className="sliders-table">
            <thead>
              <tr>
                <th style={{ width: 90 }}>Thumbnail</th>
                <th>Title</th>
                <th style={{ width: 80 }}>Order</th>
                <th style={{ width: 120 }}>Status</th>
                <th style={{ width: 130 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((slider) => (
                <tr key={slider._id}>
                  <td>
                    <div className="sliders-thumb-wrap">
                      <img
                        src={slider.imageUrl}
                        alt={slider.altText || slider.title}
                        className="sliders-thumb"
                        onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
                      />
                    </div>
                  </td>
                  <td><strong>{slider.title}</strong></td>
                  <td className="sliders-order">{slider.order}</td>
                  <td>{statusBadge(slider.status)}</td>
                  <td>
                    <div className="sliders-action-group">
                      <button className="sliders-edit-btn" onClick={() => openEdit(slider)}>
                        <i className="fa-solid fa-pen-to-square"></i> Edit
                      </button>
                      <button
                        className="sliders-delete-btn"
                        onClick={() => handleDelete(slider._id, slider.title)}
                        title="Delete"
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

      {/* ── Pagination ── */}
      {!loading && filtered.length > 0 && (
        <div className="sliders-pagination">
          <span className="sliders-count">
            Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of{' '}
            {filtered.length} entries
          </span>
          <div className="sliders-pages">
            <button className="sliders-page-btn" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`sliders-page-btn ${page === i + 1 ? 'active' : ''}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="sliders-page-btn"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              ›
            </button>
          </div>
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      {showModal && (
        <div className="sliders-modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="sliders-modal">
            <div className="sliders-modal-header">
              <h3>{editSlider ? 'Edit Slider' : 'Add New Slider'}</h3>
              <button className="sliders-modal-close" onClick={closeModal}>✕</button>
            </div>

            <form className="sliders-modal-body" onSubmit={handleSave}>
              {error && <div className="sliders-modal-error">{error}</div>}

              {/* Title */}
              <div className="sliders-field">
                <label>Title *</label>
                <input
                  type="text"
                  placeholder="e.g. India's Best IAS Academy"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                />
              </div>

              {/* Image — Media Library picker */}
              <div className="sliders-field">
                <label>Image *</label>
                <button
                  type="button"
                  className="sliders-media-pick-btn"
                  onClick={() => setShowMediaLib(true)}
                >
                  <i className="fa-regular fa-images"></i>
                  {form.imageUrl ? 'Change Image' : 'Choose From Media Library'}
                </button>

                {/* Preview */}
                {form.imageUrl && (
                  <div className="sliders-img-preview">
                    <img
                      src={form.imageUrl}
                      alt="Selected preview"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <button
                      type="button"
                      className="sliders-remove-img"
                      onClick={() => setForm((f) => ({ ...f, imageUrl: '' }))}
                      title="Remove selected image"
                    >
                      ✕ Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Alt Text */}
              <div className="sliders-field">
                <label>Alt Text</label>
                <input
                  type="text"
                  placeholder="Short description for accessibility"
                  value={form.altText}
                  onChange={(e) => setForm((f) => ({ ...f, altText: e.target.value }))}
                />
              </div>

              {/* Link URL */}
              <div className="sliders-field">
                <label>Link URL <span className="sliders-optional">(optional)</span></label>
                <input
                  type="text"
                  placeholder="/upsc-course or https://..."
                  value={form.link}
                  onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
                />
              </div>

              {/* Order + Status */}
              <div className="sliders-field-row">
                <div className="sliders-field">
                  <label>Order</label>
                  <input
                    type="number"
                    min={0}
                    value={form.order}
                    onChange={(e) => setForm((f) => ({ ...f, order: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="sliders-field">
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="sliders-modal-footer">
                <button type="button" className="sliders-cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="sliders-save-btn" disabled={saving}>
                  {saving ? 'Saving...' : editSlider ? 'Update Slider' : 'Add Slider'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Media Library Popup ── */}
      {showMediaLib && (
        <MediaLibraryModal
          token={admin?.token}
          onSelect={handleMediaSelect}
          onClose={() => setShowMediaLib(false)}
        />
      )}
    </div>
  );
};

export default AdminSliders;
