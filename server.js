const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");
const emailRoutes = require("./routes/email");

// Allow requests from specific origin
const corsOptions = {
  origin: process.env.ALLOWED_ACCESS_ORIGIN,
  optionsSuccessStatus: 200, // For legacy browser support
};

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Use cors middleware with options
app.use(cors(corsOptions));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
