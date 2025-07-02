const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load secret keys from .env

const app = express();
app.use(cors()); // Allow frontend to access backend
app.use(express.json()); // Parse JSON from frontend

// Import and use summarizer route
const summarizer = require("./summarizer.controller");
app.post("/api/summarize", summarizer);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
