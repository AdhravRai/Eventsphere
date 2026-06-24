import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../services/api";

import {
  FaClock,
  FaCheckCircle,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
function AdminDashboard() {
  const [pendingEvents, setPendingEvents] = useState([]);
  useEffect(() => {
    fetchPendingEvents();
  }, []);

  const fetchPendingEvents = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/events/pending", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPendingEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const approveEvent = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/events/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Event Approved");
      fetchPendingEvents();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectEvent = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/events/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Event Rejected");
      fetchPendingEvents();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">

      <Sidebar />

      <div className="flex-1 overflow-auto">

        <Topbar />

        <div className="p-8">

          {/* Dashboard Hero */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 mb-10">

            <h1 className="text-5xl font-bold mb-3">
              Admin Control Center ⚡
            </h1>

            <p className="text-slate-400 text-lg">
              Monitor platform activity, review event requests and manage organizers.
            </p>

          </div>

          {/* Analytics Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-yellow-500 transition">

              <FaClock className="text-yellow-400 text-3xl mb-4" />

              <p className="text-slate-400">
                Pending Events
              </p>

              <h2 className="text-4xl font-bold">
                {pendingEvents.length}
              </h2>

            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-green-500 transition">

              <FaCheckCircle className="text-green-400 text-3xl mb-4" />

              <p className="text-slate-400">
                Approved
              </p>

              <h2 className="text-4xl font-bold">
                12
              </h2>

            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-purple-500 transition">

              <FaUsers className="text-purple-400 text-3xl mb-4" />

              <p className="text-slate-400">
                Organizers
              </p>

              <h2 className="text-4xl font-bold">
                8
              </h2>

            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition">

              <FaChartLine className="text-blue-400 text-3xl mb-4" />

              <p className="text-slate-400">
                Platform Growth
              </p>

              <h2 className="text-4xl font-bold">
                +28%
              </h2>

            </div>

          </div>

          {/* Approval Requests */}
          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold">
              Pending Approval Requests
            </h2>

            <span className="text-slate-400">
              {pendingEvents.length} Requests
            </span>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {pendingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
              >

                <div className="flex justify-between items-center mb-4">

                  <h3 className="text-2xl font-bold">
                    {event.title}
                  </h3>

                  <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-sm">
                    Pending
                  </span>

                </div>

                <p className="text-slate-400 mb-6">
                  Organizer: {event.organizer?.name || "Organizer"}
                </p>

                <div className="flex gap-3">

                  <button
                    onClick={() => approveEvent(event._id)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:scale-[1.02] transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => rejectEvent(event._id)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:scale-[1.02] transition"
                  >
                    Reject
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );


}

export default AdminDashboard;