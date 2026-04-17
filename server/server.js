const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load env vars from server/.env (works regardless of cwd)
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        // Add your production domain here when deploying to VPS
        // e.g., 'https://yourdomain.com'
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads folder (bound to __dirname to avoid execution context bugs)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/events', require('./routes/events'));
app.use('/api/achievers', require('./routes/achievers'));
app.use('/api/media', require('./routes/media'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/sliders', require('./routes/sliders'));
app.use('/api/popup-news', require('./routes/popupNewsRoutes'));


// Health check
app.get('/api/health', (req, res) => {
    res.json({ message: 'Kingmakers API is running ✅ (MongoDB)', timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('❌ Server failed to start:', err.message);
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please check for zombie processes.`);
    }
});
