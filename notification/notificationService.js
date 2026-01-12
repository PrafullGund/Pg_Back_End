const dbConnection = require('../config/connection');

const sendNotificationService = async ({ sender, receiver, message }) => {
    const [result] = await dbConnection.query(
        'INSERT INTO notification (sender, receiver, message) VALUES (?, ?, ?)',
        [sender, receiver, message]
    );
    return result;
};

const getUserNotificationsService = async (receiver) => {
    const [result] = await dbConnection.query(
        'SELECT * FROM notification WHERE receiver=? ORDER BY createdAt DESC',
        [receiver]
    );
    return result;
}

module.exports = {
    sendNotificationService,
    getUserNotificationsService
}
