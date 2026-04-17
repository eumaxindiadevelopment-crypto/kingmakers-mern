const mongoose = require('mongoose');

const AchieverSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    rank: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    exam: {
        type: String,
        enum: ['UPSC', 'TNPSC', 'OTHER'],
        default: 'UPSC'
    },
    photo: { type: String, default: '' },
    description: { type: String, trim: true },
    isVisible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Achiever', AchieverSchema);
