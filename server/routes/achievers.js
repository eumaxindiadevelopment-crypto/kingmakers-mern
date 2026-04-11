const express = require('express');
const router = express.Router();
const { getAchievers, createAchiever, updateAchiever, deleteAchiever } = require('../controllers/achieverController');
const { protect } = require('../middleware/auth');

router.get('/', getAchievers);                   // Public: all achievers
router.post('/', protect, createAchiever);       // Admin: create
router.put('/:id', protect, updateAchiever);     // Admin: update
router.delete('/:id', protect, deleteAchiever);  // Admin: delete

module.exports = router;
