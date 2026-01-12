const dbConnection = require('../config/connection');

const postBreakFastService = async (breakFastData) => {
    const breakFast = 'INSERT INTO breakFast (userId,status,isApproved) VALUES (?,?,?)';
    const [result] = await dbConnection.query(breakFast,
        [
            breakFastData.userId,
            breakFastData.status,
            breakFastData.isApproved
        ]
    );
    return result;
}

const getAllBreakFastService = async (page, limit) => {
    const offset = (page - 1) * limit;

    const [data] = await dbConnection.query(`
        SELECT 
            b.id AS breakfast_id,
            b.status,
            b.isApproved,
            b.userId,
            u.name AS user_name
        FROM 
            breakFast b
        JOIN 
            users u ON b.userId = u.id
        LIMIT ? OFFSET ?
    `, [parseInt(limit), parseInt(offset)]);

    const [countResult] = await dbConnection.query(`
        SELECT COUNT(*) AS total FROM breakFast
    `);

    const [statusSummary] = await dbConnection.query(`
        SELECT status, COUNT(*) AS count
        FROM breakFast
        GROUP BY status
    `);

    const statusCounts = {};
    statusSummary.forEach(row => {
        statusCounts[row.status] = row.count;
    });

    return {
        data,
        total: countResult[0].total,
        summary: statusCounts
    };
};

module.exports = {
    postBreakFastService,
    getAllBreakFastService
}