const mongoose = require('mongoose');
require('dotenv').config();  // Ensure dotenv is loading environment variables

const connectDB = async () => {
  try {
    // Get the MongoDB URI for the operator service from environment variables
    const mongoURI = process.env.MONGO_URI_OPERATOR;

    if (!mongoURI) {
      throw new Error("MONGO_URI_OPERATOR is not defined in .env");
    }

    mongoose.set('strictQuery', true);  // Enable strict query for Mongoose 6+

    // Connect to MongoDB for operator-service
    await mongoose.connect(mongoURI);

    console.log('Operator Service MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);  // Exit the process if MongoDB connection fails
  }
};

module.exports = connectDB;
