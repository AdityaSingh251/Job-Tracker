/* jshint esversion:11*/
const express= require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../backend/config/db.js");
require("dotenv").config({path:"./backend/.env"});
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api",(req,res)=> res.send("Job Tracker API is running..."));
app.use("/api/auth", require("./routes/authRoutes.js"));
app.use("/api/jobs", require("./routes/jobRoutes"));

const PORT  = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`server running on port ${PORT}`));

module.exports=app;