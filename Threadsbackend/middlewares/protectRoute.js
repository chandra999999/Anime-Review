const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Assuming you have the User model
const cookieParser = require('cookie-parser');
const express = require("express");
const app = express();


const protectRoute = async (req, res, next) => {

 const token = req.cookies.token; // Updated variable n
  if (!token) {
    return res.status(401).json({ message: "Login first" });
  }

  try {
    const decoded = jwt.verify(token, "wef");
    console.log(decoded)
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach the user object to the request for future middleware or route handlers
    req.user = user;
    next();
  } catch (error) {
    // Handle token verification errors
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { protectRoute };
