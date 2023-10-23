// const mysql = require('mysql2');
// const dbConnection = mysql.createPool({
//     host     : 'sql.freedb.tech', // MYSQL HOST NAME
//     user     : 'freedb_octagram_admin', // MYSQL USERNAME
//     password : 'C&fpa*SE%%S947#', // MYSQL PASSWORD
//     database : 'freedb_octagram' // MYSQL DB NAME
// }).promise();

const mysql = require('mysql2');
const dbConnection = mysql.createPool({
    host     : 'localhost', // MYSQL HOST NAME
    user     : 'root', // MYSQL USERNAME
    password : '', // MYSQL PASSWORD
    database : 'octagram_db2' // MYSQL DB NAME
}).promise();

module.exports = dbConnection;