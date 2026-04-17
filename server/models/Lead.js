const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    course: { type: String, trim: true },
    city: { type: String, trim: true },
    message: { type: String, trim: true },
    source: {
        type: String,
        enum: ['enquiry', 'tnpsc', 'upsc', 'homepage', 'contact'],
        default: 'enquiry'
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Pending'],
        default: 'New'
    },
    notes: { type: String, trim: true },
    isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Lead', LeadSchema);
