const { getPool } = require('../config/db');

const deserializeCat = (row) => row ? { ...row, _id: row.id } : row;

// @desc    Get all categories with blog count
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
    try {
        const pool = getPool();
        const [categories] = await pool.execute('SELECT * FROM categories ORDER BY name ASC');

        const categoriesWithCount = await Promise.all(
            categories.map(async (cat) => {
                const [[{ cnt }]] = await pool.execute(
                    'SELECT COUNT(*) AS cnt FROM blogs WHERE category = ?', [cat.name]
                );
                return { ...deserializeCat(cat), count: cnt };
            })
        );

        res.json(categoriesWithCount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private (Admin)
const createCategory = async (req, res) => {
    try {
        const pool = getPool();
        const { name, slug, description = '', parent = null } = req.body;
        const id = require('crypto').randomUUID().replace(/-/g, '').substring(0, 24);

        try {
            await pool.execute(
                'INSERT INTO categories (id, name, slug, description, parent, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
                [id, name, slug.toLowerCase(), description, parent]
            );
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Category literally already exists' });
            }
            throw err;
        }

        const [rows] = await pool.execute('SELECT * FROM categories WHERE id = ?', [id]);
        res.status(201).json(deserializeCat(rows[0]));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private (Admin)
const updateCategory = async (req, res) => {
    try {
        const pool = getPool();
        const { name, slug, description, parent } = req.body;
        await pool.execute(
            `UPDATE categories SET
                name = COALESCE(?, name), slug = COALESCE(?, slug),
                description = COALESCE(?, description), parent = COALESCE(?, parent),
                updatedAt = NOW()
             WHERE id = ?`,
            [name ?? null, slug ? slug.toLowerCase() : null, description ?? null, parent ?? null, req.params.id]
        );
        const [rows] = await pool.execute('SELECT * FROM categories WHERE id = ?', [req.params.id]);
        if (!rows[0]) return res.status(404).json({ message: 'Category not found' });
        res.json(deserializeCat(rows[0]));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a category (reassigns its blogs to Uncategorized)
// @route   DELETE /api/categories/:id
// @access  Private (Admin)
const deleteCategory = async (req, res) => {
    try {
        const pool = getPool();
        const [rows] = await pool.execute('SELECT * FROM categories WHERE id = ?', [req.params.id]);
        if (!rows[0]) return res.status(404).json({ message: 'Category not found' });

        // Reassign blogs
        await pool.execute('UPDATE blogs SET category = ? WHERE category = ?', ['Uncategorized', rows[0].name]);
        await pool.execute('DELETE FROM categories WHERE id = ?', [req.params.id]);

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
