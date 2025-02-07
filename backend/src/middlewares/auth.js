const jwt = require("jsonwebtoken");

// Middleware to verify token and extract user details
const verifyToken = (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract Bearer token
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, "SECRET_KEY"); // Verify token
    return decoded; // Return user data if valid
  } catch (error) {
    return null; // Return null if invalid token
  }
};

// Admin Authorization Middleware
const adminAuth = (req, res, next) => {
  const decoded = verifyToken(req, res);
  if (!decoded) return res.status(401).json({ message: "Invalid token" });

  if (decoded.role !== "admin")
    return res.status(403).json({ message: "Access denied" });

  req.user = decoded; // Store user details in request
  next();
};

// Staff Authorization Middleware
const staffAuth = (req, res, next) => {
  const decoded = verifyToken(req, res);
  if (!decoded) return res.status(401).json({ message: "Invalid token" });

  if (decoded.role !== "admin" && decoded.role !== "staff") {
    return res.status(403).json({ message: "Access denied" });
  }

  req.user = decoded; // Store user details in request
  next();
};

module.exports = { adminAuth, staffAuth };
