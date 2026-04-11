const Slider = require('../models/Slider');

// GET /api/sliders  — public, sorted by order
const getSliders = async (req, res) => {
    try {
        const { status } = req.query;
        const filter = {};
        if (status) filter.status = status;
        const sliders = await Slider.find(filter).sort({ order: 1, createdAt: -1 });
        res.json(sliders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/sliders  — admin only
const createSlider = async (req, res) => {
    try {
        const slider = await Slider.create(req.body);
        res.status(201).json(slider);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT /api/sliders/:id  — admin only
const updateSlider = async (req, res) => {
    try {
        const slider = await Slider.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!slider) return res.status(404).json({ message: 'Slider not found' });
        res.json(slider);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE /api/sliders/:id  — admin only
const deleteSlider = async (req, res) => {
    try {
        const slider = await Slider.findByIdAndDelete(req.params.id);
        if (!slider) return res.status(404).json({ message: 'Slider not found' });
        res.json({ message: 'Slider deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getSliders, createSlider, updateSlider, deleteSlider };
