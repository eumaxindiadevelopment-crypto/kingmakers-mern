import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import API from '../../apiConfig';

const Media = () => {
  const { admin } = useAuth();
  const location = useLocation();
  const [view, setView] = useState('library'); // 'library' | 'upload'
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [uploadStatus, setUploadStatus] = useState({ active: false, current: 0, total: 0 });
  const [dragActive, setDragActive] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const fileInputRef = useRef(null);

  const token = admin?.token;
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const action = params.get('action');
    if (action === 'upload') {
      setView('upload');
    } else {
      setView('library');
    }
  }, [location.search]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/media`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setMediaItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const processFiles = async (files) => {
    if (!files || files.length === 0) return;
    
    const fileList = Array.from(files);
    setUploadStatus({ active: true, current: 0, total: fileList.length });

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      setUploadStatus(prev => ({ ...prev, current: i + 1 }));

      if (file.size < 1024) continue; // Skip too small files

      const formData = new FormData();
      formData.append('file', file);

      try {
        await fetch(`${API}/api/media`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });
      } catch (err) {
        console.error(`Upload failed for ${file.name}`, err);
      }
    }

    setUploadStatus({ active: false, current: 0, total: 0 });
    setView('library');
    fetchMedia();
  };

  const handleUpload = (e) => {
    processFiles(e.target.files);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to permanently delete this media file?')) return;
    
    try {
      await fetch(`${API}/api/media/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      fetchMedia();
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert('Image URL copied to clipboard!');
  };

  const handleUpdateMedia = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/media/${selectedMedia._id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          altText: selectedMedia.altText,
          title: selectedMedia.title,
          caption: selectedMedia.caption,
          description: selectedMedia.description
        })
      });
      if (res.ok) {
        fetchMedia(); // Refresh list to get updated data
        alert('Attachment details saved!');
      } else {
        alert('Failed to save details.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="wp-posts-page admin-media-page">
      <div className="wp-page-heading" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <h1 className="wp-page-title">Media Library</h1>
        {view === 'library' ? (
          <button className="wp-add-new-btn" onClick={() => setView('upload')}>
            Add New
          </button>
        ) : (
          <button className="wp-add-new-btn" style={{ background: '#f8f9fa', color: '#1B365D', border: '1px solid #c3c4c7' }} onClick={() => setView('library')}>
            Cancel Upload
          </button>
        )}
      </div>

      {view === 'upload' ? (
        <div className="wp-media-upload-area">
          <div 
            className={`wp-dropzone ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            style={dragActive ? { borderColor: '#DAA520', backgroundColor: '#fdfdfc' } : {}}
          >
            <h2>Drop files to upload</h2>
            <p>or</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleUpload}
              accept="image/*,application/pdf,video/*"
              multiple
            />
            <button 
              className="wp-btn-publish" 
              onClick={() => fileInputRef.current.click()}
              disabled={uploadStatus.active}
            >
              {uploadStatus.active 
                ? `Uploading ${uploadStatus.current} of ${uploadStatus.total}...` 
                : 'Select Files'}
            </button>
            <p className="wp-hint mt-2">Maximum upload file size: 10 MB.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="wp-toolbar" style={{ marginBottom: '1rem' }}>
            <div className="wp-search-box">
              <span className="wp-search-icon">🔍</span>
              <input className="wp-search-input" placeholder="Search media items..." />
            </div>
          </div>

          {loading ? (
            <div className="admin-loading"><div className="admin-spinner" /></div>
          ) : mediaItems.length === 0 ? (
            <div className="wp-empty-state">
              <div className="wp-empty-icon">🖼️</div>
              <p>No media files found.</p>
              <button className="wp-btn-publish" onClick={() => setView('upload')}>
                Upload your first image
              </button>
            </div>
          ) : (
            <div className="wp-media-grid">
              {mediaItems.map(item => (
                <div key={item._id} className="wp-media-item" onClick={() => setSelectedMedia(item)}>
                  {item.mimetype.startsWith('image/') ? (
                    <img src={item.url} alt={item.originalName} className="wp-media-thumbnail" />
                  ) : (
                    <div className="wp-media-document-icon">📄<br/><span style={{fontSize: '0.75rem', wordBreak: 'break-all'}}>{item.originalName}</span></div>
                  )}
                  
                  <div className="wp-media-overlay">
                    <button className="wp-media-delete-btn" onClick={(e) => handleDelete(item._id, e)}>Delete</button>
                    <span className="wp-media-copy-hint">Click to view details</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Attachment Details Modal */}
      {selectedMedia && (
        <div className="wp-attachment-backdrop" onClick={() => setSelectedMedia(null)}>
          <div className="wp-attachment-modal" onClick={e => e.stopPropagation()}>
            <div className="wp-modal-header">
              <h2>Attachment details</h2>
              <button className="wp-modal-close" onClick={() => setSelectedMedia(null)}>×</button>
            </div>
            
            <div className="wp-modal-body">
              {/* Left Column - Preview */}
              <div className="wp-modal-preview">
                {selectedMedia.mimetype.startsWith('image/') ? (
                  <img src={selectedMedia.url} alt={selectedMedia.title} className="wp-preview-img" />
                ) : selectedMedia.mimetype.startsWith('video/') ? (
                  <video src={selectedMedia.url} controls className="wp-preview-video" />
                ) : (
                  <div className="wp-preview-document">📄<br/>{selectedMedia.originalName}</div>
                )}
              </div>

              {/* Right Column - Details & Form */}
              <div className="wp-modal-sidebar">
                <div className="wp-modal-meta">
                  <p><strong>Uploaded on:</strong> {new Date(selectedMedia.createdAt).toLocaleDateString()}</p>
                  <p><strong>File name:</strong> {selectedMedia.filename}</p>
                  <p><strong>File type:</strong> {selectedMedia.mimetype}</p>
                  <p><strong>File size:</strong> {(selectedMedia.size / 1024).toFixed(0)} KB</p>
                </div>

                <hr className="wp-modal-divider" />

                <form className="wp-attachment-form" onSubmit={handleUpdateMedia}>
                  <div className="wp-form-group">
                    <label>Alternative Text</label>
                    <input 
                      type="text" 
                      value={selectedMedia.altText} 
                      onChange={e => setSelectedMedia({...selectedMedia, altText: e.target.value})} 
                    />
                    <small>Learn how to describe the purpose of the image. Leave empty if the image is purely decorative.</small>
                  </div>
                  
                  <div className="wp-form-group">
                    <label>Title</label>
                    <input 
                      type="text" 
                      value={selectedMedia.title} 
                      onChange={e => setSelectedMedia({...selectedMedia, title: e.target.value})} 
                    />
                  </div>

                  <div className="wp-form-group">
                    <label>Caption</label>
                    <textarea 
                      rows="2"
                      value={selectedMedia.caption} 
                      onChange={e => setSelectedMedia({...selectedMedia, caption: e.target.value})} 
                    ></textarea>
                  </div>

                  <div className="wp-form-group">
                    <label>Description</label>
                    <textarea 
                      rows="3"
                      value={selectedMedia.description} 
                      onChange={e => setSelectedMedia({...selectedMedia, description: e.target.value})} 
                    ></textarea>
                  </div>

                  <div className="wp-form-group">
                    <label>File URL</label>
                    <input type="text" value={selectedMedia.url} readOnly />
                    <button type="button" className="wp-btn-copy" onClick={() => copyToClipboard(selectedMedia.url)}>Copy URL to clipboard</button>
                  </div>

                  <div className="wp-modal-actions">
                    <button type="submit" className="wp-btn-publish">Save Changes</button>
                    <button 
                      type="button" 
                      className="wp-btn-trash-sm"
                      onClick={(e) => {
                        handleDelete(selectedMedia._id, e);
                        setSelectedMedia(null);
                      }}
                    >
                      Delete permanently
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;
