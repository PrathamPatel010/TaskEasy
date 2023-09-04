const mongoose = require('mongoose');

const connectDb = async() => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`Database connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = { connectDb };