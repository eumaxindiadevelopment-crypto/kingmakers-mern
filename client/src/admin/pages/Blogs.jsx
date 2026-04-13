import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Editor } from '@tinymce/tinymce-react';
import MediaLibraryModal from '../components/MediaLibraryModal';

import API from '../../apiConfig';

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  author: 'Kingmakers IAS Academy',
  image: '',
  category: 'Uncategorized',
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
  focusKeyword: '',
  faqs: [],
  isPublished: true,
};

// Dynamic categories fetched from backend

const autoSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const Blogs = () => {
  const { admin } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // View state: 'list' | 'editor' | 'categories'
  const [view, setView] = useState('list');
  const [activeTab, setActiveTab] = useState('content'); // content, seo, analysis
  const [seoScore, setSeoScore] = useState(0);
  const [seoChecks, setSeoChecks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  // Categories state
  const [categories, setCategories] = useState([]);
  const [catForm, setCatForm] = useState({ name: '', slug: '', description: '' });
  const [catEditId, setCatEditId] = useState(null);
  const [catLoading, setCatLoading] = useState(false);

  // Filters
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Quick-edit
  const [quickEditId, setQuickEditId] = useState(null);
  const [quickForm, setQuickForm] = useState({});

  // Hover row
  const [hoveredId, setHoveredId] = useState(null);

  // Media picker
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  const token = admin?.token;
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const titleRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await fetch(`${API}/api/blogs`);
    const data = await res.json();
    setBlogs(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const res = await fetch(`${API}/api/categories`);
    const data = await res.json();
    setCategories(Array.isArray(data) ? data : []);
  };


  // SEO Analysis Logic (Rank Math Style)
  const analyzeSEO = useCallback((data) => {
    if (!data.focusKeyword) {
      setSeoScore(0);
      setSeoChecks([]);
      return;
    }

    const keyword = data.focusKeyword.toLowerCase();
    const title = (data.title || '').toLowerCase();
    const seoTitle = (data.seoTitle || '').toLowerCase();
    const seoDesc = (data.seoDescription || '').toLowerCase();
    const content = (data.content || '').toLowerCase();
    const slug = (data.slug || '').toLowerCase();

    let score = 0;
    const checks = [];

    // 1. Focus Keyword in Title
    const inTitle = title.includes(keyword) || seoTitle.includes(keyword);
    checks.push({ label: 'Focus Keyword in Title', status: inTitle });
    if (inTitle) score += 20;

    // 2. Focus Keyword in SEO Meta Description
    const inDesc = seoDesc.includes(keyword);
    checks.push({ label: 'Focus Keyword in Meta Description', status: inDesc });
    if (inDesc) score += 15;

    // 3. Focus Keyword in URL Slug
    const inSlug = slug.includes(keyword.replace(/\s+/g, '-'));
    checks.push({ label: 'Focus Keyword in URL Slug', status: inSlug });
    if (inSlug) score += 10;

    // 4. Focus Keyword in First Paragraph (approx)
    const inStart = content.substring(0, 500).includes(keyword);
    checks.push({ label: 'Focus Keyword in Introduction', status: inStart });
    if (inStart) score += 10;

    // 5. Content Length
    const wordCount = content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
    const lengthOk = wordCount >= 600;
    checks.push({ label: `Content Length (${wordCount} words)`, status: lengthOk });
    if (lengthOk) score += 20;
    else if (wordCount > 300) score += 10;

    // 6. Keyword Density
    const escapedKeyword = escapeRegExp(keyword);
    const keywordCount = (content.match(new RegExp(escapedKeyword, 'g')) || []).length;
    const density = (keywordCount / wordCount) * 100;
    const densityOk = density >= 0.5 && density <= 2.5;
    checks.push({ label: `Keyword Density (${density.toFixed(2)}%)`, status: densityOk });
    if (densityOk) score += 15;

    // 7. Use of Headings
    const hasHeadings = /<h[2-3]/.test(content);
    checks.push({ label: 'Use of H2/H3 Headings', status: hasHeadings });
    if (hasHeadings) score += 10;

    setSeoScore(Math.min(score, 100));
    setSeoChecks(checks);
  }, []);

  useEffect(() => { 
    fetchBlogs(); 
    fetchCategories(); 
  }, []);

  useEffect(() => {
    if (view === 'editor') {
      analyzeSEO(form);
    }
  }, [form, view, analyzeSEO]);

  // Focus title when editor opens
  useEffect(() => {
    if (view === 'editor' && titleRef.current) titleRef.current.focus();
  }, [view]);

  // Handle URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const action = params.get('action');
    if (action === 'new') {
      openNew();
    } else if (!action && !editId) {
      setView('list');
    }
  }, [location.search]);

  const filtered = blogs.filter((b) => {
    // Status Filter
    const matchStatus =
      filterStatus === 'all' ||
      (filterStatus === 'published' && b.isPublished) ||
      (filterStatus === 'draft' && !b.isPublished);

    // Search Filter
    const matchSearch =
      !search ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());

    // Category Filter
    const matchCategory = 
      categoryFilter === 'all' || b.category === categoryFilter;

    // Date Filter
    const createdAt = b.createdAt ? new Date(b.createdAt) : new Date(0);
    const dateOk = (!startDate || createdAt >= new Date(startDate)) && 
                   (!endDate || createdAt <= new Date(endDate));

    return matchStatus && matchSearch && matchCategory && dateOk;
  }).sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const counts = {
    all: blogs.length,
    published: blogs.filter((b) => b.isPublished).length,
    draft: blogs.filter((b) => !b.isPublished).length,
  };

  // ─── CRUD ────────────────────────────────────────────────────
  const openNew = () => {
    setForm(emptyForm);
    setEditId(null);
    setSaveMsg('');
    setView('editor');
  };

  const openEdit = (blog) => {
    setForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      image: blog.image || '',
      category: blog.category || 'Uncategorized',
      seoTitle: blog.seoTitle || '',
      seoDescription: blog.seoDescription || '',
      seoKeywords: blog.seoKeywords || '',
      focusKeyword: blog.focusKeyword || '',
      faqs: blog.faqs || [],
      isPublished: blog.isPublished,
    });
    setEditId(blog._id);
    setSaveMsg('');
    setView('editor');
  };

  const handleSave = async (published) => {
    // Basic validation
    if (!form.title || !form.content) {
      setSaveMsg('Title and Content are required.');
      return;
    }
    
    // Validate FAQs
    if (form.faqs && form.faqs.some(faq => !faq.question.trim() || !faq.answer.trim())) {
      setSaveMsg('Please fill in all FAQ questions and answers.');
      return;
    }

    setSaving(true);
    setSaveMsg('');
    const payload = { ...form, isPublished: published };
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API}/api/blogs/${editId}` : `${API}/api/blogs`;
    const res = await fetch(url, { method, headers, body: JSON.stringify(payload) });
    
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      alert(`Error saving post: ${errData.message || 'Server error'}`);
      setSaving(false);
      return;
    }

    setSaveMsg(published ? 'Published!' : 'Saved as Draft');
    setSaving(false);
    await fetchBlogs();
    setTimeout(() => {
      setSaveMsg('');
      setView('list');
    }, 900);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Move this post to trash?')) return;
    await fetch(`${API}/api/blogs/${id}`, { method: 'DELETE', headers });
    setBlogs((prev) => prev.filter((b) => b._id !== id));
  };

  // Quick-edit helpers
  const openQuickEdit = (blog) => {
    setQuickEditId(blog._id);
    setQuickForm({ 
      title: blog.title, 
      slug: blog.slug, 
      author: blog.author, 
      category: blog.category || 'Uncategorized',
      isPublished: blog.isPublished 
    });
  };

  const saveQuickEdit = async () => {
    await fetch(`${API}/api/blogs/${quickEditId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(quickForm),
    });
    setQuickEditId(null);
    fetchBlogs();
  };

  // ─── CATEGORIES HANDLERS ─────────────────────────────────────
  const handleCatSubmit = async (e) => {
    e.preventDefault();
    setCatLoading(true);
    const method = catEditId ? 'PUT' : 'POST';
    const url = catEditId ? `${API}/api/categories/${catEditId}` : `${API}/api/categories`;
    const res = await fetch(url, { method, headers, body: JSON.stringify(catForm) });
    if(res.ok) {
      setCatForm({ name: '', slug: '', description: '' });
      setCatEditId(null);
      await fetchCategories();
    } else {
      const data = await res.json();
      alert(data.message);
    }
    setCatLoading(false);
  };

  const handleCatEdit = (cat) => {
    setCatForm({ name: cat.name, slug: cat.slug, description: cat.description });
    setCatEditId(cat._id);
  };

  const handleCatDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    await fetch(`${API}/api/categories/${id}`, { method: 'DELETE', headers });
    await fetchCategories();
    fetchBlogs(); // Refresh blogs in case they were reassigned
  };

  // ─── EDITOR VIEW ─────────────────────────────────────────────
  if (view === 'editor') {
    return (
      <>
      <div className="wp-editor-page">
        {/* Top bar */}
        <div className="wp-editor-topbar">
          <button className="wp-back-btn" onClick={() => {
            setView('list');
            navigate('/admin/blogs');
          }}>
            ← All Posts
          </button>
          <span className="wp-editor-post-title-preview">
            {editId ? 'Edit Post' : 'Add New Post'}
          </span>
          <div className="wp-editor-topbar-actions">
            {saveMsg && <span className="wp-save-msg">{saveMsg}</span>}
            <button
              className="wp-btn-draft"
              disabled={saving}
              onClick={() => handleSave(false)}
            >
              Save Draft
            </button>
            <button
              className="wp-btn-publish"
              disabled={saving}
              onClick={() => handleSave(true)}
            >
              {saving ? 'Publishing…' : form.isPublished ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>

        {/* Editor body */}
        <div className="wp-editor-body">
          {/* Main column */}
          <div className="wp-editor-main">
            <input
              ref={titleRef}
              className="wp-title-input"
              placeholder="Add title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value, slug: autoSlug(e.target.value) })
              }
            />
            <div className="wp-permalink-row">
              <span className="wp-permalink-label">Permalink:</span>
              <span className="wp-permalink-slug">/{form.slug || 'post-slug'}</span>
              <span className="wp-permalink-edit-hint">(auto-generated)</span>
            </div>

            <div className="wp-content-box">
              <Editor
                tinymceScriptSrc="/tinymce/tinymce.min.js"
                value={form.content}
                onEditorChange={(content) => setForm(f => ({ ...f, content }))}
                init={{
                  license_key: 'gpl',
                  height: 500,
                  menubar: false,
                  branding: false,
                  promotion: false,
                  resize: true,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                    'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'help', 'wordcount'
                  ],
                  toolbar:
                    'styleselect fontselect fontsizeselect styles fontfamily fontsize blocks | bold italic underline strikethrough forecolor backcolor | bullist numlist blockquote | '
                    + 'alignleft aligncenter alignright alignjustify | '
                    + 'link unlink image media table | removeformat | code fullscreen | help',
                  block_formats:
                    'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;Preformatted=pre',
                  content_style:
                    'body { font-family: Georgia, "Times New Roman", Times, serif; font-size: 16px; line-height: 1.8; max-width: 100%; padding: 20px; } ' +
                    'iframe { max-width: 100%; min-height: 360px; border: 0; background: #eee; }',
                  skin: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide',
                  content_css: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default',
                  image_advtab: true,
                  image_uploadtab: true,
                  file_picker_types: 'image',
                  automatic_uploads: false,
                  media_live_embeds: true,
                  extended_valid_elements: 'iframe[src|title|width|height|allow|allowfullscreen|frameborder|scrolling|style]',
                  relative_urls: false,
                  remove_script_host: false,
                  convert_urls: false,
                  iframe_aria_text: 'Embedded Video'
                }}
              />
            </div>

            <div className="wp-meta-box">
              <div className="wp-metabox-title">Excerpt</div>
              <textarea
                className="wp-excerpt-textarea"
                placeholder="Write a brief excerpt (optional)…"
                value={form.excerpt}
                rows={3}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              />
              <p className="wp-hint">Excerpts are optional hand-crafted summaries of your content.</p>
            </div>

            {/* Rank Math Style SEO Meta Box */}
            <div className="wp-meta-box" style={{ marginTop: '1.5rem' }}>
              <div className="wp-metabox-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>📈</span> SEO Power-Up
                </span>
                <div className={`wp-seo-score-badge ${seoScore > 80 ? 'wp-seo-score-green' : seoScore > 50 ? 'wp-seo-score-orange' : 'wp-seo-score-red'}`}>
                  Score: {seoScore}/100
                </div>
              </div>
              
              <div className="wp-metabox-body">
                {/* Tabs */}
                <div className="wp-seo-tabs">
                  <div className={`wp-seo-tab ${activeTab === 'seo' ? 'active' : ''}`} onClick={() => setActiveTab('seo')}>General</div>
                  <div className={`wp-seo-tab ${activeTab === 'analysis' ? 'active' : ''}`} onClick={() => setActiveTab('analysis')}>SEO Analysis</div>
                </div>

                {activeTab === 'seo' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="wp-qe-field">
                      <label>Focus Keyword</label>
                      <input 
                        placeholder="e.g. Best IAS Academy in Chennai" 
                        value={form.focusKeyword}
                        onChange={(e) => setForm({ ...form, focusKeyword: e.target.value })}
                        style={{ border: '2px solid var(--admin-accent)', fontWeight: '600' }}
                      />
                      <p className="wp-hint">The main topic you want this post to rank for.</p>
                    </div>

                    <div className="wp-qe-field">
                      <div className="wp-qe-label-row">
                        <label>SEO Title</label>
                        <span className={`wp-count-text ${form.seoTitle.length >= 50 && form.seoTitle.length <= 60 ? 'wp-count-ok' : 'wp-count-warn'}`}>
                          {form.seoTitle.length} / 60
                        </span>
                      </div>
                      <input 
                        placeholder="Snippet preview title..." 
                        value={form.seoTitle}
                        onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                      />
                      <div className="wp-seo-indicator-bar">
                        <div 
                          className="wp-seo-indicator-fill" 
                          style={{ 
                            width: `${Math.min((form.seoTitle.length / 60) * 100, 100)}%`,
                            backgroundColor: form.seoTitle.length >= 50 && form.seoTitle.length <= 60 ? '#10b981' : '#f59e0b'
                          }}
                        ></div>
                      </div>
                      <p className="wp-hint">Optimal: 50–60 characters.</p>
                    </div>

                    <div className="wp-qe-field">
                      <div className="wp-qe-label-row">
                        <label>SEO Meta Description</label>
                        <span className={`wp-count-text ${form.seoDescription.length >= 120 && form.seoDescription.length <= 160 ? 'wp-count-ok' : 'wp-count-warn'}`}>
                          {form.seoDescription.length} / 160
                        </span>
                      </div>
                      <textarea 
                        placeholder="Write a compelling summary..." 
                        value={form.seoDescription}
                        rows={3}
                        onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                        style={{ padding: '0.75rem', background: 'var(--admin-surface2)', border: '1px solid var(--admin-border)', borderRadius: '6px', color: 'var(--admin-text)', width: '100%' }}
                      />
                      <div className="wp-seo-indicator-bar">
                        <div 
                          className="wp-seo-indicator-fill" 
                          style={{ 
                            width: `${Math.min((form.seoDescription.length / 160) * 100, 100)}%`,
                            backgroundColor: form.seoDescription.length >= 120 && form.seoDescription.length <= 160 ? '#10b981' : '#f59e0b'
                          }}
                        ></div>
                      </div>
                      <p className="wp-hint">Optimal: 120–160 characters.</p>
                    </div>

                    {/* Google Snippet Preview */}
                    <div className="wp-meta-box" style={{ background: '#f8f9fa', border: 'none', padding: '1rem' }}>
                      <label style={{ color: '#5f6368', fontSize: '0.8rem', marginBottom: '0.75rem', display: 'block' }}>Desktop Preview</label>
                      <div className="wp-google-preview">
                        <div className="wp-google-url">
                          https://kingmakersiasacademy.com › blogs › {form.slug || 'post-slug'}
                        </div>
                        <div className="wp-google-title">
                          {form.seoTitle || form.title || 'Post Title Preview'}
                        </div>
                        <div className="wp-google-desc">
                          {form.seoDescription || 'Provide a meta description by editing it above. If you don’t, Google will try to find a relevant part of your post to show in the search results.'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'analysis' && (
                  <div className="wp-seo-analysis-panel">
                    <p className="wp-hint" style={{ marginBottom: '1rem' }}>
                      Analyze how well your post is optimized for the keyword: <strong>{form.focusKeyword || '(Set a focus keyword first)'}</strong>
                    </p>
                    <div className="wp-seo-checklist">
                      {seoChecks.map((check, i) => (
                        <div key={i} className="wp-seo-check-item">
                          <span className={`wp-seo-check-icon ${check.status ? 'wp-seo-check-pass' : 'wp-seo-check-fail'}`}>
                            {check.status ? '✓' : '✗'}
                          </span>
                          <span style={{ color: check.status ? 'var(--admin-text)' : 'var(--admin-text-muted)' }}>
                            {check.label}
                          </span>
                        </div>
                      ))}
                    </div>
                    {seoScore < 100 && (
                      <p style={{ fontSize: '0.8rem', color: 'var(--admin-accent)', marginTop: '1rem' }}>
                        💡 Tip: Fix the items marked with ✗ to improve your IAS blog visibility!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* FAQ Meta Box */}
            <div className="wp-meta-box" style={{ marginTop: '1.5rem' }}>
              <div className="wp-metabox-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>❓</span> FAQ Section
                </span>
                <button 
                  type="button" 
                  className="wp-btn-add-faq"
                  onClick={() => setForm({ ...form, faqs: [...(form.faqs || []), { question: '', answer: '' }] })}
                  style={{ background: 'var(--admin-accent)', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  + Add FAQ
                </button>
              </div>
              <div className="wp-metabox-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {(form.faqs || []).length === 0 ? (
                  <p className="wp-hint" style={{ textAlign: 'center', padding: '1rem' }}>No FAQs added yet. Click "Add FAQ" to start.</p>
                ) : (
                  form.faqs.map((faq, index) => (
                    <div key={index} className="wp-faq-item" style={{ border: '1px solid var(--admin-border)', padding: '1rem', borderRadius: '6px', position: 'relative', background: 'var(--admin-surface2)' }}>
                      <button 
                        type="button" 
                        onClick={() => {
                          const newFaqs = [...form.faqs];
                          newFaqs.splice(index, 1);
                          setForm({ ...form, faqs: newFaqs });
                        }}
                        style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}
                        title="Remove FAQ"
                      >
                        ✕
                      </button>
                      <div className="wp-qe-field" style={{ marginBottom: '1rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.4rem', display: 'block' }}>Question {index + 1}</label>
                        <input 
                          placeholder="Enter question..." 
                          value={faq.question}
                          onChange={(e) => {
                            const newFaqs = [...form.faqs];
                            const updatedFaq = { ...newFaqs[index], question: e.target.value };
                            newFaqs[index] = updatedFaq;
                            setForm({ ...form, faqs: newFaqs });
                          }}
                        />
                      </div>
                      <div className="wp-qe-field">
                        <label style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.4rem', display: 'block' }}>Answer {index + 1}</label>
                        <textarea 
                          placeholder="Enter answer..." 
                          value={faq.answer}
                          rows={3}
                          onChange={(e) => {
                            const newFaqs = [...form.faqs];
                            const updatedFaq = { ...newFaqs[index], answer: e.target.value };
                            newFaqs[index] = updatedFaq;
                            setForm({ ...form, faqs: newFaqs });
                          }}
                          style={{ padding: '0.75rem', background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: '6px', color: 'var(--admin-text)', width: '100%', fontFamily: 'inherit' }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>


          {/* Sidebar */}
          <div className="wp-editor-sidebar">
            {/* Publish box */}
            <div className="wp-meta-box">
              <div className="wp-metabox-title">Publish</div>
              <div className="wp-metabox-body">
                <div className="wp-publish-row">
                  <span>Status:</span>
                  <select
                    value={form.isPublished ? 'published' : 'draft'}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.value === 'published' })}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div className="wp-publish-row">
                  <span>Visibility:</span>
                  <span className="wp-visibility-val">Public</span>
                </div>
                <div className="wp-publish-actions">
                  <button className="wp-btn-trash-sm" onClick={() => editId && handleDelete(editId)}>
                    Move to Trash
                  </button>
                  <button className="wp-btn-publish-sm" disabled={saving} onClick={() => handleSave(form.isPublished)}>
                    {saving ? 'Saving…' : editId ? 'Update' : 'Publish'}
                  </button>
                </div>
              </div>
            </div>

            {/* Categories box */}
            <div className="wp-meta-box">
              <div className="wp-metabox-title">Categories</div>
              <div className="wp-metabox-body">
                <div className="wp-categories-list" style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid var(--admin-surface2)', padding: '0.5rem', borderRadius: '6px' }}>
                  {categories.map(cat => (
                    <div key={cat._id} style={{ marginBottom: '0.4rem' }}>
                      <label style={{ fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input 
                          type="radio" 
                          name="category" 
                          value={cat.name} 
                          checked={form.category === cat.name}
                          onChange={(e) => setForm({ ...form, category: e.target.value })}
                        />
                        {cat.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="wp-meta-box">
              <div className="wp-metabox-title">Featured Image</div>
              <div className="wp-metabox-body">
                {form.image ? (
                  <div className="wp-featured-image-wrap">
                    <img
                      src={form.image}
                      alt="featured"
                      className="wp-featured-preview"
                      onClick={() => setMediaPickerOpen(true)}
                      title="Click to change image"
                      style={{ cursor: 'pointer', display: 'block', width: '100%', borderRadius: '4px' }}
                    />
                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', color: 'var(--admin-accent)' }}>
                      Click the image to edit or update
                    </p>
                    <button
                      type="button"
                      className="wp-remove-image-btn"
                      onClick={() => setForm({ ...form, image: '' })}
                    >
                      Remove featured image
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="wp-set-image-btn"
                    onClick={() => setMediaPickerOpen(true)}
                  >
                    🖼️ Set featured image
                  </button>
                )}
              </div>
            </div>

            {/* Author */}
            <div className="wp-meta-box">
              <div className="wp-metabox-title">Author</div>
              <div className="wp-metabox-body">
                <input
                  className="wp-author-input"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                />
              </div>
            </div>

            {/* Slug */}
            <div className="wp-meta-box">
              <div className="wp-metabox-title">Slug</div>
              <div className="wp-metabox-body">
                <input
                  className="wp-author-input"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MEDIA PICKER MODAL ─── */}
      {mediaPickerOpen && (
        <MediaLibraryModal 
          token={admin?.token}
          onClose={() => setMediaPickerOpen(false)}
          onSelect={(item) => {
            setForm({ ...form, image: item.url });
            setMediaPickerOpen(false);
          }}
        />
      )}
      </>
    );
  }

  // ─── LIST VIEW ───────────────────────────────────────────────
  return (
    <div className="admin-page">
      {/* Breadcrumbs */}
      <div className="events-breadcrumb">
        <span>Dashboard</span>
        <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.7rem' }}></i>
        <span>Posts</span>
        <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.7rem' }}></i>
        <span className="active">All Posts</span>
      </div>

      <div className="events-page-header">
        <div className="events-title-area">
          <h2>All Posts</h2>
          <p>Manage and display your website blog posts.</p>
        </div>
        <button 
          className="btn-add-event" 
          onClick={openNew}
        >
          <i className="fa-solid fa-plus"></i> Add New Post
        </button>
      </div>

      {/* Filter Bar */}
      <div className="events-filter-bar">
        <div className="filter-group">
          <select 
            className="filter-select"
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="filter-group">
          <select 
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group" style={{ display: 'flex', gap: '0.5rem', background: 'none', border: 'none' }}>
           <input 
             type="date" 
             className="filter-select" 
             placeholder="Start Date"
             value={startDate}
             onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
             style={{ background: 'var(--admin-surface2)', border: '1px solid var(--admin-border)', borderRadius: '8px' }}
           />
           <input 
             type="date" 
             className="filter-select" 
             placeholder="End Date"
             value={endDate}
             onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
             style={{ background: 'var(--admin-surface2)', border: '1px solid var(--admin-border)', borderRadius: '8px' }}
           />
        </div>

        <div className="search-wrapper">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Search posts..." 
            className="search-input"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        <button className="btn-reset" onClick={() => { 
          setSearch(''); 
          setFilterStatus('all'); 
          setCategoryFilter('all');
          setStartDate('');
          setEndDate('');
          setPage(1); 
        }}>
          Reset
        </button>
      </div>

      <div className="events-table-card">
        {loading ? (
          <div className="admin-loading"><div className="admin-spinner"></div></div>
        ) : paginated.length === 0 ? (
          <div className="wp-empty-state" style={{ padding: '60px 20px' }}>
            <i className="fa-solid fa-file-circle-xmark" style={{ fontSize: '3rem', opacity: 0.2, marginBottom: '1rem', display: 'block' }}></i>
            <p>No posts found matching your filters.</p>
            <button className="btn-add-event" style={{ margin: '1rem auto' }} onClick={openNew}>Add New Post</button>
          </div>
        ) : (
          <>
            <table className="events-table">
              <thead>
                <tr>
                  <th className="checkbox-col"><input type="checkbox" className="custom-checkbox" /></th>
                  <th style={{ width: '50px' }}>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((blog, idx) => (
                  <tr key={blog._id}>
                    <td><input type="checkbox" className="custom-checkbox" /></td>
                    <td>{(page - 1) * perPage + idx + 1}</td>
                    <td>
                      <div className="event-cell-info">
                        <img 
                          src={blog.image || '/images/placeholder.jpg'} 
                          alt={blog.title} 
                          className="event-cell-thumb" 
                        />
                        <div className="event-cell-brand">
                           <div className="event-cell-title" style={{ cursor: 'pointer' }} onClick={() => openEdit(blog)}>{blog.title}</div>
                           <small style={{ color: 'var(--admin-text-muted)', display: 'block', marginTop: '4px' }}>{blog.category || 'Uncategorized'}</small>
                        </div>
                      </div>
                    </td>
                    <td><span style={{ fontSize: '0.9rem' }}>{blog.author}</span></td>
                    <td>
                      <span className={`status-badge ${blog.isPublished ? 'status-published' : 'status-draft'}`}>
                        {blog.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>
                         <div style={{ fontWeight: '500' }}>{new Date(blog.updatedAt || blog.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                         <small style={{ color: 'var(--admin-text-muted)' }}>{blog.isPublished ? 'Published' : 'Last Edit'}</small>
                      </div>
                    </td>
                    <td>
                      <div className="action-btns" style={{ justifyContent: 'center' }}>
                        <button className="btn-edit-purple" onClick={() => openEdit(blog)}>Edit</button>
                        <button 
                          className="btn-delete-red"
                          onClick={() => handleDelete(blog._id)}
                        >
                          <i className="fa-regular fa-trash-can"></i>
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
                Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of {filtered.length} entries
                <select 
                  className="pg-per-page"
                  value={perPage}
                  onChange={(e) => { setPerPage(parseInt(e.target.value)); setPage(1); }}
                >
                  <option value="10">10 per page</option>
                  <option value="25">25 per page</option>
                  <option value="50">50 per page</option>
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
                   (i + 1 === 1 || i + 1 === totalPages || (i + 1 >= page - 2 && i + 1 <= page + 2)) ? (
                    <button 
                      key={i + 1} 
                      className={`pg-btn ${page === i + 1 ? 'active' : ''}`}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                   ) : (i + 1 === page - 3 || i + 1 === page + 3) ? <span key={i} style={{ color: 'var(--admin-text-muted)' }}>...</span> : null
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
    </div>
  );
};

export default Blogs;
