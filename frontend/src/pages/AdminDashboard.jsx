import { useState, useEffect } from "react";
import {
  getPendingEvents,
  getAllEvents,
  approveEvent,
  rejectEvent,
  markAttendance,
} from "../api/adminApi";
import jsPDF from "jspdf";

function AdminDashboard() {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const pending = await getPendingEvents();
      const all = await getAllEvents();

      setPendingEvents(Array.isArray(pending) ? pending : []);
      setApprovedEvents(
        Array.isArray(all) ? all.filter((e) => e.status === "Approved") : []
      );
    } catch (err) {
      setError("Could not load events. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (id) => {
    await approveEvent(id);
    loadData();
  };

  const handleReject = async (id) => {
    await rejectEvent(id);
    loadData();
  };

  const handleMarkPresent = async (eventId, studentId) => {
    await markAttendance(eventId, studentId);
    loadData();
  };

  const generateCertificate = (studentName, eventName) => {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Outer border
  doc.setDrawColor(180, 140, 50); // gold
  doc.setLineWidth(2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Inner border
  doc.setLineWidth(0.5);
  doc.rect(16, 16, pageWidth - 32, pageHeight - 32);

  // Title
  doc.setFont("times", "bold");
  doc.setFontSize(34);
  doc.setTextColor(30, 30, 30);
  doc.text("Certificate of Participation", pageWidth / 2, 50, { align: "center" });

  // Decorative line under title
  doc.setDrawColor(180, 140, 50);
  doc.setLineWidth(0.8);
  doc.line(pageWidth / 2 - 40, 58, pageWidth / 2 + 40, 58);

  // Subtext
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(90, 90, 90);
  doc.text("This certificate is proudly presented to", pageWidth / 2, 78, { align: "center" });

  // Student name
  doc.setFont("times", "bolditalic");
  doc.setFontSize(28);
  doc.setTextColor(20, 20, 20);
  doc.text(studentName, pageWidth / 2, 95, { align: "center" });

  // Event details
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(90, 90, 90);
  doc.text(`for successfully participating in`, pageWidth / 2, 112, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(30, 30, 30);
  doc.text(eventName, pageWidth / 2, 124, { align: "center" });

  // Date + signature line
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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8">
        <p className="text-slate-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-slate-400 mt-2">
          Review and manage event requests.
        </p>
        {error && <p className="text-red-400 mt-3">{error}</p>}
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500 transition">
          <h3 className="text-slate-400">Pending Events</h3>
          <p className="text-4xl font-bold mt-2">{pendingEvents.length}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500 transition">
          <h3 className="text-slate-400">Approved Events</h3>
          <p className="text-4xl font-bold mt-2">{approvedEvents.length}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-purple-500 transition">
          <h3 className="text-slate-400">Total Organizers</h3>
          <p className="text-4xl font-bold mt-2">
            {new Set(approvedEvents.map((e) => e.organizer)).size}
          </p>
        </div>
      </div>

      {/* Event Approval Section */}
      <h2 className="text-3xl font-bold mb-6">Pending Approval Requests</h2>

      {pendingEvents.length === 0 ? (
        <p className="text-slate-500 mb-12">No pending events right now.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {pendingEvents.map((event) => (
            <div
              key={event._id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500 transition-all"
            >
              <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>

              <p className="text-slate-400">
                Venue: {event.venue}
              </p>

              <p className="text-yellow-400 mt-2">Status: {event.status}</p>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => handleApprove(event._id)}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(event._id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Attendance Section */}
      <h2 className="text-3xl font-bold mb-6">Mark Attendance</h2>

      {approvedEvents.length === 0 ? (
        <p className="text-slate-500">No approved events yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {approvedEvents.map((event) => (
            <div
              key={event._id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6"
            >
              <h3 className="text-2xl font-semibold mb-4">{event.title}</h3>

              {!event.attendees || event.attendees.length === 0 ? (
                <p className="text-slate-500 text-sm">
                  No students registered yet.
                </p>
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
                          onClick={() =>
                            handleMarkPresent(event._id, studentId)
                          }
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
                            onClick={() =>
                              generateCertificate(studentName, event.title)
                            }
                            className="px-3 py-1 rounded-lg text-sm bg-purple-600 hover:bg-purple-700 transition"
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
  );
}

export default AdminDashboard;