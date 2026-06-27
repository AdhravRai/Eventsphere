import { useState } from "react";
import api from "../services/api";
import BackButton from "../components/BackButton";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", formData);

      alert(res.data.message);

      localStorage.setItem("token", res.data.token);

      console.log(res.data);
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white flex items-center justify-center px-6">


      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center">
          <div className="mb-6">
            <BackButton />
          </div>

          <h1 className="text-6xl font-bold leading-tight">
            Join
            <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              EventSphere
            </span>
          </h1>

          <p className="text-slate-400 text-xl mt-6">
            Create events, manage registrations, track attendance
            and generate certificates from one platform.
          </p>

          <div className="mt-10 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 w-80">

            <h3 className="text-2xl font-bold mb-2">
              All-in-One Platform
            </h3>

            <p className="text-slate-400">
              Designed for Students, Organizers and Admins to
              manage college events seamlessly.
            </p>

          </div>

        </div>

        {/* Right Side Form */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">

          <h1 className="text-4xl font-bold mb-2">
            Create Account ✨
          </h1>

          <p className="text-slate-400 mb-8">
            Join EventSphere and start managing events.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-slate-300 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none"
              >
                <option value="student">Student</option>
                <option value="organizer">Organizer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] transition"
            >
              Create Account
            </button>

          </form>

        </div>

      </div>

    </div>
  );


}

export default Register;