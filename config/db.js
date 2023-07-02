const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();


// LOCAL DATABASE CONNECTIONS
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const connection = conn.connect();

// console.log(conn);

module.exports = conn;