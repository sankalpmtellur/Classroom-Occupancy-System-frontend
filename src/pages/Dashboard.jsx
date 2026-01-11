import { useState, useEffect } from "react";
import { Users, Zap, RotateCcw } from "lucide-react";
import { io } from "socket.io-client";

const BACKEND_URL = "http://localhost:3000";
const socket = io(BACKEND_URL);

export default function Dashboard() {
  const [occupied, setOccupied] = useState(0);

  const classroom = {
    block: "C",
    floor: 2,
    roomNumber: 202,
    capacity: 60,
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/status`)
      .then((res) => res.json())
      .then((data) => setOccupied(data.occupied))
      .catch((err) => console.error("Could not connect to backend:", err));

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

  const occupancyPercent = Math.min(
    Math.floor((occupied / classroom.capacity) * 100),
    100
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-sans">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-gray-200">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Room Monitor</h2>
            <p className="text-sm text-gray-500">Live classroom occupancy</p>
          </div>
          <div className="bg-indigo-100 p-3 rounded-xl">
            <Users className="w-7 h-7 text-indigo-600" />
          </div>
        </div>

        {/* Big Occupancy Display */}
        <div className="flex flex-col items-center justify-center mb-8">
          <p className="text-gray-500 text-sm mb-2">Current Occupancy</p>
          <p className="text-6xl font-bold text-indigo-600">{occupied}</p>
          <p className="text-gray-400 mt-1 text-sm">
            / {classroom.capacity} Seats
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Occupancy Level</span>
            <span className="text-sm font-bold text-gray-700">{occupancyPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full transition-all duration-700 ease-out ${
                occupancyPercent > 90 ? "bg-red-500" : "bg-indigo-600"
              }`}
              style={{ width: `${occupancyPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Classroom Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex flex-col items-start">
            <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400 mb-1">Live Status</span>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              <p className="text-indigo-900 font-bold text-sm">Connected</p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-start">
            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">Room</span>
            <p className="text-gray-900 font-semibold text-sm">
              Block {classroom.block}, Floor {classroom.floor}, Room {classroom.roomNumber}
            </p>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-colors border border-dashed border-gray-200"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Counter
        </button>

      </div>
    </div>
  );
}