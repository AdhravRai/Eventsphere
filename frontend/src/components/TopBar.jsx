import {
  FaBell,
  FaSearch,
} from "react-icons/fa";

function TopBar() {
    console.log("TOPBAR USER:", JSON.parse(localStorage.getItem("user")));
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="flex justify-between items-center bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 mb-8">

      {/* Left Section */}
      <div>
        <h2 className="text-2xl font-bold text-white">
  Welcome Back 👋
</h2>

        <p className="text-slate-400 text-sm mt-1">
          Manage your events efficiently
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="hidden md:flex items-center gap-3 bg-slate-800 px-4 py-3 rounded-xl border border-slate-700">

          <FaSearch className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-white placeholder-slate-400"
          />

        </div>

        {/* Notification */}
        <button className="relative p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition">

          <FaBell />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>

        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 bg-slate-800 px-3 py-2 rounded-xl border border-slate-700">

          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="hidden md:block">

            <p className="font-semibold">
              {user?.name || "User"}
            </p>

            <p className="text-xs text-slate-400 capitalize">
              {user?.role || "Guest"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TopBar;