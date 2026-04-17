const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    url: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    altText: { type: String, default: '' },
    title: { type: String, default: '' },
    caption: { type: String, default: '' },
    description: { type: String, default: '' },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Media', MediaSchema);
