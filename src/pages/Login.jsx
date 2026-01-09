import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.webp";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white w-full max-w-md px-10 py-12 rounded-xl
                   border border-slate-200 shadow-sm"
      >
        <div className="flex justify-center mb-8">
          <img
            src={logo}
            alt="Rishihood University"
            className="h-14 object-contain"
          />
        </div>

        <h1 className="text-xl font-semibold text-slate-800 text-center mb-2">
          System Login
        </h1>

        <p className="text-sm text-slate-600 text-center mb-8">
          Login to access the Classroom Occupancy Monitoring System
        </p>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              University Email
            </label>
            <input
              type="email"
              placeholder="name@university.edu"
              className="w-full px-4 py-2.5 rounded-lg text-sm
                         border border-slate-300 focus:outline-none
                         focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 pr-10 rounded-lg text-sm
                           border border-slate-300 focus:outline-none
                           focus:ring-2 focus:ring-indigo-500"
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

          <Link to="/dashboard">
            <button
              type="button"
              className="w-full mt-2 py-3 rounded-lg text-sm font-medium text-white
                         bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Login
            </button>
          </Link>
        </form>

        <div className="mt-8 text-xs text-slate-400 text-center">
          Authorised university personnel only
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-xs text-indigo-600 hover:underline">
            ← Back
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
