import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import {
  submitPayment,
  getPendingPayments,
  verifyPayment,
  rejectPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", protect, submitPayment);

// Specific routes before any "/:id" patterns
router.get("/pending", protect, isAdmin, getPendingPayments);

router.put("/:id/verify", protect, isAdmin, verifyPayment);
router.put("/:id/reject", protect, isAdmin, rejectPayment);

export default router;