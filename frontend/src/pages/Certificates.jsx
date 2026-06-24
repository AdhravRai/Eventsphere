import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Certificates() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <Topbar />

        <h1 className="text-4xl font-bold mb-8">
          Certificates
        </h1>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

          <h2 className="text-2xl font-bold">
            Hackathon 2026
          </h2>

          <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg">
            Download Certificate
          </button>

        </div>
      </div>
    </div>
  );
}

export default Certificates;