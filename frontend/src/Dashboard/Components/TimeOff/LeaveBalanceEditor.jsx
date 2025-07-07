import React, { useState } from "react";
import { FiPlus, FiMinus, FiX } from "react-icons/fi";

export default function LeaveBalanceEditor({
  label = "Leave Balance",
  initialValue = 0,
  onSave = () => { },
  onClose = () => { },
}) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue) => {
    const parsed = parseInt(newValue, 10);
    const cleanValue = !isNaN(parsed) && parsed >= 0 ? parsed : 0;
    setValue(cleanValue);
  };

  const increment = () => handleChange(value + 1);
  const decrement = () => handleChange(Math.max(0, value - 1));

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  return (
    <div className="w-60 bg-white shadow-xl rounded-lg border border-gray-200 z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="text-base font-semibold text-gray-800">{label}</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <FiX size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-4 space-y-4">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={decrement}
            className="p-2 bg-gray-100 rounded hover:bg-gray-200 text-black"
          >
            <FiMinus />
          </button>

          <input
            type="number"
            inputMode="numeric"
            min="0"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            className="w-24 text-center text-black border border-gray-300 rounded px-2 py-1 text-sm"
          />

          <button
            type="button"
            onClick={increment}
            className="p-2 bg-gray-100 rounded hover:bg-gray-200 text-black"
          >
            <FiPlus />
          </button>
        </div>

        {/* Update Button */}
        <div className="text-center">
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-teal-600 text-white text-sm font-semibold rounded hover:bg-teal-700 transition"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
