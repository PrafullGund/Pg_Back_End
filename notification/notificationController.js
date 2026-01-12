const notificationService = require('../notification/notificationService');

// const sendNotificationController = async (req, res) => {
//     try {

//         const { sender, receiver, message } = req.body;
//         const result = await notificationService.sendNotificationService({ sender, receiver, message });
//         res.status(201).json({ success: true, message: 'Notification sent', data: result });

//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

const sendNotificationController = async (req, res) => {
    try {
        const { sender, receiver, message } = req.body;

        const result = await notificationService.sendNotificationService({ sender, receiver, message });

        const io = req.app.get('socketio');
        const connectedUsers = req.app.get('connectedUsers');
        const socketId = connectedUsers.get(receiver);

        if (socketId) {
            io.to(socketId).emit('notification', { sender, message });
        }

        res.status(201).json({ success: true, message: 'Notification sent', data: result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const getUserNotificationsController = async (req, res) => {
    try {

        const receiver = req.params.receiver;
        const result = await notificationService.getUserNotificationsService(receiver);
        res.status(200).json({ success: true, data: result });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    sendNotificationController,
    getUserNotificationsController
}
