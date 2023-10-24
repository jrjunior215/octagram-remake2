// const mysql = require('mysql2');
// const dbConnection = mysql.createPool({
//     host     : 'localhost', // MYSQL HOST NAME
//     user     : 'root', // MYSQL USERNAME
//     password : '', // MYSQL PASSWORD
//     database : 'octagram_db2' // MYSQL DB NAME
// }).promise();

// const mysql = require('mysql2');
// const dbConnection = mysql.createPool({
//     host     : 'localhost', // MYSQL HOST NAME
//     user     : 'root', // MYSQL USERNAME
//     socketPath: '/var/run/mysqld/mysqld.sock',
//     password : '123qwe', // MYSQL PASSWORD
//     database : 'octagram_db2' // MYSQL DB NAME
// }).promise();

const mysql = require('mysql2');
const dbConnection = mysql.createPool({
    host     : '202.28.34.205', // MYSQL HOST NAME
    user     : '63011211049', // MYSQL USERNAME
    password : '63011211049', // MYSQL PASSWORD
    database : 'db63011211049' // MYSQL DB NAME
}).promise();

module.exports = dbConnection;
