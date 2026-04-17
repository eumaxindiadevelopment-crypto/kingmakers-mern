const Lead = require('../models/Lead');

// @desc    Submit a new lead (form submission)
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
    try {
        const lead = await Lead.create(req.body);
        res.status(201).json({ message: 'Enquiry submitted successfully', lead });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all leads (with filtering and pagination)
// @route   GET /api/leads
// @access  Private (Admin)
const getLeads = async (req, res) => {
    try {
        const { source, status, isRead, search, startDate, endDate, page = 1, limit = 200 } = req.query;
        const filter = {};

        if (source) filter.source = source;
        if (status) filter.status = status;
        if (isRead !== undefined) filter.isRead = isRead === 'true';
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate + 'T00:00:00.000Z');
            if (endDate) filter.createdAt.$lte = new Date(endDate + 'T23:59:59.999Z');
        }

        const total = await Lead.countDocuments(filter);
        const leads = await Lead.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        // Stats for dashboard cards
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        const [totalThisMonth, newToday, contactedThisMonth, pendingThisMonth] = await Promise.all([
            Lead.countDocuments({ ...filter, createdAt: { $gte: monthStart } }),
            Lead.countDocuments({ ...filter, createdAt: { $gte: todayStart } }),
            Lead.countDocuments({ ...filter, status: 'Contacted', createdAt: { $gte: monthStart } }),
            Lead.countDocuments({ ...filter, status: 'Pending', createdAt: { $gte: monthStart } }),
        ]);

        res.json({
            leads,
            total,
            stats: { totalThisMonth, newToday, contactedThisMonth, pendingThisMonth }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mark lead as read
// @route   PUT /api/leads/:id/read
// @access  Private (Admin)
const markAsRead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
        if (!lead) return res.status(404).json({ message: 'Lead not found' });
        res.json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update lead status
// @route   PUT /api/leads/:id/status
// @access  Private (Admin)
const updateStatus = async (req, res) => {
    try {
        const { status, notes } = req.body;
        const updateData = { isRead: true };
        if (status) updateData.status = status;
        if (notes !== undefined) updateData.notes = notes;

        const lead = await Lead.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!lead) return res.status(404).json({ message: 'Lead not found' });
        res.json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private (Admin)
const deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);
        if (!lead) return res.status(404).json({ message: 'Lead not found' });
        res.json({ message: 'Lead deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createLead, getLeads, markAsRead, updateStatus, deleteLead };
