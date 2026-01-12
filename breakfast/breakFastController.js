const breakFastService = require('../breakfast/breakFastService');

const postBreakFastController = async (req, res) => {
    try {
        const breakFast = await breakFastService.postBreakFastService(req.body);
        res.status(200).json({ success: true, message: 'Break Fast Added Successfully' })
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const getAllBreakFastController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = await breakFastService.getAllBreakFastService(page, limit);

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(result.total / limit),
            totalRecords: result.total,
            totalAvailableBreakFast: result.summary.Available || 0,
            totalCancelBreakFast: result.summary.Cancel || 0,
            data: result.data
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    postBreakFastController,
    getAllBreakFastController
}