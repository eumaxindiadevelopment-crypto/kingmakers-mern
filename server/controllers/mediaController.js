const fs = require('fs');
const path = require('path');
const { getPool } = require('../config/db');

const deserializeMedia = (row) => row ? {
    ...row,
    _id: row.id
} : row;

// @desc    Get all media files
// @route   GET /api/media
// @access  Private (Admin)
const getMedia = async (req, res) => {
    try {
        const pool = getPool();
        const [rows] = await pool.execute('SELECT * FROM media ORDER BY created_at DESC');
        res.json(rows.map(deserializeMedia));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Upload media file
// @route   POST /api/media
// @access  Private (Admin)
const uploadMedia = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
        const pool = getPool();

        const API_URL = process.env.NODE_ENV === 'production'
            ? 'https://kingmakersiasacademy.com'
            : 'http://localhost:5000';

        const date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const fileUrl = `${API_URL}/uploads/${year}/${month}/${req.file.filename}`;

        const id = require('crypto').randomUUID().replace(/-/g, '').substring(0, 24);
        await pool.execute(
            `INSERT INTO media (id, filename, originalName, url, mimetype, size, altText, title, caption, description, uploadedBy, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [
                id, req.file.filename, req.file.originalname, fileUrl,
                req.file.mimetype, req.file.size,
                '', req.file.originalname.split('.')[0], '', '',
                req.user ? req.user.id : null
            ]
        );
        const [rows] = await pool.execute('SELECT * FROM media WHERE id = ?', [id]);
        res.status(201).json(deserializeMedia(rows[0]));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update media metadata
// @route   PUT /api/media/:id
// @access  Private (Admin)
const updateMedia = async (req, res) => {
    try {
        const pool = getPool();
        const { altText, title, caption, description } = req.body;
        await pool.execute(
            `UPDATE media SET altText = COALESCE(?, altText), title = COALESCE(?, title),
                caption = COALESCE(?, caption), description = COALESCE(?, description), updatedAt = NOW()
             WHERE id = ?`,
            [altText ?? null, title ?? null, caption ?? null, description ?? null, req.params.id]
        );
        const [rows] = await pool.execute('SELECT * FROM media WHERE id = ?', [req.params.id]);
        if (!rows[0]) return res.status(404).json({ message: 'Media not found' });
        res.json(deserializeMedia(rows[0]));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete media file
// @route   DELETE /api/media/:id
// @access  Private (Admin)
const deleteMedia = async (req, res) => {
    try {
        const pool = getPool();
        const [rows] = await pool.execute('SELECT * FROM media WHERE id = ?', [req.params.id]);
        if (!rows[0]) return res.status(404).json({ message: 'Media not found' });

        const media = rows[0];
        const urlParts = media.url.split('/uploads/');
        if (urlParts.length > 1) {
            const relativePath = urlParts[1];
            const filePath = path.join(__dirname, '..', 'uploads', ...relativePath.split('/'));
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        await pool.execute('DELETE FROM media WHERE id = ?', [req.params.id]);
        res.json({ message: 'Media removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMedia, uploadMedia, updateMedia, deleteMedia };
