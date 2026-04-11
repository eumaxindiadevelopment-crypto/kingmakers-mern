const express = require('express');
const router = express.Router();
const { getSliders, createSlider, updateSlider, deleteSlider } = require('../controllers/sliderController');
const { protect } = require('../middleware/auth');

router.get('/', getSliders);                       // Public: for homepage slider
router.post('/', protect, createSlider);           // Admin: create
router.put('/:id', protect, updateSlider);         // Admin: update
router.delete('/:id', protect, deleteSlider);      // Admin: delete

module.exports = router;
