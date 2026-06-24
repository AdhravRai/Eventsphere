import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import Event from "./src/models/event.js";

dotenv.config();

// How many students to mark present per event
const MIN_PER_EVENT = 4;
const MAX_PER_EVENT = 10;

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const events = await Event.find({ status: "Approved" });
    if (events.length === 0) {
      console.error("No approved events found.");
      process.exit(1);
    }

    const allStudents = await User.find({ role: "student" });
    if (allStudents.length === 0) {
      console.error("No students found. Run seedStudents.js first.");
      process.exit(1);
    }

    for (const event of events) {
      const existingIds = event.attendees.map((a) => a.student.toString());

      const available = allStudents.filter(
        (s) => !existingIds.includes(s._id.toString())
      );

      const count = Math.min(
        randomInt(MIN_PER_EVENT, MAX_PER_EVENT),
        available.length
      );

      // Shuffle and pick `count` students
      const shuffled = available.sort(() => 0.5 - Math.random());
      const chosen = shuffled.slice(0, count);

      chosen.forEach((student) => {
        // Randomly decide if they're already marked present (80% chance)
        // so some show as clickable "Mark Present" buttons too
        const present = Math.random() < 0.8;
        event.attendees.push({ student: student._id, present });
      });

      await event.save();

      console.log(
        `"${event.title}": added ${chosen.length} students (${chosen.filter((c, i) => true).length} total)`
      );
    }

    console.log("Done populating attendees across all approved events.");
    process.exit(0);
  } catch (err) {
    console.error("Failed:", err);
    process.exit(1);
  }
};

run();