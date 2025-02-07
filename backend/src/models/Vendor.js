const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const VendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Vendor's name (Required)
    email: { type: String, required: true, unique: true }, // Unique email for login
    password: { type: String, required: true }, // Hashed password for security
    role: { type: String, default: "vendor" }, // Default role set to 'vendor'
  },
  { timestamps: true }
); // Automatically adds createdAt & updatedAt fields

VendorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified
  this.password = await bcryptjs.hash(this.password, 10); // Hash the password
  next();
});

module.exports = mongoose.model("Vendor", VendorSchema);
