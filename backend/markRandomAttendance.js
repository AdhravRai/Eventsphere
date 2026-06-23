import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import Event from "./src/models/event.js";

dotenv.config();

// CHANGE THIS to the event you want to mark attendance for
const EVENT_ID = "6a3a6929a5c26e5d786072c4";

// How many random students to mark present
const COUNT = 6;

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const event = await Event.findById(EVENT_ID);
    if (!event) {
      console.error("Event not found with that ID");
      process.exit(1);
    }

    const students = await User.aggregate([
      { $match: { role: "student" } },
      { $sample: { size: COUNT } },
    ]);

    if (students.length === 0) {
      console.error("No students found. Run seedStudents.js first.");
      process.exit(1);
    }

    students.forEach((student) => {
      const existing = event.attendees.find(
        (a) => a.student.toString() === student._id.toString()
      );
      if (existing) {
        existing.present = true;
      } else {
        event.attendees.push({ student: student._id, present: true });
      }
    });

    await event.save();

    console.log(`Marked ${students.length} students present on "${event.title}":`);
    students.forEach((s) => console.log(`  - ${s.name} (${s.email})`));

    process.exit(0);
  } catch (err) {
    console.error("Failed:", err);
    process.exit(1);
  }
};

run();