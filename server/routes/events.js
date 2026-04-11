const express = require('express');
const router = express.Router();
const { getEvents, getEventBySlug, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/auth');

router.get('/', getEvents);                      // Public: all events
router.get('/:slug', getEventBySlug);            // Public: single event by slug
router.post('/', protect, createEvent);          // Admin: create
router.put('/:id', protect, updateEvent);        // Admin: update
router.delete('/:id', protect, deleteEvent);     // Admin: delete

module.exports = router;
