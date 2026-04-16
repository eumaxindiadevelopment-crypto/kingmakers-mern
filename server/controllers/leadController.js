const { getPool } = require('../config/db');

const deserializeLead = (row) => {
    if (!row) return row;
    return { ...row, _id: row.id, isRead: Boolean(row.isRead) };
};

// @desc    Submit a new lead (form submission)
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
    try {
        const pool = getPool();
        const {
            name, phone, email = '', course = '', city = '', message = '',
            source = 'enquiry', status = 'New', notes = '', isRead = false
        } = req.body;

        const id = require('crypto').randomUUID().replace(/-/g, '').substring(0, 24);
        await pool.execute(
            `INSERT INTO leads (id, name, phone, email, course, city, message, source, status, notes, isRead, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [id, name, phone, email, course, city, message, source, status, notes, isRead ? 1 : 0]
        );
        const [rows] = await pool.execute('SELECT * FROM leads WHERE id = ?', [id]);
        res.status(201).json({ message: 'Enquiry submitted successfully', lead: deserializeLead(rows[0]) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all leads (with filtering and pagination)
// @route   GET /api/leads
// @access  Private (Admin)
const getLeads = async (req, res) => {
    try {
        const pool = getPool();
        const { source, status, isRead, search, startDate, endDate, page = 1, limit = 200 } = req.query;

        const conditions = [];
        const params = [];

        if (source) { conditions.push('source = ?'); params.push(source); }
        if (status) { conditions.push('status = ?'); params.push(status); }
        if (isRead !== undefined) { conditions.push('isRead = ?'); params.push(isRead === 'true' ? 1 : 0); }
        if (search) {
            conditions.push('(name LIKE ? OR phone LIKE ? OR email LIKE ?)');
            const like = `%${search}%`;
            params.push(like, like, like);
        }
        if (startDate) { conditions.push('createdAt >= ?'); params.push(startDate + ' 00:00:00'); }
        if (endDate) { conditions.push('createdAt <= ?'); params.push(endDate + ' 23:59:59'); }

        const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

        // Count total
        const [countRows] = await pool.execute(`SELECT COUNT(*) AS cnt FROM leads ${where}`, params);
        const total = countRows[0].cnt;

        // Paginated results
        const offset = (parseInt(page) - 1) * parseInt(limit);
        const [rows] = await pool.execute(
            `SELECT * FROM leads ${where} ORDER BY createdAt DESC LIMIT ? OFFSET ?`,
            [...params, parseInt(limit), offset]
        );

        // Stats
        const now = new Date();
        const todayStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} 00:00:00`;
        const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01 00:00:00`;

        const [[{ cnt: totalThisMonth }]] = await pool.execute(`SELECT COUNT(*) AS cnt FROM leads ${where ? where + ' AND' : 'WHERE'} createdAt >= ?`, [...params, monthStart]);
        const [[{ cnt: newToday }]] = await pool.execute(`SELECT COUNT(*) AS cnt FROM leads ${where ? where + ' AND' : 'WHERE'} createdAt >= ?`, [...params, todayStart]);
        const [[{ cnt: contactedThisMonth }]] = await pool.execute(`SELECT COUNT(*) AS cnt FROM leads ${where ? where + ' AND' : 'WHERE'} status = 'Contacted' AND createdAt >= ?`, [...params, monthStart]);
        const [[{ cnt: pendingThisMonth }]] = await pool.execute(`SELECT COUNT(*) AS cnt FROM leads ${where ? where + ' AND' : 'WHERE'} status = 'Pending' AND createdAt >= ?`, [...params, monthStart]);

        res.json({
            leads: rows.map(deserializeLead),
            total,
            stats: { totalThisMonth, newToday, contactedThisMonth, pendingThisMonth }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mark lead as read
// @route   PUT /api/leads/:id/read
// @access  Private (Admin)
const markAsRead = async (req, res) => {
    try {
        const pool = getPool();
        await pool.execute('UPDATE leads SET isRead = 1, updatedAt = NOW() WHERE id = ?', [req.params.id]);
        const [rows] = await pool.execute('SELECT * FROM leads WHERE id = ?', [req.params.id]);
        if (!rows[0]) return res.status(404).json({ message: 'Lead not found' });
        res.json(deserializeLead(rows[0]));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update lead status / notes
// @route   PUT /api/leads/:id/status
// @access  Private (Admin)
const updateStatus = async (req, res) => {
    try {
        const pool = getPool();
        const { status, notes } = req.body;
        const fields = ['isRead = 1', 'updatedAt = NOW()'];
        const values = [];
        if (status) { fields.push('status = ?'); values.push(status); }
        if (notes !== undefined) { fields.push('notes = ?'); values.push(notes); }
        values.push(req.params.id);
        await pool.execute(`UPDATE leads SET ${fields.join(', ')} WHERE id = ?`, values);
        const [rows] = await pool.execute('SELECT * FROM leads WHERE id = ?', [req.params.id]);
        if (!rows[0]) return res.status(404).json({ message: 'Lead not found' });
        res.json(deserializeLead(rows[0]));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private (Admin)
const deleteLead = async (req, res) => {
    try {
        const pool = getPool();
        const [result] = await pool.execute('DELETE FROM leads WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Lead not found' });
        res.json({ message: 'Lead deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createLead, getLeads, markAsRead, updateStatus, deleteLead };
