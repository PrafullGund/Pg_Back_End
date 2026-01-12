const requestService = require('../request/requestService');

const postRequestController = async (req, res) => {
    try {

        const request = await requestService.postRequestService(req.body);
        res.status(200).json({ success: true, message: 'Request Send Successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const getAllRequestController = async (req, res) => {
    try {

        const request = await requestService.getAllRequestService();
        res.status(200).json({ success: true, data: request });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const getRequestByUserIdController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const requests = await requestService.getRequestByUserIdService(userId);

        if (requests.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No requests found for the given user ID.'
            });
        }

        res.status(200).json({ success: true, data: requests });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const updateRequestStatusController = async (req, res) => {
    try {
        const requestId = req.params.requestId;
        const { status } = req.body;

        const result = await requestService.updateRequestStatusService(requestId, status);

        res.status(200).json({ success: true, message: result.message });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    postRequestController,
    getAllRequestController,
    getRequestByUserIdController,
    updateRequestStatusController
}
