const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, trim: true },
    image: { type: String, default: '' },
    gallery: [{ type: String }],
    status: { type: String, enum: ['Published', 'Draft'], default: 'Published' },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
