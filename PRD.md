# EventSphere - College Event Management System

## Product Requirements Document (PRD)

**Project Name:** EventSphere
**Project Type:** Web-Based MERN Application
**Release:** Phase 1 MVP

---

# 1. Product Vision

## Problem Statement

Most colleges currently manage events through WhatsApp groups, Google Forms, spreadsheets, and manual attendance processes. This fragmented approach leads to:

* Duplicate registrations
* Poor participant communication
* Attendance fraud and inaccuracies
* Manual certificate generation
* Lack of centralized event data
* No meaningful participation analytics

As the number of events increases, administration and event coordinators face growing challenges in managing registrations, attendance, approvals, and participant engagement.

---

## What Are We Building?

A centralized College Event Management Platform that enables students, organizers, faculty coordinators, and administrators to manage the complete lifecycle of events:

* Event creation
* Event approval
* Registration management
* Attendance verification
* Certificate generation
* Analytics and reporting

---

## Why Are We Building It?

To create a single trusted platform for all campus events that:

* Reduces administrative workload
* Improves student participation
* Streamlines event operations
* Increases transparency
* Automates repetitive tasks
* Provides actionable insights through analytics

---

## Target Users

### Students

* Discover events
* Register for events
* Track participation history
* Download certificates

### Organizers

* Create and manage events
* Monitor registrations
* Track attendance

### Faculty Coordinators

* Review and approve events
* Monitor event quality

### Administrators

* Manage platform users
* Generate reports
* Oversee platform activity

---

# 2. Business Goals

## Primary Goals

* Digitize event management processes
* Improve event participation rates
* Reduce manual administrative work
* Improve communication between stakeholders

## Secondary Goals

* Generate event analytics
* Create verified participation records
* Improve student experience

---

# 3. Success Metrics (KPIs)

## Registration Adoption Rate

**Definition:** Percentage of event registrations completed through the platform.

**Target:** ≥ 80%

---

## Registration Efficiency

**Definition:** Average time taken from login to successful registration.

**Target:** ≤ 2 minutes

---

## Attendance Verification Accuracy

**Definition:** Percentage of attendance records that correctly match actual participants.

**Formula:**

```text
Verified Attendances / Total Attendance Records × 100
```

**Target:** ≥ 95%

---

## Certificate Automation Rate

**Definition:** Percentage of certificates generated without manual intervention.

**Target:** ≥ 98%

---

## Student Satisfaction Score

**Scale:** 1–5

**Target:** ≥ 4.2 / 5

---

## Platform Reliability

* 99% Uptime
* < 1% Registration Failures

---

# 4. Website Structure

## Public Pages

### Home Page

Contains:

* Hero Section
* Featured Events
* Upcoming Events
* Statistics
* Testimonials
* Call To Action

### About Page

Contains:

* Event Cell Overview
* Mission
* Vision
* Organizing Team

### Events Page

Contains:

* Search Functionality
* Category Filters
* Event Cards
* Event Details

### Contact Page

Contains:

* Contact Information
* Feedback Form
* Support Details

---

## Protected Pages

### Student Dashboard

Features:

* Registered Events
* Attendance Status
* Certificates
* Notifications

### Organizer Dashboard

Features:

* Event Creation
* Registration Management
* Attendance Tracking
* Analytics

### Admin Dashboard

Features:

* User Management
* Event Approval
* Platform Monitoring
* Reports

---

# 5. User Experience

## Student Journey

```text
Login
→ Browse Events
→ Register
→ Receive Confirmation
→ Attend Event
→ Download Certificate
```

## Organizer Journey

```text
Create Event
→ Submit for Approval
→ Receive Approval
→ Manage Registrations
→ Track Attendance
→ Generate Certificates
```

## Admin Journey

```text
Review Event
→ Approve/Reject
→ Monitor Activity
→ Generate Reports
```

---

## UX Principles

* Mobile First
* Simple Navigation
* Fast Interactions
* Clear Feedback Messages
* Accessibility Friendly
* Minimal Clicks

---

# 6. Functional Requirements

## Authentication Module

### Features

* User Registration
* Login
* Password Reset
* JWT Authentication
* Role-Based Access Control (RBAC)

### Acceptance Criteria

* Users can log in successfully
* Invalid credentials show proper errors
* Users can only access authorized pages

---

## Event Management Module

### Features

* Create Event
* Edit Event
* Delete Event
* Event Approval Workflow
* Capacity Management

### Acceptance Criteria

* Event title is mandatory
* Event date must be in the future
* Capacity > 0
* Events require admin approval before publication

---

## Registration Module

### Features

* Event Registration
* Registration Limits
* Waitlist Support
* Registration Cancellation

### Acceptance Criteria

* One user can register only once per event
* Registration closes automatically after deadline
* Waitlist activates when capacity is full

---

## Attendance Module

### Features

* QR-Based Attendance
* Manual Attendance
* Attendance Reports

### Acceptance Criteria

* Attendance only for registered students
* Duplicate attendance entries are blocked
* QR codes are time-limited

---

## Notification Module

### Features

* Registration Confirmation
* Event Reminders
* Event Updates
* Certificate Notifications

### Acceptance Criteria

* Notifications are sent immediately after triggering actions

---

## Certificate Module

### Features

* Automatic Certificate Generation
* PDF Download
* Verification Code

### Acceptance Criteria

* Certificates generated only after attendance verification
* Each certificate contains a unique verification ID

---

## Analytics Module

### Features

* Registration Analytics
* Attendance Analytics
* Event Popularity Metrics
* Department Participation Reports

### Acceptance Criteria

* Reports update in real time
* Data can be filtered by date and event

---

# 7. Visual Requirements

## Design Theme

### Modern Academic Dashboard

Characteristics:

* Professional
* Clean
* Student-Friendly
* Minimalistic

---

## Color Palette

| Purpose   | Color         |
| --------- | ------------- |
| Primary   | Indigo Blue   |
| Secondary | White         |
| Accent    | Emerald Green |
| Warning   | Orange        |
| Error     | Red           |

---

## UI Components

* Event Cards
* Dashboard Widgets
* Data Tables
* Progress Indicators
* Statistics Cards
* QR Scanner Interface

---

## Animations

* Page Transitions
* Hover Effects
* Skeleton Loading
* Toast Notifications

---

# 8. Technical Requirements

## Frontend

* React.js
* Tailwind CSS
* React Router
* Axios

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas

## Authentication

* JWT
* bcrypt

## Storage

* Cloudinary

## Deployment

| Component | Platform      |
| --------- | ------------- |
| Frontend  | Vercel        |
| Backend   | Render        |
| Database  | MongoDB Atlas |

---

# 9. Database Design

## User

### Fields

* userId (PK)
* name
* email (Unique)
* role
* department
* createdAt

### Validation

* Email must be unique
* Role must be Student, Organizer, Faculty, or Admin

### Relationship

One User → Many Registrations

---

## Event

### Fields

* eventId (PK)
* title
* description
* category
* venue
* startDate
* endDate
* registrationDeadline
* capacity
* organizerId (FK)

### Validation

* Capacity > 0
* Start Date < End Date
* Registration Deadline < Start Date

### Relationship

One Organizer → Many Events

---

## Registration

### Fields

* registrationId (PK)
* userId (FK)
* eventId (FK)
* registrationDate
* status

### Validation

* One registration per user per event

### Relationship

Many Students ↔ Many Events

---

## Attendance

### Fields

* attendanceId (PK)
* registrationId (FK)
* attendanceTimestamp
* attendanceStatus

### Validation

* Attendance allowed only for registered users
* Duplicate attendance prohibited

### Relationship

One Registration → One Attendance

---

## Certificate

### Fields

* certificateId (PK)
* userId (FK)
* eventId (FK)
* verificationCode
* issueDate
* downloadUrl

### Validation

* Generated only after attendance verification

### Relationship

One Attendance → One Certificate

---

# 10. Non-Functional Requirements

## Security

* JWT Authentication
* Password Hashing
* Input Validation
* XSS Protection
* Secure API Routes

---

## Performance

* Page Load Time < 3 Seconds
* API Response Time < 500 ms

---

## Scalability

* 5,000+ Students
* 1,000+ Concurrent Users

---

## Reliability

* 99% Uptime
* Automated Backups

---

## Accessibility

* Mobile Responsive
* Keyboard Navigation
* Proper Contrast Ratios

---

# 11. MVP Scope

## Must Have (Phase 1)

* Authentication
* Role-Based Access Control
* Event Discovery
* Event Creation
* Event Approval Workflow
* Event Registration
* Attendance Tracking
* Certificate Generation

---

## Should Have (Phase 2)

* QR Attendance
* Email Notifications
* Waitlist Automation
* Organizer Analytics

---

## Could Have (Future)

* AI Event Recommendations
* WhatsApp Integration
* Team Registrations
* Payment Gateway
* Inter-College Events
* AI Chatbot Assistant
* Sponsorship Portal

---

# 12. Risks & Constraints

## Risks

* Low user adoption
* Peak registration traffic
* Attendance misuse

## Constraints

* Development timeline
* Budget limitations
* College policy requirements

---

# 13. Final Summary

EventSphere is a centralized event management platform designed to streamline event creation, approval, registration, attendance verification, analytics, and certificate generation for colleges.

The MVP focuses on solving the most critical operational challenges faced by educational institutions while maintaining scalability for future enhancements such as AI recommendations, automation, WhatsApp integration, and inter-college event support.
