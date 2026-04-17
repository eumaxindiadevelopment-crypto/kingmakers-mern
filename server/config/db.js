const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('⏳ Attempting to connect to MongoDB...');
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.error('⚠️  Make sure MONGO_URI is correctly set in Render environment variables.');
        // Don't exit — let server stay alive
    }
};

module.exports = connectDB;
