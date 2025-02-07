const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Staff = require("../models/Staff");

const router = express.Router();

// Register Staff
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingStaff = await Staff.findOne({ email });

    if (existingStaff)
      return res.status(400).json({ message: "Staff already exists" });

    const hashedPassword = await bcryptjs.hash(password, 10);
    const staff = await Staff.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Staff registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Staff
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const staff = await Staff.findOne({ email });

    if (!staff) return res.status(404).json({ message: "Staff not found" });

    const isMatch = await bcryptjs.compare(password, staff.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: staff._id, role: staff.role }, "SECRET_KEY", {
      expiresIn: "1h",
    });
    res.json({ token, role: staff.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
