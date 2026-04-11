import React, { useEffect, useState, useCallback, useRef } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const MediaLibraryModal = ({ token, onSelect, onClose, allowMultiple = false, type = 'image' }) => {
  const [view, setView] = useState('library'); // 'library' | 'upload'
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(allowMultiple ? [] : null);
  const [search, setSearch] = useState('');
  const [uploadStatus, setUploadStatus] = useState({ active: false, current: 0, total: 0 });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/media`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const filteredData = Array.isArray(data)
        ? data.filter((item) => {
            if (type === 'image') return item.mimetype && item.mimetype.startsWith('image/');
            if (type === 'pdf') return item.mimetype === 'application/pdf';
            return true; // 'all'
          })
        : [];
      setMediaItems(filteredData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleUpload = async (files) => {
    if (!files || files.length === 0) return;
    
    const fileList = Array.from(files);
    setUploadStatus({ active: true, current: 0, total: fileList.length });

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      setUploadStatus(prev => ({ ...prev, current: i + 1 }));

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch(`${API}/api/media`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        
        // If it's the only file or the last file, we might want to select it
        if (res.ok && i === fileList.length - 1) {
          const newItem = await res.json();
          if (allowMultiple) {
            setSelected(prev => Array.isArray(prev) ? [...prev, newItem] : [newItem]);
          } else {
            setSelected(newItem);
          }
        }
      } catch (err) {
        console.error(`Upload failed for ${file.name}`, err);
      }
    }

    await fetchMedia();
    setUploadStatus({ active: false, current: 0, total: 0 });
    setView('library');
  };

  const onFileChange = (e) => handleUpload(e.target.files);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files);
    }
  };

  const filteredItems = mediaItems.filter(item => 
    (item.originalName || item.filename || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item) => {
    if (allowMultiple) {
      const isSelected = selected.some(s => s._id === item._id);
      if (isSelected) {
        setSelected(selected.filter(s => s._id !== item._id));
      } else {
        setSelected([...selected, item]);
      }
    } else {
      setSelected(item);
    }
  };

  const handleConfirm = () => {
    if (allowMultiple) {
      if (selected.length > 0) onSelect(selected);
    } else {
      if (selected) onSelect(selected);
    }
  };

  return (
    <div className="media-lib-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="media-lib-modal wp-style">
        {/* Header */}
        <div className="media-lib-header">
          <div className="media-lib-title-tabs">
            <h3>Media Library</h3>
            <div className="media-lib-tabs">
              <button 
                className={`media-tab-btn ${view === 'upload' ? 'active' : ''}`}
                onClick={() => setView('upload')}
              >
                <i className="fa-solid fa-upload" style={{ marginRight: '6px' }}></i>
                Upload Files
              </button>
              <button 
                className={`media-tab-btn ${view === 'library' ? 'active' : ''}`}
                onClick={() => setView('library')}
              >
                <i className="fa-solid fa-images" style={{ marginRight: '6px' }}></i>
                Media Library
              </button>
            </div>
          </div>
          <button className="media-lib-close" onClick={onClose}>✕</button>
        </div>

        {/* Search & Tool Bar (Library only) */}
        {view === 'library' && (
          <div className="media-lib-toolbar">
            <div className="media-lib-search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input 
                type="text" 
                placeholder="Search media..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="media-lib-count">
              {filteredItems.length} items
            </div>
          </div>
        )}

        <div className="media-lib-main">
          {/* Left Side: Content Area */}
          <div className="media-lib-content-area">
            {view === 'upload' ? (
              <div 
                className={`media-lib-upload-zone ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="upload-zone-inner">
                  <div className="upload-icon">
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                  </div>
                  <h2>Drop files to upload</h2>
                  <p>or</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    onChange={onFileChange}
                    accept={type === 'image' ? "image/*" : type === 'pdf' ? ".pdf" : "*/*"}
                    multiple
                  />
                  <button 
                    className="sliders-media-pick-btn" 
                    style={{ width: 'auto' }}
                    onClick={() => fileInputRef.current.click()}
                    disabled={uploadStatus.active}
                  >
                    {uploadStatus.active 
                      ? `Uploading ${uploadStatus.current}/${uploadStatus.total}...` 
                      : 'Select Files'}
                  </button>
                  <p className="upload-hint">Maximum upload file size: 10 MB.</p>
                </div>
              </div>
            ) : (
              <div className="media-lib-body-scroll">
                {loading ? (
                  <div className="admin-loading"><div className="admin-spinner"></div></div>
                ) : filteredItems.length === 0 ? (
                  <div className="media-lib-empty">
                    {search ? 'No matches found for your search.' : 'No images found in the media library.'}
                  </div>
                ) : (
                  <div className="media-lib-grid">
                    {filteredItems.map((item) => {
                      const isSelected = allowMultiple 
                        ? selected.some(s => s._id === item._id)
                        : selected?._id === item._id;
                      
                      return (
                        <div
                          key={item._id}
                          className={`media-lib-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleSelect(item)}
                        >
                          {item.mimetype && item.mimetype.startsWith('image/') ? (
                            <img
                              src={item.url}
                              alt={item.altText || item.originalName}
                              className="media-lib-thumb"
                              onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
                            />
                          ) : (
                            <div className="media-lib-pdf-thumb" style={{
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: '#f1f5f9',
                              color: '#64748b',
                              fontSize: '0.8rem',
                              padding: '10px',
                              textAlign: 'center',
                              wordBreak: 'break-all'
                            }}>
                              <i className="fa-solid fa-file-pdf" style={{ fontSize: '2.5rem', color: '#ef4444', marginBottom: '8px' }}></i>
                              <span>{item.originalName || item.filename}</span>
                            </div>
                          )}
                          {isSelected && (
                            <div className="media-lib-check">
                              <i className="fa-solid fa-check"></i>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side: Details Sidebar (Library only) */}
          {view === 'library' && (
            <div className="media-lib-sidebar">
              <h3>ATTACHMENT DETAILS</h3>
              {(!allowMultiple && selected) ? (
                <div className="attachment-details">
                  <div className="attachment-preview-mini">
                    {selected.mimetype?.startsWith('image/') ? (
                      <img src={selected.url} alt="selected" />
                    ) : (
                      <div className="pdf-preview-mini" style={{ background: '#f8fafc', padding: '20px', textAlign: 'center' }}>
                         <i className="fa-solid fa-file-pdf" style={{ fontSize: '3rem', color: '#ef4444' }}></i>
                      </div>
                    )}
                  </div>
                  <div className="attachment-info-list">
                    <p><strong>File name:</strong> {selected.filename}</p>
                    <p><strong>File type:</strong> {selected.mimetype}</p>
                    <p><strong>Uploaded on:</strong> {new Date(selected.createdAt).toLocaleDateString()}</p>
                    <p><strong>File size:</strong> {(selected.size / 1024).toFixed(0)} KB</p>
                  </div>
                  <hr />
                  <div className="attachment-form-mini">
                    <div className="mini-field">
                      <label>Alt Text</label>
                      <input type="text" value={selected.altText || ''} readOnly />
                    </div>
                    <div className="mini-field">
                      <label>Title</label>
                      <input type="text" value={selected.title || selected.originalName || ''} readOnly />
                    </div>
                    <div className="mini-field">
                      <label>File URL</label>
                      <input type="text" value={selected.url} readOnly />
                      <button 
                        className="copy-url-btn"
                        onClick={() => {
                          navigator.clipboard.writeText(selected.url);
                          alert('URL copied!');
                        }}
                      >
                        Copy URL
                      </button>
                    </div>
                  </div>
                </div>
              ) : allowMultiple && selected.length > 0 ? (
                <div className="attachment-details-multi">
                  <p><strong>{selected.length}</strong> items selected</p>
                  <div className="multi-preview-stack">
                    {selected.slice(0, 5).map(s => (
                      <img key={s._id} src={s.url} alt="selected" className="stack-img" />
                    ))}
                    {selected.length > 5 && <span className="stack-more">+{selected.length - 5}</span>}
                  </div>
                  <button className="clear-selection-btn" onClick={() => setSelected([])}>Clear selection</button>
                </div>
              ) : (
                <div className="sidebar-placeholder">
                  {allowMultiple ? 'Select one or more images' : 'Click an image to view details'}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="media-lib-footer wp-style">
          <div className="media-lib-footer-left">
            {allowMultiple ? (
              selected.length > 0 && <span className="selection-label"><strong>{selected.length}</strong> items selected</span>
            ) : (
              selected && <span className="selection-label">Selected: <strong>{selected.originalName || selected.filename}</strong></span>
            )}
          </div>
          <div className="media-lib-footer-actions">
            <button className="sliders-cancel-btn" onClick={onClose}>Cancel</button>
            <button
              className="sliders-save-btn wp-style"
              onClick={handleConfirm}
              disabled={allowMultiple ? selected.length === 0 : !selected}
            >
              {allowMultiple ? `Insert ${selected.length} Items` : `Select ${type === 'image' ? 'Image' : type === 'pdf' ? 'PDF' : 'File'}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaLibraryModal;
