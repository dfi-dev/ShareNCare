import React from "react";
import { Calendar } from "lucide-react";

const TimeOffBalancesCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden w-full max-w-6xl mx-auto">
      {/* Header - matched with JobsCard */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#007a6e] rounded-full flex items-center justify-center text-white">
            <Calendar className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-black">Your time-off Balances</h2>
        </div>
        <button className="bg-[#007A6E] hover:bg-[#006a60] text-white px-5 py-1.5 rounded-full text-sm font-medium">
          Request Time Off
        </button>
      </div>

      {/* Leave cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Paid Time Off */}
        <div className="border-2 border-[#007A6E] rounded-xl p-4 flex flex-col justify-center h-24">
          <p className="text-sm font-medium text-[#1A1A1A] mb-2">Paid time off</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-extrabold text-[#007A6E]">14</p>
            <p className="text-sm text-[#1A1A1A]">Days available</p>
          </div>
        </div>

        {/* Sick Leave - Active */}
        <div className="bg-[#007A6E] text-white rounded-xl p-4 flex flex-col justify-center h-24">
          <p className="text-sm font-medium text-white mb-2">Sick Leave</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-extrabold">32</p>
            <p className="text-sm">Hours available</p>
          </div>
        </div>

        {/* Casual Leave */}
        <div className="border-2 border-[#007A6E] rounded-xl p-4 flex flex-col justify-center h-24">
          <p className="text-sm font-medium text-[#1A1A1A] mb-2">Casual Leave</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-extrabold text-[#007A6E]">05</p>
            <p className="text-sm text-[#1A1A1A]">Days available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeOffBalancesCard;
