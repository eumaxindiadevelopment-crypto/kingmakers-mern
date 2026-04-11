const mongoose = require('mongoose');

const popupNewsSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['UPSC', 'TNPSC']
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true,
        trim: true
    },
    order: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Published', 'Draft'],
        default: 'Published'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PopupNews', popupNewsSchema);
