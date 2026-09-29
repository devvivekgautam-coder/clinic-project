const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB Connected Successfully.');
    } catch (error) {
        console.log('DB Not Connected:', error.message);
    }
};

module.exports = db;