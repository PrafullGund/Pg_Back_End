const dbConnection = require('../config/connection');

const postDinnerService = async (dinnerData) => {
    const dinner = 'INSERT INTO dinner (userId,status,isApproved) VALUES (?,?,?)';
    const [result] = await dbConnection.query(dinner,
        [
            dinnerData.userId,
            dinnerData.status,
            dinnerData.isApproved
        ]
    );
    return result;
}

const getAllDinnerService = async (page, limit) => {
    const offset = (page - 1) * limit;

    const [data] = await dbConnection.query(`
        SELECT 
            b.id AS dinner_id,
            b.status,
            b.isApproved,
            b.userId,
            u.name AS user_name
        FROM 
            dinner b
        JOIN 
            users u ON b.userId = u.id
        LIMIT ? OFFSET ?
    `, [parseInt(limit), parseInt(offset)]);

    const [countResult] = await dbConnection.query(`
        SELECT COUNT(*) AS total FROM dinner
    `);

    const [statusSummary] = await dbConnection.query(`
        SELECT status, COUNT(*) AS count
        FROM dinner
        GROUP BY status
    `);

    const statusCounts = {};
    statusSummary.forEach(row => {
        statusCounts[row.status] = row.count;
    });

    return { data, total: countResult[0].total, summary: statusCounts };
};

module.exports = {
    postDinnerService,
    getAllDinnerService
}