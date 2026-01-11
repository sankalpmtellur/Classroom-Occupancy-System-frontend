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
    capacity: 120,
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/status`)
      .then((res) => res.json())
      .then((data) => setOccupied(data.occupied))
      .catch((err) => console.error("Could not connect to backend:", err));

    socket.on("occupancyUpdate", (newCount) => {
      console.log("Live Update Received:", newCount);
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 border border-gray-100">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Room Monitor</h2>
            <p className="text-sm text-gray-500">Real-time classroom data</p>
          </div>
          <div className="bg-indigo-100 p-3 rounded-xl">
            <Users className="w-6 h-6 text-indigo-600" />
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Location</span>
            <span className="font-semibold text-gray-800">Block {classroom.block}, Floor {classroom.floor}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Room Number</span>
            <span className="font-semibold text-gray-800">{classroom.roomNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Capacity</span>
            <span className="font-semibold text-gray-800">{classroom.capacity} seats</span>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-gray-700">Occupancy Level</span>
            <span className="text-2xl font-black text-indigo-600">{occupancyPercent}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full transition-all duration-700 ease-out ${
                occupancyPercent > 90 ? "bg-red-500" : "bg-indigo-600"
              }`}
              style={{ width: `${occupancyPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400">Live Status</span>
            </div>
            <p className="text-indigo-900 font-bold text-lg">Connected</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-gray-600" />
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Current</span>
            </div>
            <p className="text-gray-900 font-bold text-lg">{occupied} Persons</p>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleReset}
          className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors border border-dashed border-gray-200"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Counter to Zero
        </button>

      </div>
    </div>
  );
}