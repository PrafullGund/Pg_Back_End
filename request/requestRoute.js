const express = require('express');
const router = express.Router();
const requestController = require('../request/requestController');

router.post('/request', requestController.postRequestController);
router.get('/request', requestController.getAllRequestController);
router.get('/request/:userId', requestController.getRequestByUserIdController);
router.put('/request/:requestId/status', requestController.updateRequestStatusController);

module.exports = router;