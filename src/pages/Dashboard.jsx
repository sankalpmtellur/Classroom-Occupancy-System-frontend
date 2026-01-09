import { Users, Zap } from "lucide-react";

export default function Dashboard() {
  const classroom = {
    block: "C",
    floor: 2,
    roomNumber: 202,
    capacity: 120,
    occupied: 85,
  };

  const occupancyPercent = Math.floor(
    (classroom.occupied / classroom.capacity) * 100
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Classroom Prototype Overview
          </h2>
          <Users className="w-8 h-8 text-indigo-600" />
        </div>

        <div className="space-y-4">
          <div className="text-gray-600 text-sm">
            <span className="font-medium text-gray-800">Location:</span> Block{" "}
            {classroom.block}, Floor {classroom.floor}
          </div>
          <div className="text-gray-600 text-sm">
            <span className="font-medium text-gray-800">Room Number:</span>{" "}
            {classroom.roomNumber}
          </div>
          <div className="text-gray-600 text-sm">
            <span className="font-medium text-gray-800">Capacity:</span>{" "}
            {classroom.capacity} seats
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-700 font-semibold">Occupancy</span>
              <span className="text-gray-700 font-semibold">
                {occupancyPercent}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${occupancyPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
              <Zap className="w-6 h-6 text-indigo-600" />
              <div>
                <p className="text-indigo-700 font-semibold text-sm">
                  Live Updates
                </p>
                <p className="text-indigo-900 font-bold text-lg">Enabled</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
              <Users className="w-6 h-6 text-indigo-600" />
              <div>
                <p className="text-indigo-700 font-semibold text-sm">
                  Current Occupancy
                </p>
                <p className="text-indigo-900 font-bold text-lg">
                  {classroom.occupied}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
