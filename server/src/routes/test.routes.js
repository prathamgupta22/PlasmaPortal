import express from "express";
import { testController } from "../controllers/test.controller.js";

// Router object
const router = express.Router();

// Routes
router.get("/", testController);

export default router;
