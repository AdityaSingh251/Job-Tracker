const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const Job = require("../models/Job");

// ✅ GET all jobs
router.get("/", protect, async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST create job
router.post("/", protect, async (req, res) => {
  try {
    const { company, role, status } = req.body;

    if (!company || !role) {
      return res.status(400).json({ message: "Company and role required" });
    }

    const job = await Job.create({
      user: req.user._id, // ✅ FIX HERE
      company,
      role,
      status: status || "Applied",
    });

    res.status(201).json({ message: "Job added ✅", job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put("/:id", protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    // ✅ only logged in user can update
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    job.status = req.body.status || job.status;
    await job.save();

    res.json({ message: "Job updated ✅", job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.delete("/:id", protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    // ✅ only logged in user can delete
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await job.deleteOne();

    res.json({ message: "Job deleted ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
