const express= require("express");
const cors = require("cors");
const dotenv = require("dotenv");
let connectDB = require("../backend/config/db.js");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();

const app = require("./api/index.js");
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.get("/",(req,res)=> res.send("Job Tracker API is running..."));
app.use("/api/auth", require("../backend/routes/authRoutes.js"));
app.use("/api/jobs", require("../backend/routes/jobRoutes"));

const PORT  = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`server running on port ${PORT}`));

module.exports=app;
