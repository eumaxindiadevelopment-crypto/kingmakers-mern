const Category = require('../models/Category');
const Blog = require('../models/Blog');

// @desc    Get all categories with blog count
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });

        // Count blogs for each category
        // In a complex application, an aggregate pipeline is better, 
        // but this works for simple usage and low volume.
        const categoriesWithCount = await Promise.all(categories.map(async (cat) => {
            const count = await Blog.countDocuments({ category: cat.name });
            return {
                ...cat._doc,
                count
            };
        }));

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
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Category literally already exists' });
        }
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private (Admin)
const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private (Admin)
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        // Change all blogs under this category to "Uncategorized"
        await Blog.updateMany({ category: category.name }, { $set: { category: 'Uncategorized' } });

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
