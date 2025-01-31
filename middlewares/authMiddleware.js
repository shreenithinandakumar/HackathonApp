const jwt = require('jsonwebtoken');
const User = require("../models/User");

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    console.log("User from token:", req.user); // Debugging

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized. No valid user ID found." });
    }

    const user = await User.findById(req.user.id); // FIXED: Corrected userId
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //const user = await User.findById(req.user.id);
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    next();
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error checking admin access" });
  }
};

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized, token missing' });
    }

    const token = authHeader.split(' ')[1];
    console.log("Token:", token);
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in `.env`
    req.user = { id: decoded.userId, role: decoded.role };

    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized, invalid token' });
  }
};


// Middleware to check user roles
const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
      try {
        // Check if the user's role matches the required role
        if (req.user.role !== requiredRole) {
          return res.status(403).json({ error: 'Forbidden: Access denied' });
        }
        next(); // User has the required role, proceed
      } catch (error) {
        return res.status(403).json({ error: 'Forbidden: Role verification failed' });
      }
    };
};

module.exports = {verifyToken, authorizeRole, isAdmin};
