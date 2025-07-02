import React from "react";
import CalendarCard from "../../Components/Dashboard/CalendarCard";
import JobsCard from "../../Components/Dashboard/JobsCard";
import OnboardNewHiresCard from "../../Components/Dashboard/OnboardNewHiresCard";
import TimeOffBalancesCard from "../../Components/Dashboard/TimeOffBalancesCard";
import ProfileCard from "../../Components/Dashboard/ProfileCard";
import NotificationsCard from "../../Components/Dashboard/NotificationsCard";
import UpcomingTimeOffCard from "../../Components/Dashboard/UpcomingTimeOffCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F4F4F5] px-6 lg:px-24 py-12 space-y-6">
      {/* Top Greeting */}
      <div className="text-xl font-semibold text-[#1A1A1A] px-6 lg:px-0">
        Hello Sourabh!
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <CalendarCard />
          <JobsCard />
          <OnboardNewHiresCard />
          <TimeOffBalancesCard />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <ProfileCard />
          <NotificationsCard />
          <UpcomingTimeOffCard />
        </div>
      </div>
    </div>
  );
}