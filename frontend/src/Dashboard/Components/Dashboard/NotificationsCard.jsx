import React from "react";
import { Clock } from "lucide-react";

const NotificationItem = () => (
  <div className="flex justify-between items-start px-2 py-4">
    <div>
      <p className="text-sm font-semibold mb-1">
        Add an Evaluation
        <span className="ml-2 text-[10px] text-[#00C49A] bg-[#E6FAF5] px-2 py-[2px] rounded-full font-medium">
          SAMPLE
        </span>
      </p>
      <p className="text-sm text-gray-600">
        Add Johnathon Turner’s evaluation for the director of finance job.
      </p>
    </div>
    <div className="flex flex-col items-end gap-2">
      <button className="bg-[#E6FAF5] text-[#035946] px-4 py-1 rounded-full text-sm font-medium border border-[#C5EFE6]">
        Add
      </button>
      <div className="flex items-center gap-1 text-gray-500 text-xs">
        <Clock className="w-4 h-4" />
        7h
      </div>
    </div>
  </div>
);

const NotificationsCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 w-full max-w-sm mx-auto">
      <h2 className="text-lg font-semibold mb-2 px-2">Notification</h2>
    <hr className="-mx-6 border-t border-gray-200 my-2" />
      {[...Array(3)].map((_, i, arr) => (
        <div key={i}>
          <NotificationItem />
          {i < arr.length - 1 && <hr className="border-t border-gray-200 mx-2" />}
        </div>
      ))}
    </div>
  );
};

export default NotificationsCard;
