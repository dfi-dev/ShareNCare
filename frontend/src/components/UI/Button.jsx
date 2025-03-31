import React from "react";

const Button = ({ children, variant = "default", onClick, className = "" }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition duration-300";
  
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-100",
    ghost: "text-gray-600 hover:bg-gray-100"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
