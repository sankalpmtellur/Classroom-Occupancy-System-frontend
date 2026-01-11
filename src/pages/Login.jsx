import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.webp";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const USERNAME = "admin@rishihood.edu.in";
  const PASSWORD = "12345678";

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === USERNAME && password === PASSWORD) {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl bg-white shadow-lg border border-slate-200 px-10 py-12"
      >
        <div className="flex justify-center mb-8">
          <img
            src={logo}
            alt="University Logo"
            className="h-14 object-contain drop-shadow-sm"
          />
        </div>

        <h1 className="text-xl font-semibold text-slate-800 text-center mb-2">
          System Login
        </h1>

        <p className="text-sm text-slate-600 text-center mb-8">
          Login to access the Classroom Occupancy Monitoring System
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              University Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@university.edu"
              className="w-full px-4 py-2.5 rounded-lg text-sm
                         border border-slate-300 focus:outline-none
                         focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 pr-10 rounded-lg text-sm
                           border border-slate-300 focus:outline-none
                           focus:ring-2 focus:ring-orange-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-lg text-sm font-medium text-white
                       bg-gradient-to-r from-red-500 to-orange-500
                       hover:shadow-md transition-all"
          >
            Login
          </button>
        </form>

        <div className="mt-8 text-xs text-slate-400 text-center">
          For authorised university personnel only
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-xs text-orange-600">
            ← Back
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
