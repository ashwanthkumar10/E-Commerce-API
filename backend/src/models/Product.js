const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  oldPrice: { type: Number, required: true, default: 0 },
  newPrice: { type: Number, required: true, default: 0 },
  deliveryAmount: { type: Number, required: true, default: 0 },
  expiryDate: { type: Date, required: true },
  url: { type: String, required: true, unique: true, index: true }, // Ensure uniqueness
});

// Format and return product data with discount calculations
ProductSchema.methods.getFormattedData = function () {
  const discountAmount =
    this.oldPrice > 0 ? (this.oldPrice - this.newPrice).toFixed(2) : "0.00";
  const discountPercentage =
    this.oldPrice > 0
      ? (((this.oldPrice - this.newPrice) / this.oldPrice) * 100).toFixed(2)
      : "0.00";

  return {
    name: this.name,
    vendor: this.vendor, // Will be populated in queries
    expiryDate: this.expiryDate,
    oldPrice: this.oldPrice.toFixed(2),
    newPrice: this.newPrice.toFixed(2),
    discountPercentage,
    discountAmount,
    deliveryAmount: this.deliveryAmount.toFixed(2),
    url: this.url,
  };
};

module.exports = mongoose.model("Product", ProductSchema);
