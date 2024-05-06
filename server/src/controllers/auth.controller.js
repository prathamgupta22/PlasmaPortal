import bcrypt from "bcrypt";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

//REGISTER || POST
const registerController = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    //validation
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    // Create a new user
    const newUser = new User(req.body);
    // Save the new user to the database
    await newUser.save();
    return res.status(201).send({
      success: true,
      message: "user registered successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};

//LOGIN
const loginController = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!comparePassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user: { _id: user._id, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};

// GET CURRENT USER
const currentUserController = async (req, res) => {
  try {
    // Fetch user from request object, as set by isAuthenticated middleware
    const user = req.user;

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unable to get current user",
      error: error.message,
    });
  }
};

export { registerController, loginController, currentUserController };
