import express from "express";
import {
  getProfile,
  loginUser,
  registerUser,
} from "../controllers/UserController.js";
import { requireAuth } from "../middlewares/AuthMiddleware.js";
import {
  addReservation,
  deleteReservation,
  getUserReservations,
} from "../controllers/ReservationController.js";

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", requireAuth, getProfile);

// reservation rooutes
router.post("/reserve", requireAuth, addReservation);
router.get("/user-reservations", requireAuth, getUserReservations);
router.delete("/:recipeId", requireAuth, deleteReservation);
export default router;
