const express = require("express");
const Product = require("../models/Product");
const { authMiddleware, staffAuth } = require("../middlewares/auth");

const router = express.Router();

// Staff can view all products
router.get("/products", authMiddleware, staffAuth, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Staff can add products (for assigned vendors)
router.post("/products", authMiddleware, staffAuth, async (req, res) => {
  try {
    const { name, description, category, price, vendor } = req.body;
    const product = await Product.create({
      name,
      description,
      category,
      price,
      vendor,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
