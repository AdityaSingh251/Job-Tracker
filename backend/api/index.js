const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("../config/db");
const authRoutes = require("../backend/routes/authRoutes");
const jobRoutes = require("../backend/routes/jobRoutes");

const app = express();

// ✅ connect db (only once)
connectDB();

app.use(cors());
app.use(express.json());

app.get("https://job-tracker-backend-lovatbackend.vercel.app/api", (req, res) => {
  res.send("Job Tracker API running ✅");
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

module.exports = app;
