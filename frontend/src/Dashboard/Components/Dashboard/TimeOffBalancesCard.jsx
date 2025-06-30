import React from "react";
import { Plane } from "lucide-react";
import IconWrapper from "./IconWrapper"; // A small wrapper to style icons consistently

const TimeOffBalancesCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <IconWrapper className="bg-[#E6F7F2] text-[#00C49A]">
            <Plane className="w-4 h-4" />
          </IconWrapper>
          <h2 className="text-lg font-semibold text-[#1A1A1A]">Your time-off Balances</h2>
        </div>
        <button className="bg-[#00C49A] hover:bg-[#00b48d] text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all">
          Request Time Off
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 text-center">
        <div>
          <p className="text-3xl font-bold text-[#1A1A1A]">14</p>
          <p className="text-sm text-gray-500">Days available</p>
          <p className="text-sm mt-1 font-medium text-gray-700">Paid time off</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-[#1A1A1A]">32</p>
          <p className="text-sm text-gray-500">Hours available</p>
          <p className="text-sm mt-1 font-medium text-gray-700">Sick Leave</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-[#1A1A1A]">05</p>
          <p className="text-sm text-gray-500">Days available</p>
          <p className="text-sm mt-1 font-medium text-gray-700">Casual Leave</p>
        </div>
      </div>
    </div>
  );
};

export default TimeOffBalancesCard;
