const express = require('express');
const router = express.Router();
const {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    reorderCourses
} = require('../controllers/courseController');
const { protect } = require('../middleware/auth');

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.put('/reorder', protect, reorderCourses);
router.post('/', protect, createCourse);
router.put('/:id', protect, updateCourse);
router.delete('/:id', protect, deleteCourse);

module.exports = router;
