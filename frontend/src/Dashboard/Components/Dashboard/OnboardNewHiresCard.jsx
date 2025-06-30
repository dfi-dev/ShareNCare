import React from "react";
import { Rocket } from "lucide-react";
import IconWrapper from "./IconWrapper";

const hires = [
  {
    name: "Lynch, Krystel",
    role: "Sales Development Representative",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Kevin Karol",
    role: "Sales Development Representative",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    name: "Lissa K",
    role: "Sales Development Representative",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
  },
];

const OnboardNewHiresCard = () => {
  return (
    <div className="bg-white rounded-xl shadow p-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-6 pb-4">
        <IconWrapper>
          <Rocket className="w-4 h-4" />
        </IconWrapper>
        <h2 className="text-lg font-semibold text-black">Onboard New Hires</h2>
      </div>

      {/* Separator line */}
      <hr className="border-gray-200" />

      {/* Section Title */}
      <p className="text-sm font-semibold text-indigo-600 px-6 py-2">Employees</p>

      {/* Hires List */}
      <div className="divide-y">
        {hires.map((hire, index) => (
          <div key={index} className="flex items-center gap-4 px-6 py-3">
            <img
              src={hire.avatar}
              alt={hire.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                {hire.name}
                <span className="text-[10px] bg-[#E8FBF7] text-[#00C49A] px-2 py-0.5 rounded-full font-medium">
                  SAMPLE
                </span>
              </p>
              <p className="text-sm text-gray-500">{hire.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardNewHiresCard;
