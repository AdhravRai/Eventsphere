import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-blue-500">
          EventSphere
        </h1>

        <div className="flex gap-6">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>

          <Link to="/login" className="hover:text-blue-400">
            Login
          </Link>

          <Link to="/register" className="hover:text-blue-400">
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <h1 className="text-6xl font-bold mb-6">
          Manage College Events
          <span className="text-blue-500"> Effortlessly</span>
        </h1>

        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
          EventSphere helps students, organizers and admins
          manage registrations, attendance and certificates
          from one platform.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
            Get Started
          </button>

          <button className="border border-slate-700 px-6 py-3 rounded-lg">
            Explore Events
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="px-10 pb-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="text-xl font-bold mb-3">
              Create Events
            </h3>

            <p className="text-slate-400">
              Organizers can create and manage events easily.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="text-xl font-bold mb-3">
              Registration
            </h3>

            <p className="text-slate-400">
              Students can register for events in one click.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="text-xl font-bold mb-3">
              Attendance
            </h3>

            <p className="text-slate-400">
              Track attendance digitally.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="text-xl font-bold mb-3">
              Certificates
            </h3>

            <p className="text-slate-400">
              Generate participation certificates instantly.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;