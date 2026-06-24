import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";

dotenv.config();

const firstNames = [
  "Riya", "Karan", "Ananya", "Vipin", "Priyanshi", "Divit", "Aarav", "Ishita",
  "Rohan", "Sneha", "Aditya", "Kavya", "Arjun", "Meera", "Vivaan", "Diya",
  "Rahul", "Pooja", "Aman", "Tanya", "Sahil", "Nisha", "Yash", "Anjali",
  "Kunal", "Shreya", "Varun", "Neha", "Akshay", "Ritika", "Dev", "Simran",
  "Harsh", "Pallavi", "Nikhil", "Swati", "Manav", "Aditi", "Gaurav", "Komal",
  "Siddharth", "Bhavna", "Tarun", "Juhi", "Aryan", "Khushi", "Mohit", "Esha",
  "Raghav", "Tanvi"
];

const lastNames = [
  "Sharma", "Verma", "Singh", "Razdan", "Kumar", "Srivastav", "Gupta", "Mehta",
  "Patel", "Yadav", "Reddy", "Nair", "Joshi", "Chauhan", "Malhotra", "Kapoor",
  "Agarwal", "Bansal", "Pandey", "Mishra"
];

const generateStudents = (count) => {
  const students = [];
  for (let i = 0; i < count; i++) {
    const first = firstNames[i % firstNames.length];
    const last = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
    const name = `${first} ${last}`;
    const email = `${first.toLowerCase()}.${last.toLowerCase()}${i}@test.com`;
    students.push({ name, email, password: "test123", role: "student" });
  }
  return students;
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    const students = generateStudents(100);

    let created = 0;
    for (const studentData of students) {
      const exists = await User.findOne({ email: studentData.email });
      if (!exists) {
        await User.create(studentData);
        created++;
      }
    }

    console.log(`Seed complete. Created ${created} new students (skipped duplicates).`);
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
};

seed();