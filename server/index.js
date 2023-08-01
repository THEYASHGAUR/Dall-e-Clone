import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express app
const app = express();

// Enable CORS and allow JSON data parsing with a limit of 50mb
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Set up routes for handling post-related API requests
app.use('/api/v1/post', postRoutes);

// Set up routes for handling DALL.E-related API requests
app.use('/api/v1/dalle', dalleRoutes);

// Define a route for the root URL (/) to respond with a simple message
app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

// Function to start the server and connect to the MongoDB database
const startServer = async () => {
  try {
    // Connect to the MongoDB database using the MONGODB_URL from the environment variables
    connectDB(process.env.MONGODB_URL);

    // Start the Express server and listen on port 8080
    app.listen(8080, () => console.log('Server started on port localhost:8080'));
  } catch (error) {
    console.log(error);
  }
};

// Call the startServer function to initiate the server
startServer();
