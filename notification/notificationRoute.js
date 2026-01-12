const express = require('express');
const router = express.Router();
const notificationController = require('../notification/notificationController');

router.post('/sendNotification', notificationController.sendNotificationController);
router.get('/getNotification/:receiver', notificationController.getUserNotificationsController);

module.exports = router;