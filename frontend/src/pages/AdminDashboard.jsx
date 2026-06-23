import { useState } from "react";

function AdminDashboard() {
  const [pendingEvents, setPendingEvents] = useState([
    {
      id: 1,
      title: "Hackathon 2026",
      organizer: "Computer Science Club",
      status: "Pending",
    },
    {
      id: 2,
      title: "AI Workshop",
      organizer: "AI Society",
      status: "Pending",
    },
    {
      id: 3,
      title: "Coding Contest",
      organizer: "Programming Club",
      status: "Pending",
    },
  ]);

  const [approvedEvents, setApprovedEvents] = useState([
    {
      id: 1,
      title: "Hackathon 2026",
      students: [
        { id: "s1", name: "Riya Sharma", present: false },
        { id: "s2", name: "Karan Verma", present: false },
      ],
    },
    {
      id: 2,
      title: "AI Workshop",
      students: [{ id: "s3", name: "Ananya Singh", present: false }],
    },
  ]);

  const [totalOrganizers] = useState(8);

  const handleApprove = (id) => {
    const event = pendingEvents.find((e) => e.id === id);
    if (!event) return;

    // Remove from pending list
    setPendingEvents((prev) => prev.filter((e) => e.id !== id));

    // Add to approved list (with empty students array to start)
    setApprovedEvents((prev) => [
      ...prev,
      { id: event.id, title: event.title, students: [] },
    ]);
  };

  const handleReject = (id) => {
    setPendingEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const handleMarkPresent = (eventId, studentId) => {
    setApprovedEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? {
              ...event,
              students: event.students.map((s) =>
                s.id === studentId ? { ...s, present: true } : s
              ),
            }
          : event
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-slate-400 mt-2">
          Review and manage event requests.
        </p>
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
          <p className="text-4xl font-bold mt-2">{totalOrganizers}</p>
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
              key={event.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500 transition-all"
            >
              <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>

              <p className="text-slate-400">
                Organizer: {event.organizer}
              </p>

              <p className="text-yellow-400 mt-2">Status: {event.status}</p>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => handleApprove(event.id)}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(event.id)}
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
              key={event.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6"
            >
              <h3 className="text-2xl font-semibold mb-4">{event.title}</h3>

              {event.students.length === 0 ? (
                <p className="text-slate-500 text-sm">
                  No students registered yet.
                </p>
              ) : (
                event.students.map((student) => (
                  <div
                    key={student.id}
                    className="flex justify-between items-center py-2 border-b border-slate-800"
                  >
                    <span>{student.name}</span>

                    <button
                      onClick={() => handleMarkPresent(event.id, student.id)}
                      disabled={student.present}
                      className={`px-3 py-1 rounded-lg text-sm transition ${
                        student.present
                          ? "bg-slate-700 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {student.present ? "Present ✅" : "Mark Present"}
                    </button>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;