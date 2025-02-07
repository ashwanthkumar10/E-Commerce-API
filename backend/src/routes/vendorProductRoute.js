const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");
const vendorAuth = require("../middlewares/vendorAuth");

const router = express.Router(); 

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // Set upload directory
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname), // Set filename
});
const upload = multer({ storage });

router.post("/", vendorAuth, upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      oldPrice,
      freeDelivery,
      deliveryAmount,
      uniqueURL,
    } = req.body;
    const vendorId = req.vendor.id; // Get vendor ID from token

    const product = new Product({
      name,
      description,
      category,
      price,
      oldPrice,
      freeDelivery,
      deliveryAmount,
      uniqueURL,
      vendor: vendorId, // Store vendor ID
      imageUrl: `/uploads/${req.file.filename}`,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", vendorAuth, upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      category,
      price,
      oldPrice,
      freeDelivery,
      deliveryAmount,
      uniqueURL,
    } = req.body;
    const vendorId = req.vendor.id;

    const product = await Product.findOne({ _id: id, vendor: vendorId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.price = price || product.price;
    product.oldPrice = oldPrice || product.oldPrice;
    product.freeDelivery = freeDelivery;
    product.deliveryAmount = deliveryAmount;
    product.uniqueURL = uniqueURL || product.uniqueURL;
    if (req.file) product.imageUrl = `/uploads/${req.file.filename}`;

    await product.save();
    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", vendorAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const vendorId = req.vendor.id;

    const product = await Product.findOne({ _id: id, vendor: vendorId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/", vendorAuth, async (req, res) => {
  try {
    const vendorId = req.vendor.id;
    const products = await Product.find({ vendor: vendorId });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 
