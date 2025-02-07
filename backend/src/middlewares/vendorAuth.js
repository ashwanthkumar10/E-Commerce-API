const jwt = require("jsonwebtoken");

const vendorAuth = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token provided" });

    // Verify the token and decode user details
    const decoded = jwt.verify(token, "SECRET_KEY");

    // Check if the role is 'vendor'
    if (decoded.role !== "vendor")
      return res.status(403).json({ message: "Access denied" });

    // Attach vendor details to the request object
    req.vendor = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = vendorAuth;
