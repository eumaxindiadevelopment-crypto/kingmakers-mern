const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
    try {
        console.log('Testing connection to:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Success: Connected to MongoDB!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error: Could not connect to MongoDB:', err.message);
        process.exit(1);
    }
};

testConnection();
