const mongoose = require('mongoose');

const SliderSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    link: { type: String, trim: true, default: '' },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['published', 'draft'], default: 'published' },
    altText: { type: String, trim: true, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Slider', SliderSchema);
