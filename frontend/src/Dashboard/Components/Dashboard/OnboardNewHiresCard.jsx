import React, { useState } from "react";
import { Rocket } from "lucide-react";
import StartOnboardingModal from "../Dashboard/StartOnboardingModal"; // Make sure path is correct

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
  {
    name: "Rama Panda",
    role: "Sale Executive",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
];

const OnboardNewHiresCard = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleStartOnboarding = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCancel = () => setSelectedEmployee(null);

  return (
    <>
      <div className="bg-white rounded-xl shadow p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b">
          <div className="w-10 h-10 bg-[#007a6e] rounded-full flex items-center justify-center text-white">
            <Rocket className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-black">Onboard New Hires</h2>
        </div>

        {/* Separator line */}
        <hr className="border-gray-200" />

        {/* Section Title */}
        <p className="text-sm font-semibold text-[#0e079a] px-6 py-2">Employees</p>

        {/* Hires List */}
        <div className="divide-y">
          {hires.map((hire, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleStartOnboarding(hire)}
            >
              <img
                src={hire.avatar}
                alt={hire.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  {hire.name}
                  <span className="text-[10px] bg-[#E8FBF7] text-[#007a6e] px-2 py-0.5 rounded-full font-medium">
                    SAMPLE
                  </span>
                </p>
                <p className="text-sm text-gray-500">{hire.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Show Modal If Employee Selected */}
      {selectedEmployee && (
        <StartOnboardingModal
          candidateName={selectedEmployee.name}
          onCancel={handleCancel}
          onStart={(data) => {
            console.log("Onboarding Started for:", selectedEmployee.name, data);
            handleCancel(); // Close modal after start
          }}
        />
      )}
    </>
  );
};

export default OnboardNewHiresCard;
