import express from "express";
import { register, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/login
router.post("/login", login);

// GET /api/auth/profile — protected route
router.get("/profile", protect, (req, res) => {
  const { _id, name, email, role, createdAt, updatedAt } = req.user;
  return res.status(200).json({
    success: true,
    message: "Authenticated user profile",
    user: {
      id: _id,
      name,
      email,
      role,
      createdAt,
      updatedAt,
    },
  });
});

export default router;