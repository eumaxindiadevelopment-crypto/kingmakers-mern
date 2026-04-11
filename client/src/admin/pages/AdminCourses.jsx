import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MediaLibraryModal from '../components/MediaLibraryModal';

const API = 'http://localhost:5000';

const emptyForm = {
  title: '',
  category: 'UPSC',
  description: '',
  duration: '',
  startDate: '',
  mode: '',
  batch: '',
  schedulePdf: '',
  features: [''], 
  fees: 0,
  isGstIncluded: true,
  badge: 'None',
  buttonText: 'Enroll Now',
  buttonLink: '',
  status: 'Published',
  order: 0,
  upcomingBatches: [],
  showOnHomePage: true
};

const AdminCourses = ({ type }) => {
  const { admin } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list');
  const [form, setForm] = useState({ ...emptyForm });
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [mediaModal, setMediaModal] = useState({ show: false, target: null, batchIndex: null }); // target: 'global' | 'batch'
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState(type || 'UPSC');

  const location = useLocation();
  const token = admin?.token;
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const categoryToFetch = type || activeTab;
      const res = await fetch(`${API}/api/courses?category=${categoryToFetch}`);
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [activeTab, type]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('action') === 'new') {
      openNew();
    } else {
      setView('list');
    }
  }, [location.search]);

  const openNew = () => {
    setForm({ ...emptyForm, category: type || activeTab });
    setEditId(null);
    setView('editor');
  };

  const openEdit = (course) => {
    setForm({
      ...emptyForm,
      ...course,
      features: course.features?.length > 0 ? course.features : [''],
      upcomingBatches: Array.isArray(course.upcomingBatches) ? course.upcomingBatches : []
    });
    setEditId(course._id);
    setView('editor');
  };

  const handleSave = async () => {
    if (!form.title) {
      alert('Course Title is required');
      return;
    }
    setSaving(true);
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API}/api/courses/${editId}` : `${API}/api/courses`;

    const cleanedFeatures = form.features.filter(f => f.trim() !== '');

    try {
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({ ...form, features: cleanedFeatures }),
      });
      if (res.ok) {
        setForm({ ...emptyForm });
        setEditId(null);
        await fetchCourses();
        setView('list');
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(`Error saving course: ${errorData.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      const res = await fetch(`${API}/api/courses/${id}`, { method: 'DELETE', headers });
      if (res.ok) setCourses(courses.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const openMediaLibrary = (target, batchIndex = null) => {
    setMediaModal({ show: true, target, batchIndex });
  };

  const handleMediaSelect = (item) => {
    if (mediaModal.target === 'global') {
      setForm({ ...form, schedulePdf: item.url });
    } else if (mediaModal.target === 'batch') {
      const newBatches = [...form.upcomingBatches];
      newBatches[mediaModal.batchIndex] = { ...newBatches[mediaModal.batchIndex], schedulePdf: item.url };
      setForm({ ...form, upcomingBatches: newBatches });
    }
    setMediaModal({ show: false, target: null, batchIndex: null });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...form.features];
    newFeatures[index] = value;
    setForm({ ...form, features: newFeatures });
  };

  const addFeature = () => {
    setForm({ ...form, features: [...form.features, ''] });
  };

  const removeFeature = (index) => {
    const newFeatures = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: newFeatures.length > 0 ? newFeatures : [''] });
  };

  const addBatch = () => {
    setForm({ 
      ...form, 
      upcomingBatches: [
        ...form.upcomingBatches, 
        { batchName: '', mode: '', startDate: '', fees: 0, paymentLink: '', showSchedule: false, schedulePdf: '' }
      ] 
    });
  };

  const removeBatch = (index) => {
    const newBatches = form.upcomingBatches.filter((_, i) => i !== index);
    setForm({ ...form, upcomingBatches: newBatches });
  };

  const handleBatchChange = (index, field, value) => {
    const newBatches = [...form.upcomingBatches];
    newBatches[index] = { ...newBatches[index], [field]: value };
    setForm({ ...form, upcomingBatches: newBatches });
  };

  const filtered = courses.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  if (view === 'editor') {
    return (
      <div className="admin-page">
        <div className="events-breadcrumb">
          <span>{type || 'Courses'}</span>
          <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.7rem' }}></i>
          <span className="active">{editId ? 'Edit' : 'Add New'}</span>
        </div>

        <div className="events-page-header">
          <div className="events-title-area">
            <h2>{editId ? 'Edit Course' : 'Add New Course'}</h2>
            <p>Customize course details and landing page content.</p>
          </div>
          <button className="btn-reset" onClick={() => setView('list')}>Back to List</button>
        </div>

        <div className="admin-form-container" style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--admin-border)' }}>
          {/* Section: Basic Information */}
          <div className="form-section" style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.5rem', color: 'var(--admin-primary)' }}>
              Basic Information
            </h3>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Course Title</label>
              <input 
                className="filter-select" 
                style={{ width: '100%', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '0.8rem' }}
                value={form.title} 
                onChange={e => setForm({ ...form, title: e.target.value })} 
                placeholder="e.g. UPSC Integrated Program" 
              />
            </div>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div className="form-group">
                <label>Category</label>
                <select 
                  className="filter-select" 
                  disabled={!!type}
                  style={{ width: '100%', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '0.8rem' }}
                  value={form.category} 
                  onChange={e => setForm({ ...form, category: e.target.value })}
                >
                  <option value="UPSC">UPSC</option>
                  <option value="TNPSC">TNPSC</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Description (Short summary for landing pages)</label>
              <textarea 
                className="filter-select" 
                style={{ width: '100%', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '0.8rem', minHeight: '80px' }}
                value={form.description} 
                onChange={e => setForm({ ...form, description: e.target.value })} 
                placeholder="Enter a brief description for the course landing page..." 
              />
            </div>
          </div>

          {/* Section: Upcoming Batches */}
          <div className="form-section" style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', margin: 0, borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.5rem', color: 'var(--admin-primary)', flex: 1 }}>
                Upcoming Batches
              </h3>
              <button className="btn-add-event" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={addBatch}>+ Add Batch</button>
            </div>

            {form.upcomingBatches.length > 0 ? (
              <div className="batches-table-wrap" style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--admin-border)' }}>
                      <th style={{ padding: '0.8rem' }}>Batch Name</th>
                      <th style={{ padding: '0.8rem' }}>Mode</th>
                      <th style={{ padding: '0.8rem' }}>Starts on</th>
                      <th style={{ padding: '0.8rem' }}>Fee</th>
                      <th style={{ padding: '0.8rem' }}>Payment Link</th>
                      <th style={{ padding: '0.8rem', textAlign: 'center' }}>Schedule</th>
                      <th style={{ padding: '0.8rem' }}>PDF</th>
                      <th style={{ padding: '0.8rem' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.upcomingBatches.map((batch, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '0.5rem' }}>
                          <input 
                            className="filter-select" 
                            style={{ width: '100%', padding: '0.5rem' }} 
                            value={batch.batchName} 
                            onChange={(e) => handleBatchChange(idx, 'batchName', e.target.value)}
                            placeholder="e.g. New Batch 4A"
                          />
                        </td>
                        <td style={{ padding: '0.5rem' }}>
                          <input 
                            className="filter-select" 
                            style={{ width: '100%', padding: '0.5rem' }} 
                            value={batch.mode} 
                            onChange={(e) => handleBatchChange(idx, 'mode', e.target.value)}
                            placeholder="Regular/Weekend"
                          />
                        </td>
                        <td style={{ padding: '0.5rem' }}>
                          <input 
                            className="filter-select" 
                            style={{ width: '100%', padding: '0.5rem' }} 
                            value={batch.startDate} 
                            onChange={(e) => handleBatchChange(idx, 'startDate', e.target.value)}
                            placeholder="20th March"
                          />
                        </td>
                        <td style={{ padding: '0.5rem' }}>
                          <input 
                            type="number"
                            className="filter-select" 
                            style={{ width: '100%', padding: '0.5rem' }} 
                            value={batch.fees} 
                            onChange={(e) => handleBatchChange(idx, 'fees', parseInt(e.target.value))}
                          />
                        </td>
                        <td style={{ padding: '0.5rem' }}>
                          <input 
                            className="filter-select" 
                            style={{ width: '100%', padding: '0.5rem' }} 
                            value={batch.paymentLink} 
                            onChange={(e) => handleBatchChange(idx, 'paymentLink', e.target.value)}
                            placeholder="Payment URL"
                          />
                        </td>
                        <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                          <div className="form-group" style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
                            <input 
                              type="checkbox" 
                              className="custom-checkbox" 
                              checked={batch.showSchedule} 
                              onChange={(e) => handleBatchChange(idx, 'showSchedule', e.target.checked)} 
                            />
                          </div>
                        </td>
                        <td style={{ padding: '0.5rem' }}>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <button 
                              className="btn-add-event" 
                              style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem', cursor: 'pointer', margin: 0, width: 'auto' }}
                              onClick={() => openMediaLibrary('batch', idx)}
                            >
                              <i className="fa-solid fa-photo-film" style={{ marginRight: '5px' }}></i>
                              Select
                            </button>
                            {batch.schedulePdf && <i className="fa-solid fa-file-pdf" style={{ color: 'var(--admin-success)' }} title="PDF Linked"></i>}
                          </div>
                        </td>
                        <td style={{ padding: '0.5rem' }}>
                          <button onClick={() => removeBatch(idx)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '8px', marginBottom: '1.5rem' }}>
                No batches added yet. Click "Add Batch" to start.
              </div>
            )}

            <div className="form-group">
              <label>Schedule PDF (General)</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button 
                  className="btn-add-event" 
                  style={{ width: 'auto', padding: '0.6rem 1rem' }}
                  onClick={() => openMediaLibrary('global')}
                >
                  <i className="fa-solid fa-photo-film" style={{ marginRight: '8px' }}></i>
                  Select from Media Library
                </button>
                {form.schedulePdf && <a href={form.schedulePdf} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: 'var(--admin-success)', fontWeight: '600' }}>📄 PDF Linked</a>}
              </div>
            </div>
          </div>

          {/* Section: Duration & Features */}
          <div className="form-section" style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.5rem', color: 'var(--admin-primary)' }}>
              Card Display Details
            </h3>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Program Duration</label>
              <input 
                className="filter-select" 
                style={{ width: '100%', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '0.8rem' }}
                value={form.duration} 
                onChange={e => setForm({ ...form, duration: e.target.value })} 
                placeholder="e.g. 18 Months / 2 Year Program" 
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <label style={{ margin: 0 }}>Course Features</label>
              <button className="btn-add-event" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={addFeature}>+ Add Feature</button>
            </div>
            <div className="features-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {form.features.map((feature, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input 
                    className="filter-select" 
                    style={{ flex: 1, border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '0.8rem' }}
                    value={feature}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                  />
                  {form.features.length > 1 && (
                    <button onClick={() => removeFeature(idx)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', width: '38px', height: '38px', borderRadius: '8px', cursor: 'pointer' }}>
                       <i className="fa-solid fa-trash-can"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section: Fees & Buttons */}
          <div className="form-section" style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.5rem', color: 'var(--admin-primary)' }}>
              Fees & Actions
            </h3>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'end' }}>
              <div className="form-group">
                <label>Total Fees (INR)</label>
                <input 
                  type="number"
                  className="filter-select" 
                  style={{ width: '100%', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '0.8rem' }}
                  value={form.fees} 
                  onChange={e => setForm({ ...form, fees: parseInt(e.target.value) })} 
                />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '0.8rem' }}>
                <input type="checkbox" className="custom-checkbox" id="gst-included" checked={form.isGstIncluded} onChange={e => setForm({ ...form, isGstIncluded: e.target.checked })} />
                <label htmlFor="gst-included" style={{ cursor: 'pointer', margin: 0 }}>GST Included</label>
              </div>
            </div>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label>Button Text</label>
                <input className="filter-select" style={{ width: '100%', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '0.8rem' }} value={form.buttonText} onChange={e => setForm({ ...form, buttonText: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Button Link</label>
                <input className="filter-select" style={{ width: '100%', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '0.8rem' }} value={form.buttonLink} onChange={e => setForm({ ...form, buttonLink: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Section: Management */}
          <div className="form-section" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.5rem', color: 'var(--admin-primary)' }}>
              Badge & Status
            </h3>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
               <div className="form-group">
                <label>Badge</label>
                <select className="filter-select" style={{ width: '100%', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '0.8rem' }} value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })}>
                  <option value="None">None</option>
                  <option value="Popular">Popular</option>
                  <option value="Most Popular">Most Popular</option>
                  <option value="New">New</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select className="filter-select" style={{ width: '100%', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '0.8rem' }} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
                <label className="switch" style={{ margin: 0, position: 'relative', display: 'inline-block', width: '40px', height: '20px' }}>
                  <input 
                    type="checkbox" 
                    checked={form.showOnHomePage} 
                    onChange={e => setForm({ ...form, showOnHomePage: e.target.checked })} 
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span className="slider round" style={{
                    position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: form.showOnHomePage ? 'var(--admin-primary)' : '#ccc',
                    transition: '.4s', borderRadius: '20px'
                  }}></span>
                  <span style={{
                    position: 'absolute', content: '""', height: '14px', width: '14px', left: form.showOnHomePage ? '22px' : '3px', bottom: '3px',
                    backgroundColor: 'white', transition: '.4s', borderRadius: '50%'
                  }}></span>
                </label>
                <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--admin-text)' }}>Home Page View</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}> (Show this course in Home Page Tabs)</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', borderTop: '1px solid var(--admin-border)', paddingTop: '2rem' }}>
            <button className="btn-add-event" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Course'}</button>
            <button className="btn-reset" onClick={() => setView('list')}>Cancel</button>
          </div>
        </div>

        {mediaModal.show && (
          <MediaLibraryModal 
            token={token}
            type="pdf"
            onClose={() => setMediaModal({ show: false, target: null, batchIndex: null })}
            onSelect={handleMediaSelect}
          />
        )}
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="events-breadcrumb">
        <span>Dashboard</span>
        <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.7rem' }}></i>
        <span className="active">{type ? `${type} Page Content` : 'All Courses'}</span>
      </div>

      <div className="events-page-header">
        <div className="events-title-area">
          <h2>{type ? `${type} Content Management` : 'Courses & Fees'}</h2>
          <p>Fully customize the {type || 'Academy'} course listings and details.</p>
        </div>
        <button className="btn-add-event" onClick={openNew}>
          <i className="fa-solid fa-plus"></i> Add {type || 'Course'}
        </button>
      </div>

      {!type && (
        <div className="wp-view-switcher" style={{ marginBottom: '1.5rem', borderBottom: 'none' }}>
          <button className={`wp-view-tab ${activeTab === 'UPSC' ? 'active' : ''}`} onClick={() => setActiveTab('UPSC')}>UPSC</button>
          <button className={`wp-view-tab ${activeTab === 'TNPSC' ? 'active' : ''}`} onClick={() => setActiveTab('TNPSC')}>TNPSC Courses</button>
        </div>
      )}

      <div className="events-filter-bar">
        <div className="search-wrapper">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." className="search-input" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>{filtered.length} items</div>
      </div>

      <div className="events-table-card">
        {loading ? (
          <div className="admin-loading"><div className="admin-spinner"></div></div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--admin-text-muted)' }}>No courses found.</div>
        ) : (
          <table className="events-table">
            <thead>
              <tr>
                <th>TITLE & DETAILS</th>
                <th>BATCH / DATE</th>
                <th>FEES</th>
                <th style={{ textAlign: 'center' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((course) => (
                <tr key={course._id}>
                  <td>
                    <div style={{ fontWeight: '700', color: 'var(--admin-text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {course.title}
                      {course.badge !== 'None' && <span className="badge badge-warning" style={{ fontSize: '0.6rem' }}>{course.badge}</span>}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                      {course.duration}
                    </div>
                    {course.schedulePdf && <div style={{ fontSize: '0.7rem', color: 'var(--admin-primary)', marginTop: '4px' }}>📄 PDF Schedule</div>}
                  </td>
                  <td>
                    <div style={{ fontWeight: '500' }}>{course.upcomingBatches?.length || 0} Batches</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {course.upcomingBatches?.[0] ? `${course.upcomingBatches[0].startDate} • ${course.upcomingBatches[0].mode}` : 'No batches'}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: '700' }}>₹{course.fees.toLocaleString('en-IN')}</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{course.isGstIncluded ? 'Incl. GST' : '+ GST'}</div>
                  </td>
                  <td>
                    <div className="action-btns" style={{ justifyContent: 'center' }}>
                      <button className="btn-edit" onClick={() => openEdit(course)}>Edit</button>
                      <button className="btn-danger" onClick={() => handleDelete(course._id)}><i className="fa-solid fa-trash"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </div>

        {mediaModal.show && (
          <MediaLibraryModal 
            token={token}
            type="pdf"
            onClose={() => setMediaModal({ show: false, target: null, batchIndex: null })}
            onSelect={handleMediaSelect}
          />
        )}
      </div>
  );
};

export default AdminCourses;
