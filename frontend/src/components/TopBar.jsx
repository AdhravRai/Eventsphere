function Topbar() {
  return (
    <div className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-xl p-4 mb-8">

      <div>
        <h2 className="text-xl font-semibold text-white">
          Welcome Back 👋
        </h2>
      </div>

      <div className="flex items-center gap-6">

        <button className="text-slate-300 hover:text-blue-400">
          🔔 Notifications
        </button>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            V
          </div>

          <span className="text-white">
            Vipin
          </span>
        </div>

      </div>

    </div>
  );
}

export default Topbar;