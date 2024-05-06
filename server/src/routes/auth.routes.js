import express from "express";
import {
  currentUserController,
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

//routes
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/currentuser", isAuthenticated, currentUserController);

export default router;
