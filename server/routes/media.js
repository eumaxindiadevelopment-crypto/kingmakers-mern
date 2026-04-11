const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { getMedia, uploadMedia, deleteMedia, updateMedia } = require('../controllers/mediaController');
const { protect } = require('../middleware/auth');

// Make sure uploads directory exists natively
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Map multer setup
const storage = multer.diskStorage({
    destination(req, file, cb) {
        // Standard WordPress logic: group by YYYY/MM
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 'MM' format

        // E.g., server/uploads/2026/04
        const dir = path.join(__dirname, '..', 'uploads', year, month);

        // Dynamically create the YYYY/MM folders if they don't exist
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Route upload into this specific directory
        cb(null, dir);
    },
    filename(req, file, cb) {
        // Sanitize the filename to avoid broken URLs and add prefix to prevent duplicate overwrites
        const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        cb(null, `${Date.now()}-${safeName}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/') || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type! Only images, videos, and PDFs are allowed.'), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter
});

// Routes
router.get('/', protect, getMedia);
router.post('/', protect, upload.single('file'), uploadMedia);
router.put('/:id', protect, updateMedia);
router.delete('/:id', protect, deleteMedia);

module.exports = router;
