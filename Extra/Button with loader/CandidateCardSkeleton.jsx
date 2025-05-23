import React from 'react';

export default function CandidateCardSkeleton() {
  return (
    <div className="bg-white px-8 py-12 rounded-xl shadow-sm flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 animate-pulse">
      
      {/* Profile image */}
      <div className="w-20 h-20 bg-gray-200 rounded-full shrink-0"></div>


      {/* Text details */}
      <div className="flex-grow w-full space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="flex gap-4">
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-1/6"></div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-auto flex flex-col items-center md:items-end space-y-2">
        <div className="h-8 bg-gray-200 rounded w-20"></div>
        <div className="h-3 bg-gray-200 rounded w-24"></div>
        <div className="h-3 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
}
