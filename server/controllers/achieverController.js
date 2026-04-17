const Achiever = require('../models/Achiever');

// @desc    Get all visible achievers
// @route   GET /api/achievers
// @access  Public
const getAchievers = async (req, res) => {
    try {
        const { exam, year } = req.query;
        const filter = { isVisible: true };
        if (exam) filter.exam = exam;
        if (year) filter.year = parseInt(year);
        const achievers = await Achiever.find(filter).sort({ year: -1 });
        res.json(achievers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an achiever
// @route   POST /api/achievers
// @access  Private (Admin)
const createAchiever = async (req, res) => {
    try {
        const achiever = await Achiever.create(req.body);
        res.status(201).json(achiever);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update an achiever
// @route   PUT /api/achievers/:id
// @access  Private (Admin)
const updateAchiever = async (req, res) => {
    try {
        const achiever = await Achiever.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!achiever) return res.status(404).json({ message: 'Achiever not found' });
        res.json(achiever);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete an achiever
// @route   DELETE /api/achievers/:id
// @access  Private (Admin)
const deleteAchiever = async (req, res) => {
    try {
        const achiever = await Achiever.findByIdAndDelete(req.params.id);
        if (!achiever) return res.status(404).json({ message: 'Achiever not found' });
        res.json({ message: 'Achiever deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAchievers, createAchiever, updateAchiever, deleteAchiever };
