const jwt = require('jsonwebtoken');
const { getPool } = require('../config/db');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return res.status(401).json({ message: 'Not authorized — no token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const pool = getPool();
        const [rows] = await pool.execute(
            'SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ? LIMIT 1',
            [decoded.id]
        );
        if (!rows[0]) return res.status(401).json({ message: 'Not authorized — user not found' });
        req.user = { ...rows[0], _id: rows[0].id };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized — invalid token' });
    }
};

module.exports = { protect };
