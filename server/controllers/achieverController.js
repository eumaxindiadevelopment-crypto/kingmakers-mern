const { getPool } = require('../config/db');

const deserializeAchiever = (row) => {
    if (!row) return row;
    return { ...row, _id: row.id, isVisible: Boolean(row.isVisible) };
};

// @desc    Get all visible achievers
// @route   GET /api/achievers
// @access  Public
const getAchievers = async (req, res) => {
    try {
        const pool = getPool();
        const { exam, year } = req.query;
        const conditions = ['isVisible = 1'];
        const params = [];
        if (exam) { conditions.push('exam = ?'); params.push(exam); }
        if (year) { conditions.push('year = ?'); params.push(parseInt(year)); }

        const [rows] = await pool.execute(
            `SELECT * FROM achievers WHERE ${conditions.join(' AND ')} ORDER BY year DESC`,
            params
        );
        res.json(rows.map(deserializeAchiever));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get ALL achievers (admin)
// @route   GET /api/achievers/admin/all
// @access  Private (Admin)
const getAllAchieversAdmin = async (req, res) => {
    try {
        const pool = getPool();
        const [rows] = await pool.execute('SELECT * FROM achievers ORDER BY year DESC');
        res.json(rows.map(deserializeAchiever));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an achiever
// @route   POST /api/achievers
// @access  Private (Admin)
const createAchiever = async (req, res) => {
    try {
        const pool = getPool();
        const {
            name, rank, year, exam = 'UPSC', photo = '', description = '', isVisible = true
        } = req.body;

        const id = require('crypto').randomUUID().replace(/-/g, '').substring(0, 24);
        await pool.execute(
            `INSERT INTO achievers (id, name, \`rank\`, year, exam, photo, description, isVisible, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [id, name, rank, year, exam, photo, description, isVisible ? 1 : 0]
        );
        const [rows] = await pool.execute('SELECT * FROM achievers WHERE id = ?', [id]);
        res.status(201).json(deserializeAchiever(rows[0]));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update an achiever
// @route   PUT /api/achievers/:id
// @access  Private (Admin)
const updateAchiever = async (req, res) => {
    try {
        const pool = getPool();
        const { name, rank, year, exam, photo, description, isVisible } = req.body;
        await pool.execute(
            `UPDATE achievers SET
                name = COALESCE(?, name), \`rank\` = COALESCE(?, \`rank\`),
                year = COALESCE(?, year), exam = COALESCE(?, exam),
                photo = COALESCE(?, photo), description = COALESCE(?, description),
                isVisible = COALESCE(?, isVisible), updatedAt = NOW()
             WHERE id = ?`,
            [name ?? null, rank ?? null, year ?? null, exam ?? null, photo ?? null,
            description ?? null,
            isVisible !== undefined ? (isVisible ? 1 : 0) : null,
            req.params.id]
        );
        const [rows] = await pool.execute('SELECT * FROM achievers WHERE id = ?', [req.params.id]);
        if (!rows[0]) return res.status(404).json({ message: 'Achiever not found' });
        res.json(deserializeAchiever(rows[0]));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete an achiever
// @route   DELETE /api/achievers/:id
// @access  Private (Admin)
const deleteAchiever = async (req, res) => {
    try {
        const pool = getPool();
        const [result] = await pool.execute('DELETE FROM achievers WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Achiever not found' });
        res.json({ message: 'Achiever deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAchievers, getAllAchieversAdmin, createAchiever, updateAchiever, deleteAchiever };
