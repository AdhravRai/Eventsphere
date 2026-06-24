import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-6">

      <h1 className="text-2xl font-bold text-blue-500 mb-10">
        EventSphere
      </h1>

      <div className="flex flex-col gap-4">

        <Link
          to="/student-dashboard"
          className="text-slate-300 hover:text-blue-400"
        >
          Student Dashboard
        </Link>

        <Link
          to="/organizer-dashboard"
          className="text-slate-300 hover:text-blue-400"
        >
          Organizer Dashboard
        </Link>

        <Link
          to="/admin-dashboard"
          className="text-slate-300 hover:text-blue-400"
        >
          Admin Dashboard
        </Link>

        <Link
          to="/"
          className="text-slate-300 hover:text-blue-400"
        >
          Home
        </Link>

      </div>

    </div>
  );
}

export default Sidebar;