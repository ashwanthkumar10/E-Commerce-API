const express = require("express"); 
const bcryptjs = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 
const Vendor = require("../models/Vendor"); 
const vendorAuth = require("../middlewares/vendorAuth"); 

const router = express.Router(); 


router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the vendor already exists
        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) {
            return res.status(400).json({ message: "Vendor already exists" });
        }

        // Create a new vendor and save to database
        const vendor = new Vendor({ name, email, password });
        await vendor.save();

        res.status(201).json({ message: "Vendor registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find vendor by email
        const vendor = await Vendor.findOne({ email });
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        // Compare passwords
        const isMatch = await bcryptjs.compare(password, vendor.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: vendor._id, role: vendor.role },
            "SECRET_KEY",
            { expiresIn: "1h" }
        );

        res.json({ token, role: vendor.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 
