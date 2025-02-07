const express = require("express");
const Product = require("../models/Product");
const userAuth = require("../middlewares/userAuth");

const router = express.Router();

// View all products with details
router.get("/products", userAuth, async (req, res) => {
  try {
    let { page, limit, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const query = search ? { name: new RegExp(search, "i") } : {};

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate("vendor", "name email")
      .skip((page - 1) * limit)
      .limit(limit);

    // Format the response
    const formattedProducts = products.map((product) =>
      product.getFormattedData()
    );

    res.json({
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      totalProducts,
      products: formattedProducts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
