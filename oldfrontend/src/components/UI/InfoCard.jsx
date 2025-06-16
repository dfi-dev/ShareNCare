import React from 'react';

const InfoCard = ({ label, value, icon }) => {
  return (
    <div className="flex items-start gap-3 bg-indigo-50/50 p-4 rounded-lg border border-indigo-100 shadow-sm">
      {icon && (
        <div className="text-indigo-500 mt-0.5">
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-base font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default InfoCard;
