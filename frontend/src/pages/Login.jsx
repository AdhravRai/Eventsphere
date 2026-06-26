import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShieldAlt, FaGoogle } from "react-icons/fa";
import api from "../services/api";
import BackButton from "../components/BackButton";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const res = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log("LOGIN USER:", res.data.user);

      alert("Login Successful");

      if (res.data.user.role === "student") {
        navigate("/subscription");
      } else if (res.data.user.role === "organizer") {
        navigate("/organizer-dashboard");
      } else if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white flex items-center justify-center px-6">
      <BackButton />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center">
          <h1 className="text-6xl font-bold leading-tight">
            Welcome Back to
            <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              EventSphere
            </span>
          </h1>

          <p className="text-slate-400 text-xl mt-6">
            Manage registrations, attendance and certificates from a single
            platform.
          </p>

          <div className="mt-10 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 w-80">
            <FaShieldAlt className="text-blue-400 text-5xl mb-4" />
            <h3 className="text-2xl font-bold mb-2">Secure Access</h3>
            <p className="text-slate-400">
              Your data is protected with modern authentication and role-based
              access.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-4xl font-bold mb-2">Welcome Back 👋</h1>

          <p className="text-slate-400 mb-8">
            Login to continue managing your events.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-300 mb-2">Email Address</label>

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
              <label className="block text-slate-300 mb-2">Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">Role</label>

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
              Login
            </button>

            <div className="relative my-4">
              <div className="border-t border-slate-700"></div>
              <span className="absolute left-1/2 -translate-x-1/2 -top-3 px-2 bg-slate-900 text-slate-400">
                OR
              </span>
            </div>

            <button
              type="button"
              className="w-full py-3 rounded-xl border border-slate-700 flex items-center justify-center gap-3 hover:border-blue-500 transition"
            >
              <FaGoogle />
              Login with Google
            </button>
          </form>

          <p className="text-center text-slate-400 mt-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
