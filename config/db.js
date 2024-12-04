const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});

const db = pool.promise();

// Test the database connection
db.getConnection()
  .then(connection => {
    console.log('Connected to the MySQL database.');
    connection.release(); // release the connection back to the pool
  })
  .catch(err => {
    console.error('Error connecting to the MySQL database:', err);
  });

module.exports = db;
