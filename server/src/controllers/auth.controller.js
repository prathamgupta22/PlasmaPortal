import bcrypt from "bcrypt";
import { User } from "../models/user.models.js";

//REGISTER
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

export { registerController };
