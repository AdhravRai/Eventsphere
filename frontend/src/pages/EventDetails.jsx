function EventDetails() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-5xl font-bold mb-6">
        Hackathon 2026
      </h1>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">

        <p className="mb-3">
          📅 Date: 25 June 2026
        </p>

        <p className="mb-3">
          📍 Venue: Main Auditorium
        </p>

        <p className="mb-6">
          Organizer: Computer Science Club
        </p>

        <p className="text-slate-400 mb-8">
          Join the biggest hackathon of the year and compete with talented developers.
        </p>

        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg">
          Register
        </button>

      </div>

    </div>
  );
}

export default EventDetails;