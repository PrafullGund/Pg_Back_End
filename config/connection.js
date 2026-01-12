const mysql = require('mysql2/promise');
const config = require('./config.json');

const pool = mysql.createPool(config.development); 

module.exports = pool;
