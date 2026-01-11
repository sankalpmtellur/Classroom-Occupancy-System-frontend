import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";

export default function Launch() {
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
            className="h-16 object-contain drop-shadow-sm"
          />
        </div>

        <h1 className="text-xl font-semibold text-slate-800 text-center mb-2">
          Classroom Occupancy Monitoring System
        </h1>

        <p className="text-slate-600 text-sm text-center mb-10">
          A centralised system for real-time classroom occupancy monitoring.
        </p>

        <Link to="/login" className="block">
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-lg text-sm font-medium text-white
                       bg-gradient-to-r from-red-500 to-orange-500
                       hover:shadow-md transition-all"
          >
            Access System
          </motion.button>
        </Link>

        <div className="mt-8 text-xs text-center text-slate-400">
          For authorised university personnel only
        </div>
      </motion.div>
    </div>
  );
}
