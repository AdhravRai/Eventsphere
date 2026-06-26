import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/TopBar";
import api from "../services/api";
import jsPDF from "jspdf";

import {
  FaClock,
  FaCheckCircle,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

function AdminDashboard() {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    setLoading(true);
    try {
      const pendingRes = await api.get("/events/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allRes = await api.get("/events");

      setPendingEvents(pendingRes.data || []);
      setApprovedEvents(
        (allRes.data || []).filter((e) => e.status === "Approved")
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approveEvent = async (id) => {
    try {
      await api.put(
        `/events/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectEvent = async (id) => {
    try {
      await api.put(
        `/events/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const markPresent = async (eventId, studentId) => {
    try {
      await api.put(
        `/events/${eventId}/attendance`,
        { studentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const generateCertificate = (studentName, eventName) => {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setDrawColor(180, 140, 50);
    doc.setLineWidth(2);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
    doc.setLineWidth(0.5);
    doc.rect(16, 16, pageWidth - 32, pageHeight - 32);

    doc.setFont("times", "bold");
    doc.setFontSize(34);
    doc.setTextColor(30, 30, 30);
    doc.text("Certificate of Participation", pageWidth / 2, 50, { align: "center" });

    doc.setDrawColor(180, 140, 50);
    doc.setLineWidth(0.8);
    doc.line(pageWidth / 2 - 40, 58, pageWidth / 2 + 40, 58);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(90, 90, 90);
    doc.text("This certificate is proudly presented to", pageWidth / 2, 78, { align: "center" });

    doc.setFont("times", "bolditalic");
    doc.setFontSize(28);
    doc.setTextColor(20, 20, 20);
    doc.text(studentName, pageWidth / 2, 95, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(90, 90, 90);
    doc.text("for successfully participating in", pageWidth / 2, 112, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(30, 30, 30);
    doc.text(eventName, pageWidth / 2, 124, { align: "center" });

    const today = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(110, 110, 110);
    doc.text(`Date: ${today}`, 30, pageHeight - 25);
    doc.text("EventSphere Admin", pageWidth - 60, pageHeight - 25);
    doc.line(pageWidth - 70, pageHeight - 28, pageWidth - 20, pageHeight - 28);

    doc.save(`${studentName.replace(/\s+/g, "_")}_certificate.pdf`);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <Topbar />

        <div className="p-8">
          
          {/* Dashboard Hero */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 mb-10">
            <h1 className="text-5xl font-bold mb-3">Admin Control Center ⚡</h1>
            <p className="text-slate-400 text-lg">
              Monitor platform activity, review event requests and manage attendance.
            </p>
          </div>

          {/* Analytics Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-yellow-500 transition">
              <FaClock className="text-yellow-400 text-3xl mb-4" />
              <p className="text-slate-400">Pending Events</p>
              <h2 className="text-4xl font-bold">{pendingEvents.length}</h2>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-green-500 transition">
              <FaCheckCircle className="text-green-400 text-3xl mb-4" />
              <p className="text-slate-400">Approved</p>
              <h2 className="text-4xl font-bold">{approvedEvents.length}</h2>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-purple-500 transition">
              <FaUsers className="text-purple-400 text-3xl mb-4" />
              <p className="text-slate-400">Organizers</p>
              <h2 className="text-4xl font-bold">
                {new Set(approvedEvents.map((e) => e.organizer)).size}
              </h2>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition">
              <FaChartLine className="text-blue-400 text-3xl mb-4" />
              <p className="text-slate-400">Total Events</p>
              <h2 className="text-4xl font-bold">
                {pendingEvents.length + approvedEvents.length}
              </h2>
            </div>
          </div>

          {/* Approval Requests */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Pending Approval Requests</h2>
            <span className="text-slate-400">{pendingEvents.length} Requests</span>
          </div>

          {pendingEvents.length === 0 ? (
            <p className="text-slate-500 mb-12">No pending events right now.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {pendingEvents.map((event) => (
                <div
                  key={event._id}
                  className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">{event.title}</h3>
                    <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-sm">
                      Pending
                    </span>
                  </div>

                  <p className="text-slate-400 mb-6">Venue: {event.venue}</p>

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
          )}

          {/* Attendance + Certificate Section */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Mark Attendance</h2>
            <span className="text-slate-400">{approvedEvents.length} Approved Events</span>
          </div>

          {approvedEvents.length === 0 ? (
            <p className="text-slate-500">No approved events yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {approvedEvents.map((event) => (
                <div
                  key={event._id}
                  className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6"
                >
                  <h3 className="text-2xl font-bold mb-4">{event.title}</h3>

                  {!event.attendees || event.attendees.length === 0 ? (
                    <p className="text-slate-500 text-sm">No students registered yet.</p>
                  ) : (
                    event.attendees.map((attendee) => {
                      const student = attendee.student;
                      const studentId = student?._id || student;
                      const studentName = student?.name || studentId;

                      return (
                        <div
                          key={studentId}
                          className="flex justify-between items-center py-2 border-b border-slate-800"
                        >
                          <span>{studentName}</span>

                          <div className="flex gap-2">
                            <button
                              onClick={() => markPresent(event._id, studentId)}
                              disabled={attendee.present}
                              className={`px-3 py-1 rounded-lg text-sm transition ${
                                attendee.present
                                  ? "bg-slate-700 cursor-not-allowed"
                                  : "bg-blue-600 hover:bg-blue-700"
                              }`}
                            >
                              {attendee.present ? "Present ✅" : "Mark Present"}
                            </button>

                            {attendee.present && (
                              <button
                                onClick={() => generateCertificate(studentName, event.title)}
                                className="px-3 py-1 rounded-lg text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] transition"
                              >
                                Certificate
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;