const fs = require('fs');
const path = require('path');
const Media = require('../models/Media');

// @desc    Get all media files
// @route   GET /api/media
// @access  Private (Admin)
const getMedia = async (req, res) => {
    try {
        const media = await Media.find().sort({ createdAt: -1 });
        res.json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Upload media file
// @route   POST /api/media
// @access  Private (Admin)
const uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const API_URL = process.env.NODE_ENV === 'production' ? 'https://kingmakersiasacademy.com' : 'http://localhost:5000';

        // Extract YYYY/MM from the current Date (exactly as saved by multer)
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');

        // Assemble URL mapping the static route to the new nested directories
        const fileUrl = `${API_URL}/uploads/${year}/${month}/${req.file.filename}`;

        const media = await Media.create({
            filename: req.file.filename,
            originalName: req.file.originalname,
            url: fileUrl,
            mimetype: req.file.mimetype,
            size: req.file.size,
            title: req.file.originalname.split('.')[0], // Default title mapping
            uploadedBy: req.user ? req.user._id : null
        });

        res.status(201).json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update media metadata
// @route   PUT /api/media/:id
// @access  Private (Admin)
const updateMedia = async (req, res) => {
    try {
        const { altText, title, caption, description } = req.body;
        const media = await Media.findByIdAndUpdate(
            req.params.id,
            { altText, title, caption, description },
            { new: true }
        );
        if (!media) return res.status(404).json({ message: 'Media not found' });
        res.json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete media file
// @route   DELETE /api/media/:id
// @access  Private (Admin)
const deleteMedia = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) return res.status(404).json({ message: 'Media not found' });

        // Extract relative path safely from the database URL to support dynamic folder wiping
        const urlParts = media.url.split('/uploads/');
        if (urlParts.length > 1) {
            const relativePath = urlParts[1]; // e.g., "YYYY/MM/filename.ext"
            const filePath = path.join(__dirname, '..', 'uploads', ...relativePath.split('/'));
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await media.deleteOne();
        res.json({ message: 'Media removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMedia, uploadMedia, updateMedia, deleteMedia };
