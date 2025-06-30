import React, { useState } from "react";
import { Briefcase, Users, MoreVertical } from "lucide-react";
import IconWrapper from "./IconWrapper";

const JobsCard = () => {
  const jobs = [
    "Account Executive",
    "Director of Finance",
    "Employee Human Resource",
  ];

  const [menuIndex, setMenuIndex] = useState(null);

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#007a6e] rounded-full flex items-center justify-center text-white">
            <Briefcase className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-black">Jobs</h2>
        </div>
        <button className="bg-[#007a6e] text-white px-5 py-1.5 rounded-full text-sm font-medium">
          Create Job
        </button>
      </div>

      {jobs.map((title, i) => (
        <div
          key={i}
          className="flex justify-between items-center px-6 py-4 border-b relative"
        >
          <div>
            <p className="text-sm font-semibold text-black">{title}</p>
            <p className="text-sm text-gray-500">
              G8/AE – Onsite, London, United Kingdom
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#007a6e] bg-[#E6FAF5] px-2 py-[2px] rounded-full font-medium">
              SAMPLE
            </span>
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <Users className="w-4 h-4" /> 41
            </div>
            <div className="relative">
              <button
                onClick={() => setMenuIndex(menuIndex === i ? null : i)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
              {menuIndex === i && (
                <div className="absolute right-0 mt-2 w-44 bg-white shadow rounded-md text-sm z-10 border">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Preview Job Post
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Edit Job
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Refer Candidate
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="text-center px-6 py-3">
        <button className="text-sm text-[#0e079a] font-medium">View All Jobs</button>
      </div>
    </div>
  );
};

export default JobsCard;