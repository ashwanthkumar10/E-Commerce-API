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

    // Construct search query (search by name, vendor name, or URL)
    const query = search
      ? {
          $or: [
            { name: new RegExp(search, "i") },
            { url: new RegExp(search, "i") },
          ],
        }
      : {};

    // Get total products count for pagination
    const totalProducts = await Product.countDocuments(query);
    if (totalProducts === 0) {
      return res.json({ message: "No products found", products: [] });
    }

    // Ensure page number doesn't exceed available pages
    const totalPages = Math.ceil(totalProducts / limit);
    if (page > totalPages) page = totalPages;

    // Fetch paginated products
    const products = await Product.find(query)
      .populate("vendor", "name email")
      .skip((page - 1) * limit)
      .limit(limit);

    // Format the response
    const formattedProducts = products.map((product) =>
      product.getFormattedData()
    );

    res.json({
      totalPages,
      currentPage: page,
      totalProducts,
      products: formattedProducts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
