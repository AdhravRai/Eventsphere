import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function MyEvents() {
  const events = [
    "Hackathon 2026",
    "AI Workshop",
    "Coding Contest",
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <Topbar />

        <h1 className="text-4xl font-bold mb-8">
          My Registered Events
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6"
            >
              <h3 className="text-2xl font-semibold">
                {event}
              </h3>

              <p className="text-green-400 mt-2">
                Registration Confirmed
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyEvents;