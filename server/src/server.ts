// Import required modules
import express from "express";
import cors from "cors";

// Import routes
import routes from "./routes/index.js";

// Initialize an instance of Express.js
const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

// Middleware to parse URL-encoded data (for form submission)
// app.use(express.urlencoded({ extended: true }));

// Serves static files in the entire client's dist folder
app.use(express.static("../client/dist"));

// Middleware to parse JSON data
app.use(express.json()); // Added to parse JSON bodies

// Use the routes
app.use(routes);

// Handle all other requests by serving the React app
app.get("*", (_req, res) => {
  res.sendFile("../client/dist");
});

// Start the Express.js server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} at http://localhost:${PORT}`);
});
