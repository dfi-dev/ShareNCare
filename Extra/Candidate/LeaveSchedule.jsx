import React from 'react';
import { Circle, Users, Filter, ChevronDown } from 'lucide-react';


export default function LeaveSchedule() {
  const days = ['MON 22', 'TUE 23', 'WED 24', 'THU 25', 'FRI 26', 'SAT 27', 'SUN 28'];

  const people = [
    {
      name: 'Aastha',
      initials: 'AN',
      role: 'UI/UX Design',
      hours: '44 Hours',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      leaves: ['', 'Unplanned Leave', 'Sick Leave', '', 'Sick Leave', '', 'Unplanned Leave']
    },
    {
      name: 'Sourabh',
      initials: '',
      role: 'Frontend Dev',
      hours: '24 Hours',
      avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
      leaves: ['', '', 'Unplanned Leave', 'Sick Leave', '', '', '']
    }
  ];

  const Section = ({ title }) => (
    <div className="mb-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-2">▾ {title}</h2>
      {people.map((person, idx) => (
        <div key={idx} className="flex border rounded-lg mb-2 bg-white overflow-hidden">
          {/* Employee Card */}
          <div className="w-[240px] px-4 py-4 flex items-center space-x-3 border-r bg-white shrink-0">
            {person.avatar ? (
              <img src={person.avatar} className="w-8 h-8 rounded-full" alt="avatar" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 text-xs font-bold flex items-center justify-center">
                {person.initials}
              </div>
            )}
            <div>
              <div className="text-sm font-semibold">{person.name}</div>
              <div className="text-xs text-gray-500">{person.role} · {person.hours}</div>
            </div>
          </div>

          {/* Leave Grid */}
          <div className="flex flex-1 text-[11px]">
            {person.leaves.map((type, i) => {
              let style = 'inline-block px-2 py-2 rounded-lg font-semibold';
              if (type === 'Unplanned Leave') style += ' bg-red-100 text-red-600';
              else if (type === 'Sick Leave') style += ' bg-blue-100 text-blue-700';
              else if (type === 'Paid Time Off') style += ' bg-yellow-100 text-yellow-700';

              return (
                <div
                  key={i}
                  className="flex-1 px-1 py-2 flex justify-center items-center border-l border-r border-gray-100"
                >
                  {type && (
                    <span className={`${style} text-xs`}>
                      {type}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

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
            <button className="px-4 py-1.5 rounded-full bg-white text-gray-900 font-semibold shadow-sm border border-gray-200">
              Week
            </button>
            <button className="px-4 py-1.5 rounded-full bg-[#ede9f7] text-gray-600">
              Month
            </button>
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm bg-[#ede9f7] text-gray-700 font-medium cursor-pointer">
              Current Week <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Date Row */}
        <div className="flex border-b text-sm font-medium text-gray-700 px-4">
          {/* Left blank column to match employee card */}
          <div className="w-[240px] shrink-0 py-3 border-r bg-white"></div>

          {/* Date cells */}
          {days.map((day, i) => (
            <div key={i} className="flex-1 text-center py-3 border-l">
              <div>{day.split(' ')[0]}</div>
              <div className="text-base font-semibold">{day.split(' ')[1]}</div>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="px-4 py-4">
          <Section title="Front End Developer Team" />
          <Section title="Backend developer" />
        </div>
      </div>
    </div>
  );
}
