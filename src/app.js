const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');  // MongoDB connection for operator service
const operatorRoutes = require('./routes/operatorRoute');  // Ensure this path is correct
const swaggerDocument = require('../swagger/swagger.json');  // Swagger documentation for operator service

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));  // To parse form data (if needed)

// Connect to MongoDB using connectDB from db.js
connectDB();

// Serve Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use operator routes for API endpoints under /operator-service
app.use('/operator-service', operatorRoutes);  // This ensures that all operator routes are prefixed with /operator-service

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Operator Service API!');
});

// Fallback route for undefined paths
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error stack
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
