import { Link } from "react-router-dom";

import {
  FaHome,
  FaUserGraduate,
  FaUserTie,
  FaUserShield,
} from "react-icons/fa";

function Sidebar() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="w-72 min-h-screen bg-slate-900/70 backdrop-blur-xl border-r border-slate-800 p-6 flex flex-col">

      {/* Logo */}
      <div className="mb-12">

        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          EventSphere
        </h1>

        <p className="text-slate-400 text-sm mt-2">
          Event Management Platform
        </p>

      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-3">

        <Link
          to="/"
          className="flex items-center gap-3 p-4 rounded-xl text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 transition"
        >
          <FaHome />
          Home
        </Link>

        <Link
          to="/student-dashboard"
          className="flex items-center gap-3 p-4 rounded-xl text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 transition"
        >
          <FaUserGraduate />
          Student Dashboard
        </Link>

        <Link
          to="/organizer-dashboard"
          className="flex items-center gap-3 p-4 rounded-xl text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 transition"
        >
          <FaUserTie />
          Organizer Dashboard
        </Link>

        <Link
          to="/admin-dashboard"
          className="flex items-center gap-3 p-4 rounded-xl text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 transition"
        >
          <FaUserShield />
          Admin Dashboard
        </Link>

      </div>

      {/* User Card */}
      <div className="mt-auto">

        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4">

          <h3 className="font-semibold">
            {user.name || "Guest"}
          </h3>

          <p className="text-slate-400 text-sm">
            {user.email || "No Email"}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Sidebar;