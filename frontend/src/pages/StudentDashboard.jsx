import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
// import Topbar from "../components/TopBar";
import TopBar from "../components/TopBar";
import api from "../services/api";

import {
  FaCalendarAlt,
  FaCertificate,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
function StudentDashboard() {
  const [events, setEvents] = useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchEvents();
  }, []);

  const registerEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        `/events/${eventId}/register`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
      fetchEvents();
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");

      console.log("EVENTS FULL:", res.data);
      console.log("FIRST EVENT:", res.data[0]);

      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const registeredEvents = events.filter((event) =>
    event.attendees?.some(
      (attendee) =>
        attendee.student?._id === currentUser?.id
    )
  );
const upcomingEvents = events.filter(
  (event) =>
    !registeredEvents.some(
      (registered) => registered._id === event._id
    )
);


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">

      <Sidebar />

      <div className="flex-1 overflow-auto">

        <Topbar />

        <div className="p-8">

          {/* Hero Banner */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8 mb-10">

            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 blur-3xl" />

            <h1 className="text-5xl font-bold mb-3">
              Welcome Back 👋
            </h1>

            <p className="text-slate-400 text-lg">
              Explore upcoming events and track your participation journey.
            </p>

          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition-all">

              <FaCalendarAlt className="text-blue-400 text-3xl mb-4" />

              <p className="text-slate-400">
                Total Events
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {events.length}
              </h2>

            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-purple-500 transition-all">

              <FaUsers className="text-purple-400 text-3xl mb-4" />

              <p className="text-slate-400">
                Registered
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {registeredEvents.length}
              </h2>

            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-orange-500 transition-all">

              <FaCertificate className="text-orange-400 text-3xl mb-4" />

              <p className="text-slate-400">
                Certificates
              </p>

              <h2 className="text-4xl font-bold mt-2">
                2
              </h2>

            </div>

          </div>

          {/* Upcoming Events */}
          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold">
              Upcoming Events
            </h2>

            <button className="text-blue-400 hover:text-blue-300">
              View All
            </button>

          </div>
          
         
            
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

  {upcomingEvents.length === 0 &&  (
    <div className="text-slate-400">
      No upcoming events available.
    </div>
  )}

  {upcomingEvents.map((event) => (
    <div
      key={event._id}
      className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-4">
        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">
          Upcoming
        </span>
      </div>

      <h3 className="text-2xl font-bold mb-4">
        {event.title}
      </h3>

      <div className="space-y-2 mb-6">
        <p className="text-slate-400">
          📅 {new Date(event.date).toLocaleDateString()}
        </p>

        <p className="text-slate-400">
          📍 {event.venue}
        </p>
      </div>

      {registeredEvents.some(
        (e) => e._id === event._id
      ) ? (
        <button
          disabled
          className="w-full py-3 rounded-xl bg-green-600 cursor-not-allowed"
        >
          ✓ Registered
        </button>
      ) : (
        <button
          onClick={() => registerEvent(event._id)}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center gap-2 hover:scale-[1.02] transition"
        >
          Register
          <FaArrowRight />
        </button>
      )}
    </div>
  ))}

</div>

{/* My Registered Events */}


<div className="mt-12">

  <h2 className="text-3xl font-bold mb-6">
    My Registered Events
  </h2>

  {registeredEvents.length === 0 ? (
    <p className="text-slate-400">
      You have not registered for any events yet.
    </p>
  ) : (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

      {registeredEvents.map((event) => (
        <div
          key={event._id}
          className="bg-slate-900/60 backdrop-blur-xl border border-green-700 rounded-2xl p-6"
        >
          <h3 className="text-2xl font-bold mb-4">
            {event.title}
          </h3>

          <p className="text-slate-400">
            📅 {new Date(event.date).toLocaleDateString()}
          </p>

          <p className="text-slate-400 mb-4">
            📍 {event.venue}
          </p>

          <span className="text-green-400 font-semibold">
            ✓ Registered
          </span>
        </div>
      ))}

    </div>
  )}

</div>

          </div>

        </div>

      </div>

    
  );


}

export default StudentDashboard;