import React from "react";
import { CalendarDays, Clock } from "lucide-react";

const timeOffs = [
  { type: "Paid Leave", date: "Tuesday, 25 Jan 2025", duration: "2 days" },
  { type: "Sick Leave", date: "Tuesday, 15 Jan 2025", duration: "12 days" },
  { type: "Casual Leave", date: "Tuesday, 30 Jan 2025", duration: "4 days" },
];

const UpcomingTimeOffCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow w-full max-w-sm">
      {/* Header */}
      <div className="p-6 pb-3">
        <h2 className="text-lg font-bold text-black">Upcoming Time-off</h2>
      </div>

      {/* Header Separator */}
      <div className="border-t border-gray-200" />

      {/* Time-Off List */}
      <div className="p-6 pt-4 space-y-4">
        {timeOffs.map((leave, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 ${
              i !== timeOffs.length - 1 ? "pb-4 border-b border-gray-200" : ""
            }`}
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-lg bg-[#E5F8F3] flex items-center justify-center">
              <CalendarDays className="text-[#00C49A] w-5 h-5" />
            </div>

            {/* Details */}
            <div className="flex-1 space-y-1">
              <p className="font-semibold text-sm text-gray-900">{leave.type}</p>
              <p className="text-sm text-gray-700">{leave.date}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{leave.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTimeOffCard;
