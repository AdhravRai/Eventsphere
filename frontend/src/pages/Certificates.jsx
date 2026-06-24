
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  FaCertificate,
  FaDownload,
  FaAward,
} from "react-icons/fa";

function Certificates() {
  const certificates = [
    {
      id: 1,
      event: "Hackathon 2026",
      date: "25 June 2026",
    },
    {
      id: 2,
      event: "AI Workshop",
      date: "28 June 2026",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">

      <Sidebar />

      <div className="flex-1 overflow-auto">

        <Topbar />

        <div className="p-8">

          {/* Hero Section */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 mb-10">

            <h1 className="text-5xl font-bold mb-3">
              Certificates 🏆
            </h1>

            <p className="text-slate-400 text-lg">
              View and download certificates earned from your event participation.
            </p>

          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">

              <FaCertificate className="text-blue-400 text-3xl mb-4" />

              <p className="text-slate-400">
                Certificates Earned
              </p>

              <h2 className="text-4xl font-bold">
                2
              </h2>

            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">

              <FaAward className="text-purple-400 text-3xl mb-4" />

              <p className="text-slate-400">
                Events Completed
              </p>

              <h2 className="text-4xl font-bold">
                5
              </h2>

            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">

              <FaDownload className="text-green-400 text-3xl mb-4" />

              <p className="text-slate-400">
                Downloads
              </p>

              <h2 className="text-4xl font-bold">
                12
              </h2>

            </div>

          </div>

          {/* Certificate Cards */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
              >

                <FaCertificate className="text-yellow-400 text-5xl mb-4" />

                <h3 className="text-2xl font-bold mb-2">
                  {certificate.event}
                </h3>

                <p className="text-slate-400 mb-6">
                  Issued on {certificate.date}
                </p>

                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center gap-2 hover:scale-[1.02] transition">

                  <FaDownload />

                  Download Certificate

                </button>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Certificates;

