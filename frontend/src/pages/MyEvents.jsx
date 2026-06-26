import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import api from "../services/api";

import {
  FaCheckCircle,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";

function MyEvents() {
  const [events, setEvents] = useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");

      const registeredEvents = res.data.filter(
        (event) =>
          event.attendees?.some(
            (attendee) =>
              attendee.student?._id === currentUser?.id
          )
      );

      setEvents(registeredEvents);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">

      <Sidebar />

      <div className="flex-1 overflow-auto">

        <TopBar />

        <div className="p-8">

          {/* Hero Section */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 mb-10">

            <h1 className="text-5xl font-bold mb-3">
              My Events 🎟️
            </h1>

            <p className="text-slate-400 text-lg">
              View all events you've registered for and track your participation.
            </p>

          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
              <FaCalendarAlt className="text-blue-400 text-3xl mb-4" />
              <p className="text-slate-400">
                Registered Events
              </p>
              <h2 className="text-4xl font-bold">
                {events.length}
              </h2>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
              <FaCheckCircle className="text-green-400 text-3xl mb-4" />
              <p className="text-slate-400">
                Confirmed
              </p>
              <h2 className="text-4xl font-bold">
                {events.length}
              </h2>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
              <FaCalendarAlt className="text-purple-400 text-3xl mb-4" />
              <p className="text-slate-400">
                Upcoming
              </p>
              <h2 className="text-4xl font-bold">
                {events.length}
              </h2>
            </div>

          </div>

          {/* Event Cards */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {events.length === 0 ? (
              <p className="text-slate-400">
                No registered events found.
              </p>
            ) : (
              events.map((event) => (
                <div
                  key={event._id}
                  className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
                >

                  <div className="flex justify-between items-center mb-4">

                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
                      Registered
                    </span>

                  </div>

                  <h3 className="text-2xl font-bold mb-3">
                    {event.title}
                  </h3>

                  <p className="text-slate-400">
                    📅 {new Date(event.date).toLocaleDateString()}
                  </p>

                  <p className="text-slate-400 mb-6">
                    📍 {event.venue}
                  </p>

                  <Link
                    to={`/event/${event._id}`}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center gap-2 hover:scale-[1.02] transition"
                  >
                    View Details
                    <FaArrowRight />
                  </Link>

                </div>
              ))
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default MyEvents;