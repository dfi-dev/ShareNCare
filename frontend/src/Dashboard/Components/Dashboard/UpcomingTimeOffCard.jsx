import React from "react";
import { CalendarDays, Clock } from "lucide-react";

const timeOffs = [
  { type: "Paid Leave", date: "Tuesday, 25 Jan 2025", duration: "2 days" },
  { type: "Sick Leave", date: "Tuesday, 15 Jan 2025", duration: "12 days" },
  { type: "Casual Leave", date: "Tuesday, 30 Jan 2025", duration: "4 days" },
];

const UpcomingTimeOffCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 w-full max-w-sm mx-auto">
      <h2 className="text-lg font-semibold mb-2 px-2">Upcoming Time-off</h2>
      <hr className="-mx-6 border-t border-gray-200 my-2" />

      <div className="space-y-4">
        {timeOffs.map((leave, i) => (
          <div
            key={i}
            className={`flex gap-3 ${i !== timeOffs.length - 1 ? "pb-4 border-b border-gray-200" : ""}`}
          >
            {/* Vertically centered icon block */}
            <div className="w-12 h-12 rounded-lg bg-[#E5F8F3] flex items-center justify-center self-center">
              <CalendarDays className="text-[#007A6E] w-5 h-5" />
            </div>

            {/* Text content */}
            <div className="flex-1 space-y-1">
              <p className="font-semibold text-sm text-black">{leave.type}</p>
              <p className="text-sm text-[#1A1A1A]">{leave.date}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
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
