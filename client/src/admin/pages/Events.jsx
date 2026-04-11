import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Editor } from '@tinymce/tinymce-react';
import MediaLibraryModal from '../components/MediaLibraryModal';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const emptyForm = { 
  title: '', 
  slug: '', 
  description: '', 
  date: '', 
  location: '', 
  image: '', 
  gallery: [], 
  status: 'Published' 
};

const Events = () => {
  const { admin } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  
  // Media Modal States
  const [mediaTarget, setMediaTarget] = useState(null); // 'featured' | 'gallery'
  const [showMediaModal, setShowMediaModal] = useState(false);
  
  // Filtering & Pagination State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const token = admin?.token;
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const fetchEvents = async () => {
    const res = await fetch(`${API}/api/events`);
    const data = await res.json();
    setEvents(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API}/api/events/${editId}` : `${API}/api/events`;
    
    // Ensure isActive is set based on status for backward compatibility if needed, 
    // though we prefer 'status' field now.
    const payload = { 
      ...form, 
      isActive: form.status === 'Published' 
    };

    try {
      const res = await fetch(url, { method, headers, body: JSON.stringify(payload) });
      if (res.ok) {
        setForm(emptyForm); 
        setEditId(null); 
        setShowForm(false);
        fetchEvents();
      } else {
        alert('Failed to save event');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (ev) => {
    setForm({ 
      title: ev.title, 
      slug: ev.slug, 
      description: ev.description, 
      date: ev.date ? new Date(ev.date).toISOString().split('T')[0] : '', 
      location: ev.location, 
      image: ev.image, 
      gallery: ev.gallery || [],
      status: ev.status || (ev.isActive ? 'Published' : 'Draft')
    });
    setEditId(ev._id);
    setShowForm(true);
  };

  const handleMediaSelect = (selected) => {
    if (mediaTarget === 'featured') {
      setForm({ ...form, image: selected.url });
    } else if (mediaTarget === 'gallery') {
      const newUrls = Array.isArray(selected) ? selected.map(s => s.url) : [selected.url];
      setForm({ ...form, gallery: [...form.gallery, ...newUrls] });
    }
    setShowMediaModal(false);
  };

  const removeGalleryImage = (index) => {
    const newGallery = [...form.gallery];
    newGallery.splice(index, 1);
    setForm({ ...form, gallery: newGallery });
  };

  const autoSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const filteredEvents = events.filter(ev => {
    const matchesSearch = ev.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || ev.status === statusFilter || (statusFilter === 'Published' && ev.isActive) || (statusFilter === 'Draft' && !ev.isActive);
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredEvents.length / perPage);
  const paginatedEvents = filteredEvents.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="admin-page">
      {/* Breadcrumbs */}
      <div className="events-breadcrumb">
        <span>Dashboard</span>
        <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.7rem' }}></i>
        <span>Events</span>
        <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.7rem' }}></i>
        <span className="active">All Events</span>
      </div>

      <div className="events-page-header">
        <div className="events-title-area">
          <h2>All Events</h2>
          <p>Manage all the events listed on the website.</p>
        </div>
        <button 
          className="btn-add-event" 
          onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm); }}
        >
          {showForm ? '✕ Close Editor' : <><i className="fa-solid fa-plus"></i> Add Event</>}
        </button>
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="wp-editor-layout">
          <div className="wp-editor-main">
            {/* Title & Slug (Standalone like WP) */}
            <div className="wp-title-section">
              <input 
                type="text" 
                className="wp-title-input-premium"
                placeholder="Add title"
                required 
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value, slug: autoSlug(e.target.value) })} 
              />
              <div className="wp-permalink-row">
                <span className="wp-permalink-label">Permalink:</span>
                <span className="wp-permalink-slug">kingmakersias.com/events/<span className="slug-edit">{form.slug || 'event-slug'}</span></span>
                <button type="button" className="wp-slug-edit-btn" onClick={() => {
                  const newSlug = prompt('Edit Slug:', form.slug);
                  if (newSlug) setForm({...form, slug: autoSlug(newSlug)});
                }}>Edit</button>
              </div>
            </div>

            <div className="wp-card main-editor-card mt-4">
              <div className="wp-card-header">
                <h3>Event Content</h3>
              </div>
              <div className="wp-card-body p-0">
                <Editor
                  tinymceScriptSrc="/tinymce/tinymce.min.js"
                  value={form.description}
                  onEditorChange={(content) => setForm({ ...form, description: content })}
                  init={{
                    license_key: 'gpl',
                    height: 500,
                    menubar: false,
                    branding: false,
                    promotion: false,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'link image media table | removeformat | help',
                    content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:16px; background:#ffffff; color:#1e293b; padding: 20px; }',
                    skin: 'oxide',
                    content_css: 'default',
                    border_width: 0
                  }}
                />
              </div>
            </div>
          </div>

          <aside className="wp-editor-sidebar">
            <div className="wp-card sidebar-card publish-card">
              <div className="wp-card-header"><h3>Publishing</h3></div>
              <div className="wp-card-body">
                <div className="wp-sidebar-status">
                  <i className="fa-solid fa-key"></i>
                  <span>Status: <strong>{form.status}</strong></span>
                </div>
                <div className="wp-form-group mt-3">
                  <label>Visibility Status</label>
                  <select 
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="wp-select"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
                <div className="wp-form-group mt-3">
                  <label>Event Date</label>
                  <input 
                    type="date" 
                    className="wp-input"
                    required 
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })} 
                  />
                </div>
                <div className="wp-form-group mt-3">
                  <label>Location</label>
                  <input 
                    type="text" 
                    className="wp-input"
                    placeholder="e.g. Chennai Branch"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })} 
                  />
                </div>
              </div>
              <div className="wp-card-footer">
                <button 
                  type="button" 
                  className="wp-btn-trash"
                  onClick={() => setShowForm(false)}
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  className="wp-btn-publish"
                >
                  {editId ? 'Update Event' : 'Publish Event'}
                </button>
              </div>
            </div>

            <div className="wp-card gallery-card mt-4">
              <div className="wp-card-header">
                <h3>Gallery Images</h3>
                <button 
                  type="button" 
                  className="wp-link-btn"
                  onClick={() => { setMediaTarget('gallery'); setShowMediaModal(true); }}
                >
                  + Add
                </button>
              </div>
              <div className="wp-card-body">
                <div className="wp-gallery-grid sidebar-version">
                  {form.gallery.map((url, idx) => (
                    <div key={idx} className="wp-gallery-item">
                      <img src={url} alt={`gallery-${idx}`} />
                      <button type="button" className="remove-gallery-item" onClick={() => removeGalleryImage(idx)}>×</button>
                    </div>
                  ))}
                </div>
                {form.gallery.length === 0 ? (
                  <div className="gallery-empty sidebar-version" onClick={() => { setMediaTarget('gallery'); setShowMediaModal(true); }}>
                    <i className="fa-solid fa-images"></i>
                    <p>Add gallery images</p>
                  </div>
                ) : (
                  <button 
                    type="button" 
                    className="wp-link-btn mt-3" 
                    style={{ width: '100%', textAlign: 'center' }}
                    onClick={() => { setMediaTarget('gallery'); setShowMediaModal(true); }}
                  >
                    Manage Gallery
                  </button>
                )}
              </div>
            </div>

            <div className="wp-card sidebar-card featured-image-card mt-4">
              <div className="wp-card-header"><h3>Featured Image</h3></div>
              <div className="wp-card-body">
                {form.image ? (
                  <div className="wp-featured-preview">
                    <img src={form.image} alt="Featured" />
                    <button 
                      type="button" 
                      className="wp-link-btn danger"
                      onClick={() => setForm({ ...form, image: '' })}
                    >
                      Remove featured image
                    </button>
                  </div>
                ) : (
                  <button 
                    type="button" 
                    className="wp-set-featured-btn"
                    onClick={() => { setMediaTarget('featured'); setShowMediaModal(true); }}
                  >
                    Set featured image
                  </button>
                )}
              </div>
            </div>
          </aside>
        </form>
      ) : (
        <>
          {/* Filter Bar */}
          <div className="events-filter-bar">
            <div className="filter-group">
              <select className="filter-select">
                <option>Search events...</option>
              </select>
            </div>
            <div className="filter-group">
              <select 
                className="filter-select"
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              >
                <option value="">All Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <div className="search-wrapper">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input 
                type="text" 
                placeholder="Search events..." 
                className="search-input"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <button className="btn-search" onClick={fetchEvents}>
              Send <i className="fa-solid fa-paper-plane"></i>
            </button>
            <button className="btn-reset" onClick={() => { setSearch(''); setStatusFilter(''); setPage(1); }}>
              Reset
            </button>
          </div>

          <div className="events-table-card">
            {loading ? (
              <div className="admin-loading"><div className="admin-spinner"></div></div>
            ) : paginatedEvents.length === 0 ? (
              <div className="wp-empty-state">
                <i className="fa-solid fa-calendar-xmark"></i>
                <p>No events found. Start by creating a new one!</p>
                <button className="wp-btn-publish" onClick={() => setShowForm(true)}>Add New Event</button>
              </div>
            ) : (
              <>
                <table className="events-table">
                  <thead>
                    <tr>
                      <th className="checkbox-col"><input type="checkbox" className="custom-checkbox" /></th>
                      <th>#</th>
                      <th>Thumbnail</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedEvents.map((ev, idx) => (
                      <tr key={ev._id}>
                        <td><input type="checkbox" className="custom-checkbox" /></td>
                        <td>{(page - 1) * perPage + idx + 1}</td>
                        <td>
                          <div className="event-cell-info">
                            <img 
                              src={ev.image || '/images/placeholder.jpg'} 
                              alt={ev.title} 
                              className="event-cell-thumb" 
                            />
                            <div className="event-cell-title">{ev.title}</div>
                          </div>
                        </td>
                        <td>{new Date(ev.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                        <td>
                          <span className={`status-badge ${ev.status === 'Published' || ev.isActive ? 'status-published' : 'status-draft'}`}>
                            {ev.status || (ev.isActive ? 'Published' : 'Draft')}
                          </span>
                        </td>
                        <td>
                          <div className="action-btns">
                            <button className="btn-edit-purple" onClick={() => handleEdit(ev)}>Edit</button>
                            <button 
                              className="btn-delete-red"
                              onClick={async () => {
                                if (!window.confirm('Are you sure you want to delete this event?')) return;
                                await fetch(`${API}/api/events/${ev._id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${admin?.token}` } });
                                fetchEvents();
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination Footer */}
                <div className="pagination-footer">
                  <div className="pagination-info">
                    Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, filteredEvents.length)} of {filteredEvents.length} entries
                    <select 
                      className="pg-per-page"
                      value={perPage}
                      onChange={(e) => { setPerPage(parseInt(e.target.value)); setPage(1); }}
                    >
                      <option value="10">10 page</option>
                      <option value="25">25 page</option>
                      <option value="50">50 page</option>
                    </select>
                  </div>
                  <div className="pagination-controls">
                    <button 
                      className="pg-arrows" 
                      disabled={page === 1}
                      onClick={() => setPage(p => p - 1)}
                    >
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button 
                        key={i + 1} 
                        className={`pg-btn ${page === i + 1 ? 'active' : ''}`}
                        onClick={() => setPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button 
                      className="pg-arrows" 
                      disabled={page === totalPages}
                      onClick={() => setPage(p => p + 1)}
                    >
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {showMediaModal && (
        <MediaLibraryModal
          token={admin?.token}
          allowMultiple={mediaTarget === 'gallery'}
          onClose={() => setShowMediaModal(false)}
          onSelect={handleMediaSelect}
        />
      )}
    </div>
  );
};

export default Events;
