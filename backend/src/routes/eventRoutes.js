import express from "express";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  approveEvent,
  rejectEvent,
  getPendingEvents,
  markAttendance,
  registerForEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/", protect, createEvent);
router.get("/", getAllEvents);

// Specific routes MUST come before "/:id" or Express will treat them as an id
router.get("/pending", protect, isAdmin, getPendingEvents);

router.get("/:id", getEventById);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

router.put("/:id/approve", protect, isAdmin, approveEvent);
router.put("/:id/reject", protect, isAdmin, rejectEvent);

router.post("/:id/register", protect, registerForEvent);

router.put("/:id/attendance", protect, isAdmin, markAttendance);

export default router;