const { getPool } = require('../config/db');

const deserializeNews = (row) => row ? { ...row, _id: row.id } : row;

// Get all popup news (optional ?category=UPSC|TNPSC)
exports.getAllPopupNews = async (req, res) => {
    try {
        const pool = getPool();
        const { category } = req.query;
        let sql = 'SELECT * FROM popupnews';
        const params = [];
        if (category) { sql += ' WHERE category = ?'; params.push(category); }
        sql += ' ORDER BY `order` ASC, createdAt DESC';
        const [rows] = await pool.execute(sql, params);
        res.json(rows.map(deserializeNews));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single popup news by id
exports.getPopupNewsById = async (req, res) => {
    try {
        const pool = getPool();
        const [rows] = await pool.execute('SELECT * FROM popupnews WHERE id = ? LIMIT 1', [req.params.id]);
        if (!rows[0]) return res.status(404).json({ message: 'News not found' });
        res.json(deserializeNews(rows[0]));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create popup news
exports.createPopupNews = async (req, res) => {
    try {
        const pool = getPool();
        const { category, title, link, imageUrl, altText, order = 0, status = 'Published' } = req.body;
        const id = require('crypto').randomUUID().replace(/-/g, '').substring(0, 24);
        await pool.execute(
            'INSERT INTO popupnews (id, category, title, link, imageUrl, altText, `order`, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
            [id, category, title, link, imageUrl, altText, order, status]
        );
        const [rows] = await pool.execute('SELECT * FROM popupnews WHERE id = ?', [id]);
        res.status(201).json(deserializeNews(rows[0]));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update popup news
exports.updatePopupNews = async (req, res) => {
    try {
        const pool = getPool();
        const { category, title, link, imageUrl, altText, order, status } = req.body;
        await pool.execute(
            `UPDATE popupnews SET
                category = COALESCE(?, category), title = COALESCE(?, title),
                link = COALESCE(?, link), imageUrl = COALESCE(?, imageUrl),
                altText = COALESCE(?, altText), \`order\` = COALESCE(?, \`order\`),
                status = COALESCE(?, status), updatedAt = NOW()
             WHERE id = ?`,
            [category ?? null, title ?? null, link ?? null, imageUrl ?? null, altText ?? null,
            order !== undefined ? order : null,
            status ?? null, req.params.id]
        );
        const [rows] = await pool.execute('SELECT * FROM popupnews WHERE id = ?', [req.params.id]);
        if (!rows[0]) return res.status(404).json({ message: 'News not found' });
        res.json(deserializeNews(rows[0]));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete popup news
exports.deletePopupNews = async (req, res) => {
    try {
        const pool = getPool();
        const [result] = await pool.execute('DELETE FROM popupnews WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'News not found' });
        res.json({ message: 'News deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
