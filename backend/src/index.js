const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./lib/db.js");
const createSuperAdmin = require("./createSuperAdmin.js");

// Import all role-based authentication and routes
const adminAuthRoutes = require("./routes/adminAuth");

const vendorAuthRoutes = require("./routes/vendorRoutes");
const userAuthRoutes = require("./routes/userRoutes");
const staffRoutes = require("./routes/staffRoutes");

// Import product-related routes
const productRoutes = require("./routes/productRoutes");

// Import user-related routes
const userProductRoutes = require("./routes/userProductRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Super Admin is created
createSuperAdmin();

// Role-based authentication routes
app.use("/api/admin", adminAuthRoutes);
app.use("/api/staff", staffRoutes);

app.use("/api/vendor", vendorAuthRoutes);
app.use("/api/user", userAuthRoutes);

// Product-related routes
app.use("/api/products", productRoutes);

// User-related routes
app.use("/api/users", userRoutes);
app.use("/api/user-products", userProductRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
  connectDB();
});
