const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: '' },
    author: { type: String, default: 'Kingmakers IAS Academy' },
    category: { type: String, default: 'Uncategorized' },
    tags: [{ type: String }],
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    seoKeywords: { type: String, default: '' },
    focusKeyword: { type: String, default: '' },
    faqs: [
        {
            question: { type: String, required: true },
            answer: { type: String, required: true }
        }
    ],
    isPublished: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
