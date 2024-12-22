// Import the app from app.js (or operator app)
const app = require('./src/app');  // Adjust path as needed

const dotenv = require('dotenv');  // To load environment variables from .env file
dotenv.config();  // Load environment variables

// Define the port from environment variables or default to 8087
const PORT = process.env.PORT || 8087;

// Start the Express server
app.listen(PORT, () => {
  console.log(`Operator Service is running on http://localhost:${PORT}`);
});
