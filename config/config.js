const mysql = require('mysql2');

// LOCAL DATABASE CONNECTIONS
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'derek',
  password: 'pass',
  database: 'ajowi'
});

const connection = conn.connect();

module.exports = connection;