import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

const CardTitle = ({ children }) => {
  return <h2 className="text-lg font-bold">{children}</h2>;
};

const CardContent = ({ children, className = "" }) => {
  return <div className={`flex justify-between items-center ${className}`}>{children}</div>;
};

export { Card, CardHeader, CardTitle, CardContent };
