const { getPool } = require('../config/db');

const parseJSON = (val) => {
    if (typeof val === 'string') {
        try { return JSON.parse(val); } catch { return val; }
    }
    return val;
};

const deserializeEvent = (row) => {
    if (!row) return row;
    return {
        ...row,
        _id: row.id,
        gallery: parseJSON(row.gallery) || [],
        isActive: Boolean(row.isActive || row.is_active),
    };
};

// @desc    Get all active events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
    try {
        const pool = getPool();
        const [rows] = await pool.execute(
            'SELECT * FROM events WHERE isActive = 1 ORDER BY date ASC'
        );
        res.json(rows.map(deserializeEvent));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single event by slug
// @route   GET /api/events/:slug
// @access  Public
const getEventBySlug = async (req, res) => {
    try {
        const pool = getPool();
        const [rows] = await pool.execute(
            'SELECT * FROM events WHERE slug = ? AND isActive = 1 LIMIT 1',
            [req.params.slug]
        );
        if (!rows[0]) return res.status(404).json({ message: 'Event not found' });
        res.json(deserializeEvent(rows[0]));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private (Admin)
const createEvent = async (req, res) => {
    try {
        const pool = getPool();
        const {
            title, slug, description, date, location = '',
            image = '', gallery = [], status = 'Published', isActive = true
        } = req.body;

        const id = require('crypto').randomUUID().replace(/-/g, '').substring(0, 24);
        await pool.execute(
            `INSERT INTO events (id, title, slug, description, date, location, image, gallery, status, isActive, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [id, title, slug.toLowerCase(), description, date, location, image,
                JSON.stringify(gallery), status, isActive ? 1 : 0]
        );
        const [rows] = await pool.execute('SELECT * FROM events WHERE id = ?', [id]);
        res.status(201).json(deserializeEvent(rows[0]));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private (Admin)
const updateEvent = async (req, res) => {
    try {
        const pool = getPool();
        const { title, slug, description, date, location, image, gallery, status, isActive } = req.body;
        await pool.execute(
            `UPDATE events SET
                title = COALESCE(?, title), slug = COALESCE(?, slug),
                description = COALESCE(?, description), date = COALESCE(?, date),
                location = COALESCE(?, location), image = COALESCE(?, image),
                gallery = COALESCE(?, gallery), status = COALESCE(?, status),
                isActive = COALESCE(?, isActive), updatedAt = NOW()
             WHERE id = ?`,
            [
                title ?? null, slug ? slug.toLowerCase() : null, description ?? null,
                date ?? null, location ?? null, image ?? null,
                gallery !== undefined ? JSON.stringify(gallery) : null,
                status ?? null,
                isActive !== undefined ? (isActive ? 1 : 0) : null,
                req.params.id
            ]
        );
        const [rows] = await pool.execute('SELECT * FROM events WHERE id = ?', [req.params.id]);
        if (!rows[0]) return res.status(404).json({ message: 'Event not found' });
        res.json(deserializeEvent(rows[0]));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private (Admin)
const deleteEvent = async (req, res) => {
    try {
        const pool = getPool();
        const [result] = await pool.execute('DELETE FROM events WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getEvents, getEventBySlug, createEvent, updateEvent, deleteEvent };
