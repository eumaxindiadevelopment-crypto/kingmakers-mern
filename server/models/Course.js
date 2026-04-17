const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    // Core Fields (used globally)
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ['UPSC', 'TNPSC'], default: 'UPSC' },

    // Rich Content (for UPSC/TNPSC Landing Pages)
    description: { type: String, trim: true },
    startDate: { type: String, trim: true },
    mode: { type: String, trim: true },
    batch: { type: String, trim: true },
    schedulePdf: { type: String, default: '' },

    // Pricing & Display (for both Cards and Full Pages)
    duration: { type: String, trim: true },
    features: { type: [String], default: [] },
    fees: { type: Number, default: 0 },
    isGstIncluded: { type: Boolean, default: true },
    badge: { type: String, enum: ['None', 'Popular', 'Most Popular', 'New'], default: 'None' },
    buttonText: { type: String, default: 'Enroll Now' },
    buttonLink: { type: String, default: '' },

    // Multiple Batches
    upcomingBatches: [{
        batchName: { type: String, trim: true },
        startDate: { type: String, trim: true },
        mode: { type: String, trim: true },
        fees: { type: Number, default: 0 },
        paymentLink: { type: String, trim: true },
        showSchedule: { type: Boolean, default: false },
        schedulePdf: { type: String }
    }],

    // Management
    showOnHomePage: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['Published', 'Draft'], default: 'Published' }
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
