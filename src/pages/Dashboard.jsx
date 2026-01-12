import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Zap, RotateCcw, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import logo from "../assets/logo.webp";

const BACKEND_URL = "http://localhost:3000";
const socket = io(BACKEND_URL);

export default function Dashboard() {
  const [occupied, setOccupied] = useState(0);
  const navigate = useNavigate();

  const classroom = {
    block: "A",
    floor: 4,
    roomNumber: 407,
    capacity: 60,
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/status`)
      .then((res) => res.json())
      .then((data) => setOccupied(data.occupied))
      .catch((err) => console.error("Connection error:", err));

    socket.on("occupancyUpdate", (newCount) => {
      setOccupied(newCount);
    });

    return () => socket.off("occupancyUpdate");
  }, []);

  const handleReset = async () => {
    try {
      await fetch(`${BACKEND_URL}/occupancy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: 0 }),
      });
    } catch (err) {
      console.error("Reset failed:", err);
    }
  };

  const handleLogout = () => navigate("/login");

  const occupancyPercent = Math.min(Math.floor((occupied / classroom.capacity) * 100), 100);
  const remainingSeats = Math.max(classroom.capacity - occupied, 0);

  const status =
    occupancyPercent >= 90
      ? { label: "Full", badge: "bg-red-50 border-red-200 text-red-600" }
      : occupancyPercent >= 70
        ? { label: "Busy", badge: "bg-orange-50 border-orange-200 text-orange-600" }
        : { label: "Available", badge: "bg-emerald-50 border-emerald-200 text-emerald-600" };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-white px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-3xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 bg-white/80 backdrop-blur border border-white/70 rounded-2xl px-5 py-4 shadow">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo" className="h-10" />
            <h1 className="text-lg font-semibold text-slate-800 tracking-tight">
              Room {classroom.roomNumber}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 text-xs font-bold rounded-full border ${status.badge}`}>
              {status.label}
            </span>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-500 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="rounded-3xl bg-white shadow-xl border border-white/60 p-8 space-y-8">
          <div className="text-center">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em]">
              Occupancy
            </p>
            <motion.div
              key={occupied}
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="text-7xl font-black my-3 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent leading-tight"
            >
              {occupied}
            </motion.div>
            <p className="text-slate-500 text-sm font-medium">
              Total Capacity: {classroom.capacity}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-[0.14em]">
              <span>Utilization</span>
              <span>{occupancyPercent}%</span>
            </div>
            <div className="h-3.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200">
              <motion.div
                animate={{ width: `${occupancyPercent}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`h-full ${
                  occupancyPercent >= 90
                    ? "bg-gradient-to-r from-red-500 to-red-600"
                    : "bg-gradient-to-r from-red-500 via-orange-500 to-orange-400"
                }`}
              />
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Block", val: classroom.block },
              { label: "Floor", val: classroom.floor },
              { label: "Available", val: remainingSeats },
              { label: "Usage", val: `${occupancyPercent}%` }
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 shadow-[0_4px_18px_rgba(15,23,42,0.04)]"
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.18em]">
                  {stat.label}
                </p>
                <p className="text-lg font-semibold text-slate-800 mt-1">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}