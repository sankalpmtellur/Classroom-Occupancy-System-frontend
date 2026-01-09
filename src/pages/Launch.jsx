import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";

export default function Launch() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white w-full max-w-md px-10 py-12 rounded-xl
                   border border-slate-200 shadow-sm text-center"
      >
        <div className="flex justify-center mb-8">
          <img
            src={logo}
            alt="Rishihood University"
            className="h-16 object-contain"
          />
        </div>

        <h1 className="text-xl font-semibold text-slate-800 tracking-tight mb-2">
          Classroom Occupancy Monitoring System
        </h1>

        <p className="text-slate-600 text-sm mb-10">
          A centralised system for real-time classroom occupancy monitoring.
        </p>

        <Link to="/login">
          <button
            className="w-full py-3 rounded-lg text-sm font-medium text-white
                       bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Access System
          </button>
        </Link>

        <div className="mt-8 text-xs text-slate-400">
          For authorised university personnel only
        </div>
      </motion.div>
    </div>
  );
}
