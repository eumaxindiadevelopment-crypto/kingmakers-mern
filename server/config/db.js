const mysql = require('mysql2/promise');

let pool;

const connectDB = async () => {
    try {
        console.log('⏳ Connecting to MySQL...');
        pool = mysql.createPool({
            host: process.env.MYSQL_HOST || 'localhost',
            user: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASS || '',
            database: process.env.MYSQL_DB || 'kingmakersiasacademy',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            timezone: '+00:00',
            charset: 'utf8mb4',
        });

        // Verify the connection is alive
        const conn = await pool.getConnection();
        console.log(`✅ MySQL Connected: ${process.env.MYSQL_HOST || 'localhost'}/${process.env.MYSQL_DB || 'kingmakersiasacademy'}`);
        conn.release();
    } catch (error) {
        console.error(`❌ MySQL Connection Error [${error.code}]: ${error.message}`);
    }
};

const getPool = () => {
    if (!pool) throw new Error('MySQL pool not initialised. Call connectDB() first.');
    return pool;
};

module.exports = { connectDB, getPool };
