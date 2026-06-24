
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

import {
  FaCheckCircle,
  FaCalendarAlt,
  FaChartPie,
} from "react-icons/fa";

function Attendance() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">

      <Sidebar />

      <div className="flex-1 overflow-auto">

        <TopBar />

        <div className="p-8">

          {/* Hero Section */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 mb-10">

            <h1 className="text-5xl font-bold mb-3">
              Attendance Tracker 📊
            </h1>

            <p className="text-slate-400 text-lg">
              Monitor your participation and attendance across all events.
            </p>

          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">

              <FaCheckCircle className="text-green-400 text-3xl mb-4" />

              <p className="text-slate-400">
                Events Attended
              </p>

              <h2 className="text-4xl font-bold">
                8
              </h2>

            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">

              <FaCalendarAlt className="text-blue-400 text-3xl mb-4" />

              <p className="text-slate-400">
                Total Registrations
              </p>

              <h2 className="text-4xl font-bold">
                10
              </h2>

            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">

              <FaChartPie className="text-purple-400 text-3xl mb-4" />

              <p className="text-slate-400">
                Attendance Rate
              </p>

              <h2 className="text-4xl font-bold">
                80%
              </h2>

            </div>

          </div>

          {/* Attendance Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-3xl font-bold">
                Hackathon 2026
              </h2>

              <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400">
                Present
              </span>

            </div>

            <p className="text-slate-400 text-lg">
              Your attendance has been successfully recorded for this event.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Attendance;

