import Event from "../models/Event.js";

// POST /api/registrations/:eventId
export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Event must be approved
    if (event.status !== "Approved") {
      return res.status(400).json({
        success: false,
        message: "Registration is only open for approved events",
      });
    }

    // Organizer cannot register for own event
    if (
      event.organizer &&
      event.organizer.toString() === userId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "Organizers cannot register for their own events",
      });
    }

    // Capacity check
    if (event.attendees.length >= event.capacity) {
      return res.status(400).json({
        success: false,
        message: "Event is fully booked. No seats available",
      });
    }

    // Duplicate registration check
    const alreadyRegistered = event.attendees.some(
      (attendee) =>
        attendee.student.toString() === userId.toString()
    );

    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: "You are already registered for this event",
      });
    }

    // Register user
    event.attendees.push({
      student: userId,
    });

    await event.save();

    return res.status(201).json({
      success: true,
      message: "Successfully registered for the event",
      data: {
        eventId: event._id,
        title: event.title,
        date: event.date,
        venue: event.venue,
        totalAttendees: event.attendees.length,
      },
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/registrations/my-events
export const getMyEvents = async (req, res) => {
  try {
    const userId = req.user._id;

    const events = await Event.find({
      "attendees.student": userId,
    }).select(
      "title description date venue category status organizer capacity attendees"
    );

    if (!events.length) {
      return res.status(200).json({
        success: true,
        message: "You have not registered for any events yet",
        data: [],
      });
    }

    const data = events.map((event) => ({
      id: event._id,
      title: event.title,
      description: event.description,
      date: event.date,
      venue: event.venue,
      category: event.category,
      status: event.status,
      organizer: event.organizer,
      capacity: event.capacity,
      registeredCount: event.attendees.length,
    }));

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/registrations/event/:eventId
export const getEventAttendees = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { role, _id: userId } = req.user;

    if (role !== "organizer" && role !== "admin") {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. Only organizers and admins can view attendees",
      });
    }

    const event = await Event.findById(eventId).populate(
      "attendees.student",
      "name email role"
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Organizer can only access their own events
    if (
      role === "organizer" &&
      event.organizer.toString() !== userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You can only view attendees for your own events",
      });
    }

    const attendees = event.attendees
      .filter((entry) => entry.student)
      .map((entry) => ({
        id: entry.student._id,
        name: entry.student.name,
        email: entry.student.email,
        role: entry.student.role,
        present: entry.present,
      }));

    return res.status(200).json({
      success: true,
      event: {
        id: event._id,
        title: event.title,
        date: event.date,
        venue: event.venue,
        capacity: event.capacity,
        registeredCount: attendees.length,
      },
      count: attendees.length,
      data: attendees,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};