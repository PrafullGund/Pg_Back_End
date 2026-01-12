const dinnerService = require('../dinner/dinnerService');

const postDinnerController = async (req, res) => {
    try {
        const dinner = await dinnerService.postDinnerService(req.body);
        res.status(200).json({ success: true, message: 'Dinner Added Successfully' })
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const getAllDinnerController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = await dinnerService.getAllDinnerService(page, limit);

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
    postDinnerController,
    getAllDinnerController
}