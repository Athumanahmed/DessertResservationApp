import express from "express";
import {
  getProfile,
  loginUser,
  registerUser,
} from "../controllers/UserController.js";
import { requireAuth } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", requireAuth, getProfile);
export default router;
