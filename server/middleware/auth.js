/**
 * No-op auth middleware — all routes are open.
 * Admin access is controlled client-side via AdminLoginData.
 */
const protect = (req, res, next) => {
    req.user = { _id: 'admin', role: 'admin' };
    next();
};

module.exports = { protect };
