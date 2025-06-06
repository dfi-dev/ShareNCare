import { ChevronLeft, Info, Upload } from 'lucide-react';
import React, { useState } from 'react';
import InteractiveCalendar from "./InteractiveCalendar"

const EmployeeProfileCard = () => {
  const [mainTab, setMainTab] = useState('Information');
  const [subTab, setSubTab] = useState('Personal');

  const renderSubTabContent = () => {
    if (mainTab !== 'Information' || subTab !== 'Personal') return null;

    return (
      <div className="p-6 grid grid-cols-3 gap-4 text-sm">
        <div>
          <label className="block text-gray-500">First Name</label>
          <input className="bg-gray-100 p-2 rounded w-full" defaultValue="Rex" />
        </div>
        <div>
          <label className="block text-gray-500">Last name</label>
          <input className="bg-gray-100 p-2 rounded w-full" defaultValue="Abernathy" />
        </div>
        <div>
          <label className="block text-gray-500">Last name</label>
          <input className="bg-gray-100 p-2 rounded w-full" defaultValue="Abernathy" />
        </div>

        <div>
          <label className="block text-gray-500">Preferred</label>
          <input className="bg-gray-100 p-2 rounded w-full" defaultValue="1" />
        </div>
        <div>
          <label className="block text-gray-500">Employee ID</label>
          <input className="bg-gray-100 p-2 rounded w-full" defaultValue="5" />
        </div>
        <div>
          <label className="block text-gray-500">Status</label>
          <input className="bg-gray-100 p-2 rounded w-full" defaultValue="Active" />
        </div>

        <div>
          <label className="block text-gray-500">Country</label>
          <input className="bg-gray-100 p-2 rounded w-full" defaultValue="United States of America" />
        </div>
        <div>
          <label className="block text-gray-500">Address</label>
          <input className="bg-gray-100 p-2 rounded w-full" defaultValue="US Entity | Boston, Massachusetts" />
        </div>
        <div>
          <label className="block text-gray-500">Gender</label>
          <input className="bg-gray-100 p-2 rounded w-full" defaultValue="-" />
        </div>

        <div>
          <label className="block text-gray-500">Birthday</label>
          <input className="bg-gray-100 p-2 rounded w-full" type="date" />
        </div>

        <div>
          <label className="block text-gray-500">Marital Status</label>
          <input className="bg-gray-100 p-2 rounded w-full" defaultValue="Married" />
        </div>
        <div>
          <label className="block text-gray-500">Certificate</label>
          <input className="bg-gray-100 p-2 rounded w-full" />
        </div>

        <div>
          <label className="block text-gray-500">Phone</label>
          <input className="bg-gray-100 p-2 rounded w-full" />
        </div>
        <div>
          <label className="block text-gray-500">Extension</label>
          <input className="bg-gray-100 p-2 rounded w-full" />
        </div>
      </div>
    );
  };

  const renderTimeOffTab = () => {
    if (mainTab !== "Time Off") return null;

    return (
      <div className="p-6 space-y-6 text-sm">
        {/* Request Header */}
        <div className="space-y-2">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Request Time Off</p>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:underline">Cancel</button>
              <button className="px-4 py-1 rounded-2xl border border-gray-300 hover:bg-gray-100">
                Request Time Off
              </button>
            </div>
          </div>

          {/* Date Range Info Box */}
          <div className="bg-gray-100 px-4 py-2 rounded text-sm text-gray-700">
            28 December 2024 (09:00) → 29 December 2024 (10:00)
          </div>
        </div>


        <div className="p-6 space-y-6 text-sm">
          <InteractiveCalendar />
        </div>

        {/* Info Note */}
        <div className="text-sm bg-gray-100 border border-[#FDE68A] rounded-md px-4 py-2 flex items-start space-x-2">
          <Info size={16} className="mt-0.5" />
          <span>
            You’re requesting <span className="font-medium">9 hours</span> off. You’ll have <span className="font-medium">31 hours</span> of sick leave remaining.
          </span>
        </div>

        {/* Upload */}
        <div>
          <label className="block text-gray-500 mb-1">Upload Attachment</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-400">
            <Upload size={36} className="mx-auto mb-2" />
            <div className="text-sm">Upload a file or drop here</div>
          </div>
        </div>
        {/* Save Button */}
        <div className="text-center">
          <button className="bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-600">
            Save
          </button>
        </div>
      </div>
    );
  };


  const tabs = ['Information', 'Files', 'Time Off', 'Performance'];
  const subTabs = ['Personal', 'Job', 'Compensation & Benefits', 'Legal Documents', 'Experience', 'Emergency'];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">Abernathy, Rex</h2>
              <p className="text-sm text-gray-600">Account Manager (Full-Time)</p>
              <p className="text-sm text-gray-600">
                US Entity | Boston, Massachusetts, United States | Boston HQ
              </p>
              <p className="text-sm text-gray-600">rex_abernathy@gmail.com</p>
              <p className="text-sm text-gray-600">+0 000 000 0000</p>
            </div>
          </div>
          <div className="relative">
            <button className="border px-4 py-[6px] rounded-lg">Actions</button>
            <p className="text-xs text-gray-500 mt-1 text-center">Updates (0)</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow-md rounded-xl">
          <div className="border-b px-6 pt-4 pb-2">
            <div className="flex space-x-6 text-sm font-medium">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`pb-2 ${mainTab === tab ? 'text-teal-700 border-b-2 border-teal-700' : 'text-gray-500'}`}
                  onClick={() => setMainTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            {mainTab === 'Information' && (
              <div className="flex space-x-6 text-sm font-medium mt-4">
                {subTabs.map((tab) => (
                  <button
                    key={tab}
                    className={`pb-2 ${subTab === tab ? 'text-teal-700 border-b-2 border-teal-700' : 'text-gray-500'}`}
                    onClick={() => setSubTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Subtab Content */}
          {renderSubTabContent() || renderTimeOffTab() || (
            <div className="p-6 text-gray-400 text-sm">No data available for "{subTab}" under "{mainTab}"</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileCard;
