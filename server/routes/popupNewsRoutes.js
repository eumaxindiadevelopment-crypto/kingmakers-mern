const express = require('express');
const router = express.Router();
const popupNewsController = require('../controllers/popupNewsController');

router.get('/', popupNewsController.getAllPopupNews);
router.get('/:id', popupNewsController.getPopupNewsById);
router.post('/', popupNewsController.createPopupNews);
router.put('/:id', popupNewsController.updatePopupNews);
router.delete('/:id', popupNewsController.deletePopupNews);

module.exports = router;
