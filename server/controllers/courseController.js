const { getPool } = require('../config/db');

const parseJSON = (val) => {
    if (typeof val === 'string') {
        try { return JSON.parse(val); } catch { return val; }
    }
    return val;
};

const deserializeCourse = (row) => {
    if (!row) return row;
    return {
        ...row,
        _id: row.id,
        features: parseJSON(row.features) || [],
        upcomingBatches: parseJSON(row.upcomingBatches || row.upcoming_batches) || [],
        isGstIncluded: Boolean(row.isGstIncluded),
        showOnHomePage: Boolean(row.showOnHomePage),
    };
};

// @desc    Get all courses (optional ?category=UPSC|TNPSC)
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res) => {
    try {
        const pool = getPool();
        const { category } = req.query;
        let sql = 'SELECT * FROM courses';
        const params = [];
        if (category) {
            sql += ' WHERE category = ?';
            params.push(category);
        }
        sql += ' ORDER BY `order` ASC, createdAt DESC';
        const [rows] = await pool.execute(sql, params);
        res.json(rows.map(deserializeCourse));
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
        const pool = getPool();
        const [rows] = await pool.execute('SELECT * FROM courses WHERE id = ? LIMIT 1', [req.params.id]);
        if (!rows[0]) return res.status(404).json({ message: 'Course not found' });
        res.json(deserializeCourse(rows[0]));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
exports.createCourse = async (req, res) => {
    try {
        const pool = getPool();
        const {
            title, category = 'UPSC', description = '', startDate = '', mode = '',
            batch = '', schedulePdf = '', duration = '', features = [], fees = 0,
            isGstIncluded = true, badge = 'None', buttonText = 'Enroll Now', buttonLink = '',
            upcomingBatches = [], showOnHomePage = true, order, status = 'Published'
        } = req.body;

        // Determine order if not provided
        let courseOrder = order;
        if (courseOrder === undefined || courseOrder === null) {
            const [countRows] = await pool.execute(
                'SELECT COUNT(*) AS cnt FROM courses WHERE category = ?', [category]
            );
            courseOrder = countRows[0].cnt;
        }

        const id = require('crypto').randomUUID().replace(/-/g, '').substring(0, 24);
        await pool.execute(
            `INSERT INTO courses
                (id, title, category, description, startDate, mode, batch, schedulePdf, duration,
                 features, fees, isGstIncluded, badge, buttonText, buttonLink,
                 upcomingBatches, showOnHomePage, \`order\`, status, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [
                id, title, category, description, startDate, mode, batch, schedulePdf, duration,
                JSON.stringify(features), fees, isGstIncluded ? 1 : 0, badge, buttonText, buttonLink,
                JSON.stringify(upcomingBatches), showOnHomePage ? 1 : 0, courseOrder, status
            ]
        );
        const [rows] = await pool.execute('SELECT * FROM courses WHERE id = ?', [id]);
        res.status(201).json(deserializeCourse(rows[0]));
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
        const pool = getPool();
        const fields = [];
        const values = [];

        const allowedMap = {
            title: 'title', category: 'category', description: 'description',
            startDate: 'startDate', mode: 'mode', batch: 'batch', schedulePdf: 'schedulePdf',
            duration: 'duration', fees: 'fees', badge: 'badge',
            buttonText: 'buttonText', buttonLink: 'buttonLink',
            showOnHomePage: 'showOnHomePage', order: '`order`', status: 'status'
        };
        const jsonMap = { features: 'features', upcomingBatches: 'upcomingBatches' };
        const boolMap = { isGstIncluded: 'isGstIncluded', showOnHomePage: 'showOnHomePage' };

        for (const [bodyKey, colName] of Object.entries(allowedMap)) {
            if (req.body[bodyKey] !== undefined) {
                fields.push(`${colName} = ?`);
                values.push(boolMap[bodyKey] !== undefined ? (req.body[bodyKey] ? 1 : 0) : req.body[bodyKey]);
            }
        }
        for (const [bodyKey, colName] of Object.entries(jsonMap)) {
            if (req.body[bodyKey] !== undefined) {
                fields.push(`${colName} = ?`);
                values.push(JSON.stringify(req.body[bodyKey]));
            }
        }
        if (fields.length === 0) return res.status(400).json({ message: 'No fields to update' });

        fields.push('updated_at = NOW()');
        values.push(req.params.id);

        await pool.execute(`UPDATE courses SET ${fields.join(', ')} WHERE id = ?`, values);
        const [rows] = await pool.execute('SELECT * FROM courses WHERE id = ?', [req.params.id]);
        if (!rows[0]) return res.status(404).json({ message: 'Course not found' });
        res.json(deserializeCourse(rows[0]));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
exports.deleteCourse = async (req, res) => {
    try {
        const pool = getPool();
        const [result] = await pool.execute('DELETE FROM courses WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Course not found' });
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
        const pool = getPool();
        const { courses } = req.body;
        if (!Array.isArray(courses)) return res.status(400).json({ message: 'Invalid courses array' });

        const updates = courses.map(item =>
            pool.execute('UPDATE courses SET `order` = ? WHERE id = ?', [item.order, item._id || item.id])
        );
        await Promise.all(updates);
        res.json({ message: 'Order updated successfully' });
    } catch (err) {
        console.error('Error in reorderCourses:', err.message);
        res.status(500).json({ message: err.message });
    }
};
