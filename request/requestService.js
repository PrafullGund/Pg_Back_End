const dbConnection = require('../config/connection');

const postRequestService = async (requestData) => {
    const request = 'INSERT INTO request (userId,description,status) VALUES (?,?,?)';
    const [result] = await dbConnection.query(request,
        [
            requestData.userId,
            requestData.description,
            requestData.status,
        ]
    );
    return result;
}

const getAllRequestService = async () => {
    const [result] = await dbConnection.query('SELECT * FROM request');
    return result;
}

const getRequestByUserIdService = async (userId) => {
    const request = 'SELECT * FROM request WHERE userId=? ORDER BY requestDateTime DESC';
    const [rows] = await dbConnection.query(request, [userId]);
    return rows;
}

const updateRequestStatusService = async (requestId, status) => {
    const updateQuery = 'UPDATE request SET status = ? WHERE id = ?';

    const [result] = await dbConnection.query(updateQuery, [status, requestId]);

    if (result.affectedRows === 0) {
        throw new Error('Request not found or status not updated.');
    }

    return { message: 'Request status updated successfully.' };
};

module.exports = {
    postRequestService,
    getAllRequestService,
    getRequestByUserIdService,
    updateRequestStatusService
}