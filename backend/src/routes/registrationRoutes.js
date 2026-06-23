import express from "express";
import {
  registerForEvent,
  getMyEvents,
  getEventAttendees,
} from "../controllers/registrationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All registration routes require authentication
router.use(protect);

// GET /api/registrations/my-events
router.get("/my-events", getMyEvents);

// GET /api/registrations/event/:eventId
router.get("/event/:eventId", getEventAttendees);

// POST /api/registrations/:eventId
router.post("/:eventId", registerForEvent);

export default router;