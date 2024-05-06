import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Optional chaining operator to avoid errors if authorization header is missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login first to access this route",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      error: error.message,
      message: "Auth failed",
    });
  }
};

export default isAuthenticated;
