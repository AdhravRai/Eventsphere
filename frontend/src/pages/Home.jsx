
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

import {
  FaCalendarAlt,
  FaUsers,
  FaCertificate,
  FaChartLine,
} from "react-icons/fa";

function Home() {
  return (
<div className="min-h-screen text-white overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-slate-950/70 border-b border-slate-800 flex justify-between items-center px-10 py-6">

        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          EventSphere
        </h1>

        <div className="flex gap-6">

          <Link
            to="/"
            className="hover:text-blue-400 transition"
          >
            Home
          </Link>

         <Link
  to="/login"
  className="px-5 py-2 border border-slate-700 rounded-xl hover:border-blue-500 transition"
>
  Login
</Link>

<Link
  to="/register"
  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition"
>
  Register
</Link>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative">

        {/* Background Glow */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 blur-[120px]" />
        <div className="absolute right-20 top-40 w-72 h-72 bg-purple-600/20 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <div>

            <div className="inline-block px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 mb-6">
              All-in-One Event Management Platform
            </div>

            <h1 className="text-6xl md:text-7xl font-bold leading-tight">

              Manage College
              <br />

              Events

              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {" "}
                Effortlessly
              </span>

            </h1>

            <p className="text-slate-400 text-xl mt-6 max-w-xl">
              EventSphere helps students, organizers and admins
              manage registrations, attendance and certificates
              from one platform.
            </p>

            <div className="flex gap-4 mt-10">

              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition duration-300">
                Get Started
              </button>

              <button className="px-8 py-4 rounded-xl border border-slate-700 hover:border-blue-500 transition">
                Explore Events
              </button>

            </div>

          </div>

          {/* Dashboard Preview */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">

            <h3 className="text-2xl font-bold mb-6">
              Event Overview
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <div className="bg-slate-800 p-5 rounded-xl">
                <FaCalendarAlt className="text-blue-400 text-2xl mb-2" />
                <p className="text-slate-400">Events</p>
                <h2 className="text-3xl font-bold">24</h2>
              </div>

              <div className="bg-slate-800 p-5 rounded-xl">
                <FaUsers className="text-purple-400 text-2xl mb-2" />
                <p className="text-slate-400">Registrations</p>
                <h2 className="text-3xl font-bold">1428</h2>
              </div>

              <div className="bg-slate-800 p-5 rounded-xl">
                <FaChartLine className="text-green-400 text-2xl mb-2" />
                <p className="text-slate-400">Attendance</p>
                <h2 className="text-3xl font-bold">982</h2>
              </div>

              <div className="bg-slate-800 p-5 rounded-xl">
                <FaCertificate className="text-orange-400 text-2xl mb-2" />
                <p className="text-slate-400">Certificates</p>
                <h2 className="text-3xl font-bold">736</h2>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Statistics */}
      <section className="px-10 pb-20">

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <h2 className="text-4xl font-bold text-blue-400">
              500+
            </h2>
            <p className="text-slate-400 mt-2">
              Events Managed
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <h2 className="text-4xl font-bold text-purple-400">
              10K+
            </h2>
            <p className="text-slate-400 mt-2">
              Students Registered
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <h2 className="text-4xl font-bold text-green-400">
              98%
            </h2>
            <p className="text-slate-400 mt-2">
              Attendance Accuracy
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <h2 className="text-4xl font-bold text-orange-400">
              4K+
            </h2>
            <p className="text-slate-400 mt-2">
              Certificates Issued
            </p>
          </div>

        </div>

      </section>

      {/* Features */}
      <section className="px-10 pb-20">

        <h2 className="text-5xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-xl border border-slate-800 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-xl font-bold mb-3">
              Create Events
            </h3>

            <p className="text-slate-400">
              Organizers can create and manage events easily.
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-xl border border-slate-800 hover:border-purple-500 hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-xl font-bold mb-3">
              Registration
            </h3>

            <p className="text-slate-400">
              Students can register for events in one click.
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-xl border border-slate-800 hover:border-green-500 hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-xl font-bold mb-3">
              Attendance
            </h3>

            <p className="text-slate-400">
              Track attendance digitally.
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-xl border border-slate-800 hover:border-orange-500 hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-xl font-bold mb-3">
              Certificates
            </h3>

            <p className="text-slate-400">
              Generate participation certificates instantly.
            </p>
          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default Home;

