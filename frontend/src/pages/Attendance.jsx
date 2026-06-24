import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Attendance() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <Topbar />

        <h1 className="text-4xl font-bold mb-8">
          Attendance
        </h1>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            Hackathon 2026
          </h2>

          <p className="text-green-400 text-lg">
            Present
          </p>

        </div>
      </div>
    </div>
  );
}

export default Attendance;