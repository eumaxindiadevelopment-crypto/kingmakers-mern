const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Error: ${error.message}`);
        console.error('⚠️  Server running WITHOUT database. Update MONGO_URI in server/.env');
        // Don't exit — let server stay alive
    }
};

module.exports = connectDB;
