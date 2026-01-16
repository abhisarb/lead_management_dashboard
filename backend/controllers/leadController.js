const Lead = require('../models/Lead');

exports.getLeads = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', status = '', sortField = 'createdAt', sortOrder = 'desc' } = req.query;

        const query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        if (status) {
            query.status = status;
        }

        const leads = await Lead.find(query)
            .sort({ [sortField]: sortOrder === 'desc' ? -1 : 1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Lead.countDocuments(query);

        res.json({
            leads,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ message: 'Lead not found' });
        res.json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLeadStats = async (req, res) => {
    try {
        const stats = await Lead.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    totalValue: { $sum: '$value' }
                }
            }
        ]);

        const totalLeads = await Lead.countDocuments();
        const sourceBreakdown = await Lead.aggregate([
            {
                $group: {
                    _id: '$source',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            statusBreakdown: stats,
            totalLeads,
            sourceBreakdown
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
