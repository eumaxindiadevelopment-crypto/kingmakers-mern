const { getPool } = require('../config/db');

const deserializeSlider = (row) => row ? {
    ...row,
    _id: row.id
} : row;

// GET /api/sliders — public, sorted by order
const getSliders = async (req, res) => {
    try {
        const pool = getPool();
        const { status } = req.query;
        let sql = 'SELECT * FROM sliders';
        const params = [];
        if (status) { sql += ' WHERE status = ?'; params.push(status); }
        sql += ' ORDER BY `order` ASC, createdAt DESC';
        const [rows] = await pool.execute(sql, params);
        res.json(rows.map(deserializeSlider));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/sliders — admin only
const createSlider = async (req, res) => {
    try {
        const pool = getPool();
        const { title, imageUrl, link = '', order = 0, status = 'published', altText = '' } = req.body;
        const id = require('crypto').randomUUID().replace(/-/g, '').substring(0, 24);
        await pool.execute(
            'INSERT INTO sliders (id, title, imageUrl, link, `order`, status, altText, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
            [id, title, imageUrl, link, order, status, altText]
        );
        const [rows] = await pool.execute('SELECT * FROM sliders WHERE id = ?', [id]);
        res.status(201).json(deserializeSlider(rows[0]));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT /api/sliders/:id — admin only
const updateSlider = async (req, res) => {
    try {
        const pool = getPool();
        const { title, imageUrl, link, order, status, altText } = req.body;
        await pool.execute(
            `UPDATE sliders SET
                title = COALESCE(?, title), imageUrl = COALESCE(?, imageUrl),
                link = COALESCE(?, link), \`order\` = COALESCE(?, \`order\`),
                status = COALESCE(?, status), altText = COALESCE(?, altText),
                updatedAt = NOW()
             WHERE id = ?`,
            [title ?? null, imageUrl ?? null, link ?? null,
            order !== undefined ? order : null,
            status ?? null, altText ?? null, req.params.id]
        );
        const [rows] = await pool.execute('SELECT * FROM sliders WHERE id = ?', [req.params.id]);
        if (!rows[0]) return res.status(404).json({ message: 'Slider not found' });
        res.json(deserializeSlider(rows[0]));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE /api/sliders/:id — admin only
const deleteSlider = async (req, res) => {
    try {
        const pool = getPool();
        const [result] = await pool.execute('DELETE FROM sliders WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Slider not found' });
        res.json({ message: 'Slider deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getSliders, createSlider, updateSlider, deleteSlider };
