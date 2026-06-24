import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import api from "../services/api";
import {
  FaCalendarPlus,
  FaCheckCircle,
  FaClock,
  FaUsers,
} from "react-icons/fa";

function OrganizerDashboard() {
  const [myEvents, setMyEvents] = useState([]);
  const [eventData, setEventData] = useState({
  title: "",
  description: "",
  date: "",
  venue: "",
  category: "",
  capacity: "",
});
const handleChange = (e) => {
  setEventData({
    ...eventData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.post(
      "/events",
      {
        ...eventData,
        capacity: Number(eventData.capacity),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Event Created Successfully");
    fetchEvents();

    console.log(res.data);

    setEventData({
      title: "",
      description: "",
      date: "",
      venue: "",
      category: "",
      capacity: "",
    });

  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Failed to create event"
    );
  }
};
useEffect(() => {
  fetchEvents();
}, []);

const fetchEvents = async () => {
  try {
    const res = await api.get("/events");
    setMyEvents(res.data);
  } catch (err) {
    console.log(err);
  }
};
const markAttendance = async (
  eventId,
  studentId
) => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.put(
      `/events/${eventId}/attendance`,
      { studentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);

    fetchEvents();
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Attendance failed"
    );
  }
};
 
return (
  <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">

    <Sidebar />

    <div className="flex-1 overflow-auto">

      <TopBar />

      <div className="p-8">

        {/* Header */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 mb-10">

          <h1 className="text-5xl font-bold mb-3">
            Organizer Dashboard 🚀
          </h1>

          <p className="text-slate-400 text-lg">
            Create, manage and monitor all your events from one place.
          </p>

        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition">

            <FaCalendarPlus className="text-blue-400 text-3xl mb-4" />

            <p className="text-slate-400">
              Total Events
            </p>

            <h2 className="text-4xl font-bold">
              12
            </h2>

          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-green-500 transition">

            <FaCheckCircle className="text-green-400 text-3xl mb-4" />

            <p className="text-slate-400">
              Approved
            </p>

            <h2 className="text-4xl font-bold">
              8
            </h2>

          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-purple-500 transition">

            <FaUsers className="text-purple-400 text-3xl mb-4" />

            <p className="text-slate-400">
              Participants
            </p>

            <h2 className="text-4xl font-bold">
              340
            </h2>

          </div>

        </div>

        {/* Create Event Form */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 mb-12">

          <h2 className="text-3xl font-bold mb-8">
            Create New Event
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

          <input
  type="text"
  name="title"
  value={eventData.title}
  onChange={handleChange}
  placeholder="Event Title"
  className="bg-slate-800 border border-slate-700 p-4 rounded-xl focus:border-blue-500 outline-none"
/>

            <input
  type="date"
  name="date"
  value={eventData.date}
  onChange={handleChange}
  className="bg-slate-800 border border-slate-700 p-4 rounded-xl focus:border-blue-500 outline-none"
/>

            <input
  type="text"
  name="venue"
  value={eventData.venue}
  onChange={handleChange}
  placeholder="Venue"
  className="bg-slate-800 border border-slate-700 p-4 rounded-xl focus:border-blue-500 outline-none"
/>

           <input
  type="text"
  name="category"
  value={eventData.category}
  onChange={handleChange}
  placeholder="Category"
  className="bg-slate-800 border border-slate-700 p-4 rounded-xl focus:border-blue-500 outline-none"
  
/>
<input
  type="number"
  name="capacity"
  value={eventData.capacity}
  onChange={handleChange}
  placeholder="Capacity"
  className="bg-slate-800 border border-slate-700 p-4 rounded-xl focus:border-blue-500 outline-none"
/>
          </div>

          <textarea
  name="description"
  value={eventData.description}
  onChange={handleChange}
  placeholder="Event Description"
  className="bg-slate-800 border border-slate-700 p-4 rounded-xl w-full mt-4 h-32 focus:border-blue-500 outline-none"
/>

          <button
  onClick={handleSubmit}
  className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] transition"
>
            Create Event
          </button>

        </div>

        {/* My Events */}
        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            My Events
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {myEvents.map((event) => (
            <div
              key={event._id}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
            >

              <div className="flex justify-between items-center mb-4">

                <h3 className="text-2xl font-bold">
                  {event.title}
                </h3>

               {event.status === "Approved" ? (
  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
    Approved
  </span>
) : event.status === "Rejected" ? (
  <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-sm">
    Rejected
  </span>
) : (
  <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-sm flex items-center gap-2">
    <FaClock />
    Pending
  </span>
)}
              </div>

              <div className="text-slate-400 space-y-2">

  <p>
    📍 {event.venue}
  </p>

  <p>
    📅 {new Date(event.date).toLocaleDateString()}
  </p>

  <p>
    👥 Capacity: {event.capacity}
  </p>
  
  <div className="mt-4">
  <h4 className="font-semibold mb-2">
    Registered Students
  </h4>

  {event.attendees?.length === 0 ? (
    <p className="text-slate-500">
      No registrations yet
    </p>
  ) : (
    event.attendees.map((attendee) => (
      <div
        key={attendee.student?._id}
        className="flex justify-between items-center bg-slate-800 p-2 rounded-lg mb-2"
      >
        <span>
          {attendee.student?.name}
        </span>

        {attendee.present ? (
          <span className="text-green-400">
            Present
          </span>
        ) : (
          <button
            onClick={() =>
              markAttendance(
                event._id,
                attendee.student._id
              )
            }
            className="bg-green-600 px-3 py-1 rounded-lg"
          >
            Mark Present
          </button>
        )}
      </div>
    ))
  )}
</div>

</div>

            </div>
          ))}

        </div>

      </div>

    </div>

  </div>
);


}

export default OrganizerDashboard;