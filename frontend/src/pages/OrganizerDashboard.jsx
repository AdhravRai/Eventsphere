function OrganizerDashboard() {
  const myEvents = [
    {
      id: 1,
      title: "Hackathon 2026",
      status: "Approved",
    },
    {
      id: 2,
      title: "AI Workshop",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Organizer Dashboard
      </h1>

      {/* Create Event Form */}

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-bold mb-6">
          Create New Event
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Event Title"
            className="bg-slate-800 p-3 rounded-lg"
          />

          <input
            type="date"
            className="bg-slate-800 p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Venue"
            className="bg-slate-800 p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Category"
            className="bg-slate-800 p-3 rounded-lg"
          />

        </div>

        <textarea
          placeholder="Event Description"
          className="bg-slate-800 p-3 rounded-lg w-full mt-4 h-32"
        />

        <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg">
          Create Event
        </button>
      </div>

      {/* My Events */}

      <h2 className="text-3xl font-bold mb-6">
        My Events
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {myEvents.map((event) => (
          <div
            key={event.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6"
          >
            <h3 className="text-2xl font-semibold">
              {event.title}
            </h3>

            <p className="mt-2 text-slate-400">
              Status: {event.status}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default OrganizerDashboard;