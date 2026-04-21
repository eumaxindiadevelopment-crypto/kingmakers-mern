const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res) => {
    try {
        const { category } = req.query;
        let filter = {};
        if (category) {
            filter = { category: category };
        }

        console.log(`Fetching courses for category: ${category || 'All'}...`);
        const courses = await Course.find(filter).sort({ order: 1, createdAt: -1 });

        console.log(`Found ${courses.length} courses`);
        res.json(courses);
    } catch (err) {
        console.error('Error in getCourses:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
exports.createCourse = async (req, res) => {
    try {
        console.log('Creating new course:', req.body);
        const count = await Course.countDocuments({ category: req.body.category || 'UPSC' });
        const newCourse = new Course({ ...req.body, order: count });
        const savedCourse = await newCourse.save();
        console.log('Course saved successfully:', savedCourse._id);
        res.status(201).json(savedCourse);
    } catch (err) {
        console.error('Error in createCourse:', err.message);
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
exports.updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
        res.json(updatedCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Course removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Reorder courses
// @route   PUT /api/courses/reorder
// @access  Private/Admin
exports.reorderCourses = async (req, res) => {
    try {
        const { courses } = req.body;
        if (!Array.isArray(courses)) {
            return res.status(400).json({ message: 'Invalid courses array' });
        }

        const updates = courses.map(item =>
            Course.findByIdAndUpdate(item._id, { order: item.order })
        );

        await Promise.all(updates);
        res.json({ message: 'Order updated successfully' });
    } catch (err) {
        console.error('Error in reorderCourses:', err.message);
        res.status(500).json({ message: err.message });
    }
};
