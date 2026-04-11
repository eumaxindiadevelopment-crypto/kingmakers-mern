const express = require('express');
const router = express.Router();
const { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/auth');

router.get('/', getBlogs);                       // Public: all blogs
router.get('/:slug', getBlogBySlug);             // Public: single blog by slug
router.post('/', protect, createBlog);           // Admin: create
router.put('/:id', protect, updateBlog);         // Admin: update
router.delete('/:id', protect, deleteBlog);      // Admin: delete

module.exports = router;
