const express = require("express");
const router = express.Router();

const { register,login } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/login
router.post("/login", login);

// GET /api/auth/profile  — protected route
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

module.exports = router;