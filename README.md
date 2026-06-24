# EventSphere 🎉

> A Full-Stack MERN-Based College Event Management Platform

EventSphere is a centralized platform that simplifies event creation, approval, registration, and management within educational institutions. The platform enables students to discover and register for events, organizers to manage events efficiently, and administrators to maintain quality through an approval workflow.

---

## 🚀 Project Overview

Traditional college event management often relies on fragmented tools such as Google Forms, spreadsheets, emails, and messaging groups. EventSphere solves this problem by providing a unified platform for event discovery, registration, approval, and management.

### Key Objectives

* Streamline event management processes
* Improve student participation
* Prevent duplicate registrations
* Ensure event quality through approval workflows
* Provide secure role-based access control
* Create a scalable and maintainable system

---

# 👥 Team Information

### Team Name

**Agastya**

### Track

**AI + Web Development**

### Theme

**EventSphere (College Event Management Platform)**

### Team Code

`TEAM_7R8BSC`

### Team Members

| Member                    | Contribution                                         |
| ------------------------- | ---------------------------------------------------- |
| **Vipin Kumar**           | Team Lead, Project Frontend Development and UI/UX    |
| **Akash Sikarwar**        | Admin Dashboard, API Design, Database Management     |
| **Adhrav Rai**            | Backend Development Lead                             |
| **Divit Razdan**          | Event Management and Technical Documentation Lead    |

---

# ✨ Features

## 👤 Student Features

* User Registration & Login
* Browse Upcoming Events
* Search & Filter Events
* View Event Details
* Register for Events
* Cancel Registrations
* View Registered Events
* Personalized Dashboard

## 🏢 Organizer Features

* Create Events
* Edit Event Details
* Delete Events
* Manage Registrations
* View Event Statistics
* Track Participants

## 🛡️ Admin Features

* Approve or Reject Events
* Manage Users
* Monitor Platform Activity
* Moderate Event Content

## 🔒 Security Features

* JWT Authentication
* Password Hashing using bcrypt
* Protected API Routes
* Role-Based Access Control (RBAC)
* Input Validation
* Error Handling Middleware

---

# 🏗️ System Architecture

```text
┌─────────────────────┐
│      Frontend       │
│   React + Vite UI   │
└──────────┬──────────┘
           │ REST API
           ▼
┌─────────────────────┐
│      Backend        │
│  Node.js + Express  │
└──────────┬──────────┘
           │
    ┌──────┼──────┐
    │      │      │
    ▼      ▼      ▼
 Auth   Events  Registrations
(JWT)  Module     Module

           │
           ▼
┌─────────────────────┐
│      MongoDB        │
│     Database        │
└─────────────────────┘
```

---

# 🔐 Authentication Flow

```text
User Login
    │
    ▼
Backend Validates Credentials
    │
    ▼
JWT Token Generated
    │
    ▼
Token Stored on Client
    │
    ▼
Protected API Request
    │
    ▼
JWT Verification Middleware
    │
    ▼
Authorized Access
```

---

# 🗄️ Database Relationships

```text
User (1)
   │
   │
   ▼
Registration
   ▲
   │
   │
Event (1)
```

### User

```javascript
{
  name,
  email,
  password,
  role
}
```

### Event

```javascript
{
  title,
  description,
  location,
  date,
  capacity,
  organizer,
  status
}
```

### Registration

```javascript
{
  userId,
  eventId,
  registrationDate
}
```

---

# 🚧 Key Challenges Solved

## 1. Duplicate Registrations

### Problem

Multiple requests from the same user could create duplicate registrations.

### Solution

```javascript
RegistrationSchema.index(
  { userId: 1, eventId: 1 },
  { unique: true }
);
```

### Impact

* Prevents duplicate registrations
* Handles concurrent requests safely
* Maintains database integrity

---

## 2. Event Approval Workflow

### Problem

Unverified events should not be visible to students.

### Solution

```text
Draft
  │
  ▼
Pending Approval
  │
  ▼
Approved / Rejected
```

### Impact

* Better moderation
* Improved event quality
* Reduced spam submissions

---

## 3. Role-Based Access Control (RBAC)

### Problem

Different users require different permissions.

### Solution

| Role      | Access                           |
| --------- | -------------------------------- |
| Student   | View & Register Events           |
| Organizer | Create & Manage Events           |
| Admin     | Approve Events & Manage Platform |

### Impact

* Enhanced security
* Controlled access
* Scalable permission management

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* React Router
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt.js

## Development Tools

* Git
* GitHub
* VS Code
* Postman

---

# 📂 Project Structure

```text
EventSphere/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── docs/
├── README.md
└── .gitignore
```

---

# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/your-username/EventSphere.git
cd EventSphere
```

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

## 3. Configure Environment Variables

Create a `.env` file inside backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

## 4. Start Backend

```bash
npm run dev
```

## 5. Install Frontend Dependencies

```bash
cd frontend
npm install
```

## 6. Start Frontend

```bash
npm run dev
```

---

# 📡 API Examples

## Register User

### Request

```http
POST /api/auth/register
```

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

### Response

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## Login User

### Request

```http
POST /api/auth/login
```

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "name": "John Doe",
    "role": "student"
  }
}
```

---

## Create Event

### Request

```http
POST /api/events
```

```json
{
  "title": "Hackathon 2026",
  "description": "24-hour coding competition",
  "location": "MMMUT",
  "date": "2026-08-15",
  "capacity": 500
}
```

### Response

```json
{
  "success": true,
  "message": "Event created successfully",
  "status": "pending"
}
```

---

## Register For Event

### Request

```http
POST /api/registrations
```

```json
{
  "eventId": "event123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Registration successful"
}
```

### Duplicate Registration Response

```json
{
  "success": false,
  "message": "User already registered for this event"
}
```

---

# 🔄 Event Lifecycle

```text
Organizer Creates Event
          │
          ▼
Pending Approval
          │
          ▼
Admin Review
     ┌────┴────┐
     │         │
     ▼         ▼
Approved   Rejected
     │
     ▼
Visible to Students
     │
     ▼
Student Registration
     │
     ▼
Event Participation
```

---

# 🧪 Testing

* Authentication Testing
* Event Management Testing
* Registration Flow Testing
* API Testing using Postman
* Duplicate Registration Testing
* Authorization & RBAC Testing

---

# 🔮 Future Enhancements

* QR Code Event Check-In
* AI-Based Event Recommendations
* Real-Time Notifications
* Email Reminders
* Event Analytics Dashboard
* Mobile Application
* Payment Gateway Integration

---

# 📸 Screenshots

## Home Page

*Add screenshot here*

## Event Dashboard

*Add screenshot here*

## Event Details Page

*Add screenshot here*

## Admin Panel

*Add screenshot here*

---

# 🤝 Contributing

1. Fork the repository

```bash
git checkout -b feature-name
```

2. Commit changes

```bash
git commit -m "Add new feature"
```

3. Push changes

```bash
git push origin feature-name
```

4. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 🙏 Acknowledgements

We would like to thank our mentors, peers, and the open-source community for their guidance and support throughout the development of EventSphere.

---

## 🚀 Developed by Team Agastya

**Vipin Kumar • Akash Sikarwar • Adhrav Rai • Divit Razdan**
