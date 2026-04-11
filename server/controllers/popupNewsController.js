const PopupNews = require('../models/PopupNews');

// Get all popup news
exports.getAllPopupNews = async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};
        const news = await PopupNews.find(filter).sort({ order: 1, createdAt: -1 });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single popup news
exports.getPopupNewsById = async (req, res) => {
    try {
        const news = await PopupNews.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create popup news
exports.createPopupNews = async (req, res) => {
    const news = new PopupNews({
        category: req.body.category,
        title: req.body.title,
        link: req.body.link,
        order: req.body.order,
        status: req.body.status
    });

    try {
        const newNews = await news.save();
        res.status(201).json(newNews);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update popup news
exports.updatePopupNews = async (req, res) => {
    try {
        const news = await PopupNews.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });

        if (req.body.category) news.category = req.body.category;
        if (req.body.title) news.title = req.body.title;
        if (req.body.link) news.link = req.body.link;
        if (req.body.order !== undefined) news.order = req.body.order;
        if (req.body.status) news.status = req.body.status;

        const updatedNews = await news.save();
        res.json(updatedNews);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete popup news
exports.deletePopupNews = async (req, res) => {
    try {
        const news = await PopupNews.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });

        await news.deleteOne();
        res.json({ message: 'News deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
