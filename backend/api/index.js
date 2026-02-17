const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("../config/db");
const authRoutes = require("../routes/authRoutes");
const jobRoutes = require("../routes/jobRoutes");

const app = express();

// ✅ connect db (only once)
connectDB();

app.use(cors({
  origin: "https://job-tracker-ikyfrontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://job-tracker-ikyfrontend.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Job Tracker API running ✅");
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

module.exports = app;
