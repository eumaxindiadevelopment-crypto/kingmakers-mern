const express = require('express');
const router = express.Router();
const { createLead, getLeads, markAsRead, updateStatus, deleteLead } = require('../controllers/leadController');
const { protect } = require('../middleware/auth');

router.post('/', createLead);                        // Public: form submission
router.get('/', protect, getLeads);                  // Admin: view all leads (with filters)
router.put('/:id/read', protect, markAsRead);        // Admin: mark as read
router.put('/:id/status', protect, updateStatus);    // Admin: update status + notes
router.delete('/:id', protect, deleteLead);          // Admin: delete lead

module.exports = router;
