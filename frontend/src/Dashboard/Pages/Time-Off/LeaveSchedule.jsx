import React, { useState } from 'react';
import { Circle, Users, Filter, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LeaveSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("week");
  const [weekMenuOpen, setWeekMenuOpen] = useState(false);
  const [selectedWeekLabel, setSelectedWeekLabel] = useState("Current Week");


  const teams = ['Frontend', 'Backend'];

  const switchToWeekView = () => {
    setViewMode("week");
    setCurrentDate(new Date()); // Reset to current date
  };

  const switchToMonthView = () => {
    const now = new Date();
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    setViewMode("month");
    setCurrentDate(firstOfMonth); // Reset to first of the month
  };

  const goToPrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
      newDate.setDate(1); // Go to first of the month
    }
    setCurrentDate(newDate);
  };

  const goToWeek = (offset) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + offset * 7);
    setCurrentDate(newDate);

    if (offset === 0) setSelectedWeekLabel("Current Week");
    else if (offset === -1) setSelectedWeekLabel("Last Week");
    else if (offset === 1) setSelectedWeekLabel("Next Week");
    else setSelectedWeekLabel("Week");
  };


  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
      newDate.setDate(1); // Go to first of the month
    }
    setCurrentDate(newDate);
  };


  const formatMonth = (date) =>
    date
      .toLocaleDateString("en-US", { month: "short", year: "numeric" })
      .toUpperCase(); // makes it "SEP 2025"


  // Get start of week (Monday)
  const getWeekDates = (baseDate) => {
    const start = new Date(baseDate);
    const day = start.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    const diffToMonday = (day + 6) % 7; // Adjust Sunday (0) to 6, etc.
    start.setDate(start.getDate() - diffToMonday);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const getMonthDates = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
      return new Date(year, month, i + 1);
    });
  };


  const weekDates = getWeekDates(currentDate);
  const monthDates = getMonthDates(currentDate);

  const days = (viewMode === "month" ? monthDates : weekDates).map((date) =>
    date.toLocaleDateString("en-US", { weekday: "short", day: "numeric" })
  );


  const leaves = [
    {
      empId: 1,
      name: 'Milly',
      initials: 'AN',
      role: 'UI/UX Design',
      hours: '44 Hours',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      team: 'Frontend',
      start: new Date(2025, 5, 18),
      end: new Date(2025, 5, 21),
      label: "Paid time off",
      color: "#D3F9D8",
    },
    {
      empId: 2,
      name: 'Joseph',
      initials: '',
      role: 'Frontend Dev',
      hours: '24 Hours',
      avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
      team: 'Frontend',
      start: new Date(2025, 5, 4),
      end: new Date(2025, 5, 11),
      label: "Paid time off",
      color: "#D3F9D8",
    },
    {
      empId: 3,
      name: 'Vishal',
      initials: '',
      role: 'Frontend Dev',
      hours: '24 Hours',
      avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
      team: 'Backend',
      start: new Date(2025, 11, 7),
      end: new Date(2025, 11, 12),
      label: "Paid time off",
      color: "#D3F9D8",
    },
    {
      empId: 4,
      name: 'Subham',
      initials: '',
      role: 'Frontend Dev',
      hours: '24 Hours',
      avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
      team: 'Backend',
      start: new Date(2025, 5, 13),
      end: new Date(2025, 5, 17),
      label: "Paid time off",
      color: "#D3F9D8",
    },
  ];





  const Section = ({ title, days, viewMode, weekDates, monthDates, leaves }) => {
    // 1. Get unique employees from the leaves
    const uniqueEmployees = Array.from(
      new Map(leaves.map((leave) => [leave.empId, leave])).values()
    );


    return (
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">▾ {title}</h2>

        {uniqueEmployees.length === 0 ? (
          <div className="text-gray-500 text-sm">No one is on leave.</div>
        ) : (
          uniqueEmployees.map((employee, idx) => {
            const employeeLeaves = leaves.filter((l) => l.empId === employee.empId);

            return (
              <div key={employee.empId} className="flex border rounded-lg mb-2 bg-white overflow-hidden">
                {/* Employee Card */}
                <div className="w-[240px] px-4 py-4 flex items-center space-x-3 border-r bg-white shrink-0">
                  {employee.avatar ? (
                    <img src={employee.avatar} className="w-8 h-8 rounded-full" alt="avatar" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 text-xs font-bold flex items-center justify-center">
                      {employee.initials}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-semibold">{employee.name}</div>
                    <div className="text-xs text-gray-500">
                      {employee.role} · {employee.hours}
                    </div>
                  </div>
                </div>

                {/* Leave Grid */}
                <div className="flex flex-1 text-[11px] overflow-x-auto relative">
                  {Array.from({ length: days.length }).map((_, i) => {
                    const date = viewMode === "month" ? monthDates[i] : weekDates[i];

                    return (
                      <div
                        key={i}
                        className="flex-1 border-l border-r border-gray-100"
                        style={{ minHeight: "40px" }} // consistent height
                      ></div>
                    );
                  })}

                  {/* Absolute positioned leave blocks */}
                  {employeeLeaves.map((leave, idx) => {
                  const viewDates = viewMode === "month" ? monthDates : weekDates;
                  const viewStart = viewDates[0];
                  const viewEnd = viewDates[viewDates.length - 1];
                
                  const leaveStart = leave.start;
                  const leaveEnd = leave.end;
                
                  if (leaveEnd < viewStart || leaveStart > viewEnd) return null;
                
                  const finalStart = viewDates.findIndex(d => d >= leaveStart);
                  const finalEnd = [...viewDates].reverse().findIndex(d => d <= leaveEnd);
                  
                  const start = finalStart === -1 ? 0 : finalStart;
                  const end = finalEnd === -1 ? viewDates.length - 1 : viewDates.length - 1 - finalEnd;
                  
                  const span = end - start + 1;                  
                  
                  return (
                    <div
                      key={idx}
                      className="absolute top-1/2 -translate-y-1/2 h-full flex items-center justify-center text-xs font-semibold text-center"
                      style={{
                        backgroundColor: leave.color,
                        left: `${(100 / days.length) * finalStart}%`,
                        width: `${(100 / days.length) * span}%`,
                        zIndex: 1,
                      }}
                    >
                      {leave.label}
                    </div>
                  );
                  })}
                </div>


              </div>
            );
          })
        )}
      </div>
    );
  };



  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-md">
        {/* Header Controls */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-[#f6f3fc] flex-wrap gap-3">

          {/* Left side buttons */}
          <div className="flex items-center flex-wrap gap-2 text-sm">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ede9f7] text-gray-600">
              <Circle className="w-4 h-4" /> Shift view
            </button>

            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-gray-900 font-semibold shadow-sm border border-gray-200">
              <Users className="w-4 h-4" /> Staff view
            </button>

            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ede9f7] text-gray-600">
              <Filter className="w-4 h-4" /> Status <span className="font-semibold ml-0.5 text-sm">All</span>
            </button>

            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ede9f7] text-gray-600">
              <Filter className="w-4 h-4" /> Team <span className="font-semibold text-sm ml-0.5">All</span>
            </button>

            <span className="ml-2 text-sm text-teal-600 font-medium cursor-pointer">+ Advanced filter</span>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={switchToWeekView}
              className={`px-4 py-1.5 rounded-full ${viewMode === "week"
                ? "bg-white text-gray-900 font-semibold shadow-sm border"
                : "bg-[#ede9f7] text-gray-600"
                }`}
            >
              Week
            </button>
            <button
              onClick={switchToMonthView}
              className={`px-4 py-1.5 rounded-full ${viewMode === "month"
                ? "bg-white text-gray-900 font-semibold shadow-sm border"
                : "bg-[#ede9f7] text-gray-600"
                }`}
            >
              Month
            </button>

            {viewMode === "month" ? (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm bg-[#ede9f7] text-gray-700 font-medium" style={{ width: "150px", justifyContent: "space-between" }}>
                <button onClick={goToPrev}>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-center text-sm w-full">{formatMonth(currentDate)}</span>
                <button onClick={goToNext}>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setWeekMenuOpen(!weekMenuOpen)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm bg-[#ede9f7] text-gray-700 font-medium"
                >
                  {selectedWeekLabel} <ChevronDown className="w-4 h-4" />
                </button>

                {weekMenuOpen && (
                  <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded shadow z-10 w-40">
                    <button
                      onClick={() => {
                        goToWeek(-1);
                        setWeekMenuOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Last Week
                    </button>
                    <button
                      onClick={() => {
                        goToWeek(0);
                        setWeekMenuOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Current Week
                    </button>
                    <button
                      onClick={() => {
                        goToWeek(1);
                        setWeekMenuOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Next Week
                    </button>
                  </div>
                )}
              </div>


            )}

          </div>
        </div>

        {/* Date Row */}
        <div className="flex border-b text-sm font-medium text-gray-700 px-4">
          {/* Left blank column to match employee card */}
          <div className="w-[240px] shrink-0 py-3 border-r bg-white"></div>

          {/* Date cells */}
          {days.map((day, i) => (
            <div key={i} className="flex-1 text-center py-3 border-l">
              <div className='text-sm'>{day.split(' ')[0]}</div>
              <div className="text-base font-semibold text-xs">{day.split(' ')[1]}</div>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="px-4 py-4">
          {teams.map(team => (
            <Section
              key={team}
              title={`${team} Team`}
              days={days}
              viewMode={viewMode}
              weekDates={weekDates}
              monthDates={monthDates}
              leaves={leaves.filter(l => l.team === team)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
