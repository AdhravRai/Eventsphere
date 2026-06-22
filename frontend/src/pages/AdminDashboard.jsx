function AdminDashboard() {
  const pendingEvents = [
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
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Review and manage event requests.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500 transition">
          <h3 className="text-slate-400">
            Pending Events
          </h3>

          <p className="text-4xl font-bold mt-2">
            3
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500 transition">
          <h3 className="text-slate-400">
            Approved Events
          </h3>

          <p className="text-4xl font-bold mt-2">
            12
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-purple-500 transition">
          <h3 className="text-slate-400">
            Total Organizers
          </h3>

          <p className="text-4xl font-bold mt-2">
            8
          </p>
        </div>

      </div>

      {/* Event Approval Section */}

      <h2 className="text-3xl font-bold mb-6">
        Pending Approval Requests
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {pendingEvents.map((event) => (
          <div
            key={event.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500 transition-all"
          >
            <h3 className="text-2xl font-semibold mb-2">
              {event.title}
            </h3>

            <p className="text-slate-400">
              Organizer: {event.organizer}
            </p>

            <p className="text-yellow-400 mt-2">
              Status: {event.status}
            </p>

            <div className="flex gap-3 mt-5">

              <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
                Approve
              </button>

              <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
                Reject
              </button>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default AdminDashboard;