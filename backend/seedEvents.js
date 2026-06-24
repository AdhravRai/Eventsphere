import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./src/models/event.js";
import User from "./src/models/User.js";

dotenv.config();

const events = [
  {
    title: "AI & Machine Learning Bootcamp",
    description: "A hands-on bootcamp covering ML fundamentals, neural networks, and real-world projects.",
    date: "2026-07-10",
    venue: "Computer Science Block, Room 204",
    category: "Technical",
    capacity: 80,
    status: "Approved",
  },
  {
    title: "Web Development Hackathon",
    description: "24-hour hackathon focused on building full-stack web applications using modern frameworks.",
    date: "2026-07-15",
    venue: "Innovation Lab",
    category: "Technical",
    capacity: 60,
    status: "Approved",
  },
  {
    title: "Cybersecurity CTF Challenge",
    description: "Capture The Flag style competitive event focused on ethical hacking and security challenges.",
    date: "2026-07-18",
    venue: "Networking Lab, Block C",
    category: "Technical",
    capacity: 50,
    status: "Pending",
  },
  {
    title: "Robotics & IoT Expo",
    description: "Showcase of student-built robotics and IoT projects with live demonstrations.",
    date: "2026-07-22",
    venue: "Main Auditorium",
    category: "Technical",
    capacity: 100,
    status: "Approved",
  },
  {
    title: "Competitive Programming Contest",
    description: "ICPC-style algorithmic problem-solving contest for individuals and teams.",
    date: "2026-07-25",
    venue: "Computer Lab 1",
    category: "Technical",
    capacity: 70,
    status: "Pending",
  },
  {
    title: "Cultural Fest - Sur Sangam",
    description: "An evening of music, dance, and theatrical performances celebrating diverse cultures.",
    date: "2026-08-01",
    venue: "Open Air Theatre",
    category: "Cultural",
    capacity: 300,
    status: "Approved",
  },
  {
    title: "Annual Drama & Theatre Night",
    description: "Student-directed plays and theatrical performances showcasing dramatic talent.",
    date: "2026-08-05",
    venue: "Main Auditorium",
    category: "Cultural",
    capacity: 150,
    status: "Pending",
  },
  {
    title: "Inter-College Football Championship",
    description: "Knockout-style football tournament between college teams across the region.",
    date: "2026-08-10",
    venue: "University Sports Ground",
    category: "Sports",
    capacity: 200,
    status: "Approved",
  },
  {
    title: "Annual Athletics Meet",
    description: "Track and field events including sprints, relays, long jump, and shot put.",
    date: "2026-08-14",
    venue: "University Sports Complex",
    category: "Sports",
    capacity: 250,
    status: "Pending",
  },
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Use any existing user as the organizer (your admin account works fine for demo data)
    const organizer = await User.findOne();
    if (!organizer) {
      console.error("No users found in database. Register at least one user first.");
      process.exit(1);
    }

    let created = 0;
    for (const eventData of events) {
      const exists = await Event.findOne({ title: eventData.title });
      if (!exists) {
        await Event.create({ ...eventData, organizer: organizer._id });
        created++;
      }
    }

    console.log(`Seed complete. Created ${created} new events (skipped duplicates).`);
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
};

run();