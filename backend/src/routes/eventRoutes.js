import express from "express";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { approveEvent, rejectEvent, getPendingEvents } from "../controllers/eventController.js";

router.get("/pending", protect, isAdmin, getPendingEvents);
router.put("/:id/approve", protect, isAdmin, approveEvent);
router.put("/:id/reject", protect, isAdmin, rejectEvent);
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createEvent);

router.get("/", getAllEvents);

router.get("/:id", getEventById);

router.put("/:id", protect, updateEvent);

router.delete("/:id", protect, deleteEvent);

export default router;
