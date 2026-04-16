const { getPool } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    });

// Helper: safely parse JSON columns (tags, faqs, etc.)
const parseJSON = (val) => {
    if (typeof val === 'string') {
        try { return JSON.parse(val); } catch { return val; }
    }
    return val;
};

// @desc    Login admin user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: 'Please provide email and password' });
    try {
        const pool = getPool();
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE email = ? LIMIT 1', [email.toLowerCase()]
        );
        const user = rows[0];
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        res.json({
            _id: user.id,
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id),
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get current logged-in admin
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    res.json(req.user);
};

// @desc    Register first admin (seed use)
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const pool = getPool();
        const [existing] = await pool.execute('SELECT id FROM users WHERE email = ? LIMIT 1', [email.toLowerCase()]);
        if (existing.length > 0) return res.status(400).json({ message: 'Admin already exists' });

        const hashed = await bcrypt.hash(password, 10);
        const [result] = await pool.execute(
            'INSERT INTO users (id, name, email, password, role, createdAt, updatedAt) VALUES (UUID(), ?, ?, ?, ?, NOW(), NOW())',
            [name, email.toLowerCase(), hashed, 'admin']
        );
        // Fetch the new user
        const [newRows] = await pool.execute('SELECT * FROM users WHERE email = ? LIMIT 1', [email.toLowerCase()]);
        const user = newRows[0];
        res.status(201).json({
            _id: user.id,
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { login, getMe, register };
