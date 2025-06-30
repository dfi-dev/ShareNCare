import React from "react";

const ProfileCard = () => {
  return (
    <div className="bg-[#035946] text-white rounded-[20px] p-6 space-y-5 w-full max-w-sm mx-auto">
      <div className="w-16 h-16 rounded-full bg-white text-[#035946] text-xl font-bold flex items-center justify-center mx-auto">
        SS
      </div>

      <div className="text-center space-y-1">
        <p className="text-sm font-medium leading-tight">
          Scrum Master, Azure<br />
          Devops, Power BI
        </p>
        <p className="font-semibold text-sm">HR Generalist</p>
        <p className="text-xs text-white/70 leading-tight">
          US Entity | Boston Massachusetts,<br />
          United Stets | Bostin HQ
        </p>
      </div>

      <div className="bg-[#00C49A] bg-opacity-20 p-3 rounded-xl space-y-2">
        <p className="text-sm font-semibold text-white">Manager</p>
        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Manager"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold text-white">Will Luz</p>
            <p className="text-xs text-white/70">CHRO</p>
          </div>
        </div>
      </div>

      <div className="bg-[#00C49A] bg-opacity-20 p-3 rounded-xl space-y-2">
        <p className="text-sm font-semibold text-white">Teammates</p>
        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/men/65.jpg"
            alt="Teammate"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold text-white">Kshelrin Justice</p>
            <p className="text-xs text-white/70">VP of HR</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
