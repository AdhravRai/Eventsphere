import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import BackButton from "../components/BackButton";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");

      const upcoming = res.data.filter(
        (event) =>
          event.status === "Approved" &&
          new Date(event.date) >= new Date()
      );

      setEvents(upcoming);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">

      <div className="max-w-7xl mx-auto p-10">
        <BackButton />

        <h1 className="text-5xl font-bold mb-3">
          Upcoming Events
        </h1>

        <p className="text-slate-400 mb-10">
          Discover exciting events happening across the campus.
        </p>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {events.length === 0 ? (
            <p className="text-slate-400">
              No upcoming events.
            </p>
          ) : (
            events.map((event) => (
              <div
                key={event._id}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition-all"
              >
                <h2 className="text-2xl font-bold mb-4">
                  {event.title}
                </h2>

                <p className="text-slate-400 mb-2">
                  <FaCalendarAlt className="inline mr-2" />
                  {new Date(event.date).toLocaleDateString()}
                </p>

                <p className="text-slate-400 mb-6">
                  <FaMapMarkerAlt className="inline mr-2" />
                  {event.venue}
                </p>

                <Link
                  to={`/event/${event._id}`}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 rounded-xl"
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
  );
}

export default Events;