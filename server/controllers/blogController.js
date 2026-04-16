const { getPool } = require('../config/db');

const parseJSON = (val) => {
    if (typeof val === 'string') {
        try { return JSON.parse(val); } catch { return val; }
    }
    return val;
};

// Deserialize JSON columns in a blog row
const deserializeBlog = (row) => {
    if (!row) return row;
    return {
        ...row,
        _id: row.id,
        tags: parseJSON(row.tags) || [],
        faqs: parseJSON(row.faqs) || [],
        isPublished: Boolean(row.isPublished),
    };
};

// @desc    Get all published blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
    try {
        const pool = getPool();
        const [rows] = await pool.execute(
            'SELECT * FROM blogs WHERE isPublished = 1 ORDER BY createdAt DESC'
        );
        res.json(rows.map(deserializeBlog));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = async (req, res) => {
    try {
        const pool = getPool();
        const [rows] = await pool.execute(
            'SELECT * FROM blogs WHERE slug = ? AND isPublished = 1 LIMIT 1',
            [req.params.slug]
        );
        if (!rows[0]) return res.status(404).json({ message: 'Blog not found' });
        res.json(deserializeBlog(rows[0]));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single blog by id (admin)
// @route   GET /api/blogs/id/:id
// @access  Private (Admin)
const getBlogById = async (req, res) => {
    try {
        const pool = getPool();
        const [rows] = await pool.execute('SELECT * FROM blogs WHERE id = ? LIMIT 1', [req.params.id]);
        if (!rows[0]) return res.status(404).json({ message: 'Blog not found' });
        res.json(deserializeBlog(rows[0]));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get ALL blogs (admin — includes unpublished)
// @route   GET /api/blogs/admin/all
// @access  Private (Admin)
const getAllBlogsAdmin = async (req, res) => {
    try {
        const pool = getPool();
        const [rows] = await pool.execute('SELECT * FROM blogs ORDER BY created_at DESC');
        res.json(rows.map(deserializeBlog));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private (Admin)
const createBlog = async (req, res) => {
    try {
        const pool = getPool();
        const {
            title, slug, excerpt, content, image = '', author = 'Kingmakers IAS Academy',
            category = 'Uncategorized', tags = [], seoTitle = '', seoDescription = '',
            seoKeywords = '', focusKeyword = '', faqs = [], isPublished = true
        } = req.body;

        const id = require('crypto').randomUUID().replace(/-/g, '').substring(0, 24);
        await pool.execute(
            `INSERT INTO blogs (id, title, slug, excerpt, content, image, author, category, tags, seoTitle, seoDescription, seoKeywords, focusKeyword, faqs, isPublished, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [id, title, slug.toLowerCase(), excerpt, content, image, author, category,
                JSON.stringify(tags), seoTitle, seoDescription, seoKeywords, focusKeyword,
                JSON.stringify(faqs), isPublished ? 1 : 0]
        );
        const [rows] = await pool.execute('SELECT * FROM blogs WHERE id = ?', [id]);
        res.status(201).json(deserializeBlog(rows[0]));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private (Admin)
const updateBlog = async (req, res) => {
    try {
        const pool = getPool();
        const {
            title, slug, excerpt, content, image, author, category, tags,
            seoTitle, seoDescription, seoKeywords, focusKeyword, faqs, isPublished
        } = req.body;

        await pool.execute(
            `UPDATE blogs SET
                title = COALESCE(?, title), slug = COALESCE(?, slug), excerpt = COALESCE(?, excerpt),
                content = COALESCE(?, content), image = COALESCE(?, image), author = COALESCE(?, author),
                category = COALESCE(?, category),
                tags = COALESCE(?, tags), seo_title = COALESCE(?, seo_title),
                seo_description = COALESCE(?, seo_description), seo_keywords = COALESCE(?, seo_keywords),
                focus_keyword = COALESCE(?, focus_keyword), faqs = COALESCE(?, faqs),
                is_published = COALESCE(?, is_published), updated_at = NOW()
             WHERE id = ?`,
            [
                title ?? null, slug ?? null, excerpt ?? null, content ?? null, image ?? null,
                author ?? null, category ?? null,
                tags !== undefined ? JSON.stringify(tags) : null,
                seoTitle ?? null, seoDescription ?? null, seoKeywords ?? null, focusKeyword ?? null,
                faqs !== undefined ? JSON.stringify(faqs) : null,
                isPublished !== undefined ? (isPublished ? 1 : 0) : null,
                req.params.id
            ]
        );
        const [rows] = await pool.execute('SELECT * FROM blogs WHERE id = ?', [req.params.id]);
        if (!rows[0]) return res.status(404).json({ message: 'Blog not found' });
        res.json(deserializeBlog(rows[0]));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private (Admin)
const deleteBlog = async (req, res) => {
    try {
        const pool = getPool();
        const [result] = await pool.execute('DELETE FROM blogs WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Blog not found' });
        res.json({ message: 'Blog deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBlogs, getBlogBySlug, getBlogById, getAllBlogsAdmin, createBlog, updateBlog, deleteBlog };
