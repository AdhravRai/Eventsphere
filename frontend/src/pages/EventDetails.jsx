
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

function EventDetails() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white p-8">

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-10 mb-10">

        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 blur-3xl" />

        <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 mb-6">
          Featured Event
        </span>

        <h1 className="text-6xl font-bold mb-4">
          Hackathon 2026 🚀
        </h1>

        <p className="text-slate-400 text-xl max-w-3xl">
          Join the biggest hackathon of the year and compete with talented
          developers, designers and innovators from across the campus.
        </p>

      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
          <FaCalendarAlt className="text-blue-400 text-3xl mb-4" />
          <p className="text-slate-400">Event Date</p>
          <h2 className="text-2xl font-bold">
            25 June 2026
          </h2>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
          <FaMapMarkerAlt className="text-red-400 text-3xl mb-4" />
          <p className="text-slate-400">Venue</p>
          <h2 className="text-2xl font-bold">
            Main Auditorium
          </h2>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6">
          <FaUsers className="text-purple-400 text-3xl mb-4" />
          <p className="text-slate-400">Organizer</p>
          <h2 className="text-2xl font-bold">
            CS Club
          </h2>
        </div>

      </div>

      {/* Details Card */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          About This Event
        </h2>

        <p className="text-slate-400 leading-relaxed text-lg mb-8">
          Hackathon 2026 is a 24-hour innovation challenge where students
          collaborate, build solutions and present their projects to judges.
          Participants will gain practical experience, networking opportunities,
          certificates and exciting prizes.
        </p>

        <div className="flex flex-wrap gap-4">

          <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-2 hover:scale-[1.02] transition">
            Register Now
            <FaArrowRight />
          </button>

          <button className="px-8 py-4 rounded-xl border border-slate-700 hover:border-blue-500 transition">
            Download Brochure
          </button>

        </div>

      </div>

    </div>
  );
}

export default EventDetails;

