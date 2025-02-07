const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", admin.password);

    const isMatch = await bcryptjs.compare(password, admin.password);
    console.log("Password Match:", isMatch);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: admin.role }, "SECRET_KEY", {
      expiresIn: "1h",
    });
    res.json({ token, role: admin.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
