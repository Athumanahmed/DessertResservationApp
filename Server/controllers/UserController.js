import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  try {
    const { phone, email, password } = req.body;
    const existing = await UserModel.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already in use." });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({ phone, email, password: hashed });

    res.status(201).json({
      success: true,
      message: "User created",
      data: newUser,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      success: true,
      message: "user logged in",
      data: user,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "User profile fetched",
      data: req.user, // setting by middleware
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: error.message });
  }
};
