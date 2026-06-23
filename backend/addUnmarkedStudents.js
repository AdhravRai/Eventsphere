import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import Event from "./src/models/event.js";

dotenv.config();

// CHANGE THIS to the event you want to add unmarked attendees to
const EVENT_ID = "6a3a6929a5c26e5d786072c4";

// How many random NEW students to add (not yet marked present)
const COUNT = 3;

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const event = await Event.findById(EVENT_ID);
    if (!event) {
      console.error("Event not found with that ID");
      process.exit(1);
    }

    const existingIds = event.attendees.map((a) => a.student.toString());

    const students = await User.aggregate([
      { $match: { role: "student", _id: { $nin: event.attendees.map((a) => a.student) } } },
      { $sample: { size: COUNT } },
    ]);

    if (students.length === 0) {
      console.error("No new students available to add.");
      process.exit(1);
    }

    students.forEach((student) => {
      event.attendees.push({ student: student._id, present: false });
    });

    await event.save();

    console.log(`Added ${students.length} students (NOT marked present yet) to "${event.title}":`);
    students.forEach((s) => console.log(`  - ${s.name} (${s.email})`));

    process.exit(0);
  } catch (err) {
    console.error("Failed:", err);
    process.exit(1);
  }
};

run();