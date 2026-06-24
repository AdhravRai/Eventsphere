import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  FaCalendarAlt,
  FaCertificate,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
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
  <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">

    <Sidebar />

    <div className="flex-1 overflow-auto">

      <Topbar />

      <div className="p-8">

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8 mb-10">

          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 blur-3xl" />

          <h1 className="text-5xl font-bold mb-3">
            Welcome Back 👋
          </h1>

          <p className="text-slate-400 text-lg">
            Explore upcoming events and track your participation journey.
          </p>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition-all">

            <FaCalendarAlt className="text-blue-400 text-3xl mb-4" />

            <p className="text-slate-400">
              Total Events
            </p>

            <h2 className="text-4xl font-bold mt-2">
              12
            </h2>

          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-purple-500 transition-all">

            <FaUsers className="text-purple-400 text-3xl mb-4" />

            <p className="text-slate-400">
              Registered
            </p>

            <h2 className="text-4xl font-bold mt-2">
              4
            </h2>

          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-orange-500 transition-all">

            <FaCertificate className="text-orange-400 text-3xl mb-4" />

            <p className="text-slate-400">
              Certificates
            </p>

            <h2 className="text-4xl font-bold mt-2">
              2
            </h2>

          </div>

        </div>

        {/* Upcoming Events */}
        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            Upcoming Events
          </h2>

          <button className="text-blue-400 hover:text-blue-300">
            View All
          </button>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {events.map((event) => (
            <div
              key={event.id}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
            >

              <div className="flex justify-between items-center mb-4">

                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">
                  Upcoming
                </span>

              </div>

              <h3 className="text-2xl font-bold mb-4">
                {event.title}
              </h3>

              <div className="space-y-2 mb-6">

                <p className="text-slate-400">
                  📅 {event.date}
                </p>

                <p className="text-slate-400">
                  📍 {event.venue}
                </p>

              </div>

              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center gap-2 hover:scale-[1.02] transition">

                Register

                <FaArrowRight />

              </button>

            </div>
          ))}

        </div>

      </div>

    </div>

  </div>
);


}

export default StudentDashboard;