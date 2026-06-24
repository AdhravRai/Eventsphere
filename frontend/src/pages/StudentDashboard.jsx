import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function StudentDashboard() {
  const events = [
    {
      id: 1,
      title: "Hackathon 2026",
      date: "25 June 2026",
      venue: "Main Auditorium",
    },
    {
      id: 2,
      title: "AI Workshop",
      date: "28 June 2026",
      venue: "Seminar Hall",
    },
    {
      id: 3,
      title: "Coding Contest",
      date: "30 June 2026",
      venue: "Computer Lab",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />
      

      <div className="flex-1 p-8 overflow-auto">
        <Topbar />
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Student Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Welcome back! Explore and register for events.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500 transition-all duration-300">
            <h3 className="text-slate-400">Total Events</h3>
            <p className="text-4xl font-bold mt-2">12</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500 transition-all duration-300">
            <h3 className="text-slate-400">Registered</h3>
            <p className="text-4xl font-bold mt-2">4</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500 transition-all duration-300">
            <h3 className="text-slate-400">Certificates</h3>
            <p className="text-4xl font-bold mt-2">2</p>
          </div>

        </div>

        {/* Events */}
        <h2 className="text-3xl font-bold mb-6">
          Upcoming Events
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {events.map((event) => (
            <div
              key={event.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold mb-3">
                {event.title}
              </h3>

              <p className="text-slate-400">
                📅 {event.date}
              </p>

              <p className="text-slate-400 mb-4">
                📍 {event.venue}
              </p>

              <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg">
                Register
              </button>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;