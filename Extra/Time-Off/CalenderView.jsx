import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const employees = [
  { name: "Adams, Okey", title: "Senior Account Executive", color: "#00BCD4" },
  { name: "Bojovic, Nick", title: "Revenue Operations Manager", color: "#9C27B0" },
  { name: "Dare, Jessica", title: "Sales Development Representative", color: "#FFCC80" },
  { name: "Howe, Cristina", title: "Sales Development Manager", color: "#F06292" },
  { name: "Kreiger, Ashley", title: "Enterprise Account Executive", color: "#4CAF50" },
  { name: "Marquardt, Loren", title: "Sales Development Representative", color: "#FFB74D" },
  { name: "Murazik, Aleen", title: "VP of Customer Services", color: "#CDDC39" },
  { name: "Murazik, Kelly", title: "Sales Development Representative", color: "#E91E63" },
  { name: "Pollich, Sam", title: "Sales Manager", color: "#9575CD" },
  { name: "Trantow, Pietro", title: "VP of Sales", color: "#90A4AE" },
  { name: "Von, Marian", title: "Account Executive", color: "#F44336" },
];

const leaves = [
  {
    employeeIndex: 0,
    start: new Date(2025, 5, 3), // June 3, 2025
    end: new Date(2025, 5, 5),
    label: "Paid time off",
    color: "#D3F9D8",
  },
  {
    employeeIndex: 1,
    start: new Date(2025, 5, 17), 
    end: new Date(2025, 5, 23),
    label: "Paid time off",
    color: "#D3F9D8",
  },
  {
    employeeIndex: 1,
    start: new Date(2025, 11, 7), 
    end: new Date(2025, 11, 12),
    label: "Paid time off",
    color: "#D3F9D8",
  },
  {
    employeeIndex: 0,
    start: new Date(2025, 6, 7), 
    end: new Date(2025, 5, 5),
    label: "Paid time off",
    color: "#D3F9D8",
  },
];

export const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)); // June 2025

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-based
  const daysInMonth = getDaysInMonth(year, month);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const monthLabel = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="w-full h-full p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-300 bg-gray-200 rounded">
          <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
        </button>
        <h2 className="text-md font-medium text-center">{monthLabel}</h2>
        <button onClick={handleNextMonth} className="p-1 hover:bg-gray-300 bg-gray-200 rounded">
          <ChevronRightIcon className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      <div className="flex border rounded shadow overflow-hidden">
        {/* Sidebar */}
        <div className="w-[250px] bg-white border-r flex-shrink-0">
          <div className="p-2 border-b font-medium">Employees ({employees.length})</div>
          {employees.map((emp, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 border-b"
              style={{ height: "56px" }}
            >
              <div
                className="w-8 h-8 rounded-full flex-shrink-0"
                style={{ backgroundColor: emp.color }}
              ></div>
              <div className="text-sm leading-tight w-full overflow-hidden">
                <div className="font-semibold text-gray-800 truncate">{emp.name}</div>
                <div className="text-gray-500 text-xs truncate">{emp.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto w-full">
          <div className="min-w-[1200px]">
            {/* Day Headers */}
            <div className="grid" style={{ gridTemplateColumns: `repeat(${days.length}, minmax(40px, 1fr))` }}>
              {days.map((day) => {
                const date = new Date(year, month, day);
                const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
                return (
                  <div
                    key={day}
                    className="text-center flex flex-col items-center justify-center border-b border-l first:border-l-0 h-[41px] text-gray-500 bg-gray-50"
                  >
                    <div className="text-[11px]">{weekday}</div>
                    <div className="text-sm text-black font-medium">{day}</div>
                  </div>
                );
              })}
            </div>

            {/* Employee Rows */}
            {employees.map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="relative grid border-b"
                style={{
                  gridTemplateColumns: `repeat(${days.length}, minmax(40px, 1fr))`,
                  height: "56px",
                }}
              >
                {/* Leaves */}
                {leaves
                  .filter((leave) => {
                    return (
                      leave.employeeIndex === rowIndex &&
                      (leave.start.getFullYear() === year || leave.end.getFullYear() === year) &&
                      (leave.start.getMonth() === month || leave.end.getMonth() === month)
                    );
                  })
                  .map((leave, idx) => {
                    const cellWidth = 40;

                    // Clamp to current month range
                    const leaveStartDay = leave.start.getMonth() < month ? 1 : leave.start.getDate();
                    const leaveEndDay = leave.end.getMonth() > month ? daysInMonth : leave.end.getDate();

                    const width = (leaveEndDay - leaveStartDay + 1) * cellWidth;
                    const left = (leaveStartDay - 1) * cellWidth;
                    const showLabel = width >= 100;

                    return (
                      <div
                        key={idx}
                        className="absolute h-6 rounded text-xs text-center leading-6 text-gray-800 overflow-hidden"
                        style={{
                          left,
                          width,
                          backgroundColor: leave.color,
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {showLabel ? leave.label : ""}
                      </div>
                    );
                  })}


                {/* Grid Lines */}
                {days.map((_, colIndex) => (
                  <div key={colIndex} className="border-l first:border-l-0"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
