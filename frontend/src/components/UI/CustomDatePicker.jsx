import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { PiSealCheckFill, PiSealWarningFill } from "react-icons/pi";

export default function CustomDatePicker({
                                             name,
                                             value,
                                             placeholder = "Date",
                                             onChange,
                                             error,
                                             shouldValidate = true,
                                             onHover = []
                                         }) {
    const [displayValue, setDisplayValue] = useState(value ? formatDate(value, placeholder) : placeholder);
    const [hoveredField, setHoveredField] = Array.isArray(onHover) ? onHover : [null, () => {}];

    const handleDateChange = (e) => {
        const dateValue = e.target.value;
        setDisplayValue(formatDate(dateValue, placeholder));

        // Create a synthetic event to match handleChange's expected structure
        const syntheticEvent = {
            target: {
                name: name,
                value: dateValue
            }
        };
        onChange(syntheticEvent);
    };

    return (
        <div className="relative w-full">
            {/* Error Tooltip (only when hovered) */}
            {shouldValidate && error && hoveredField === name && (
                <span className="absolute top-[-10px] left-[9px] bg-red-500 text-white text-[10px] py-[2px] px-2 rounded shadow-md">
                    {error.replace("Date", placeholder)} {/* ✅ Replace generic error text */}
                </span>
            )}

            <input
                type="text"
                className="w-full py-2 border rounded-md cursor-pointer text-sm px-4 pr-10"
                value={displayValue}
                readOnly
                onClick={() => document.getElementById(`hiddenDateInput-${name}`).showPicker()}
            />
            <input
                type="date"
                id={`hiddenDateInput-${name}`}
                className="absolute inset-0 opacity-0 cursor-pointer"
                value={value}
                onChange={handleDateChange}
            />

            {/* Calendar Icon */}
            <FaCalendarAlt className="absolute right-5 top-3 text-gray-500 pointer-events-none" />

            {/* Success & Error Icons */}
            {shouldValidate && error ? (
                <div
                    className="absolute right-[6px] top-[6px]"
                    onMouseEnter={() => setHoveredField(name)}
                    onMouseLeave={() => setHoveredField(null)}
                >
                    <PiSealWarningFill className="w-[14px] h-[14px] text-red-500" />
                </div>
            ) : shouldValidate && value && !error ? (
                <PiSealCheckFill className="absolute right-[6px] top-[6px] w-[14px] h-[14px] text-green-500" />
            ) : null}
        </div>
    );
}

// **Format date to DD-MM-YYYY**
const formatDate = (dateString, placeholder) => {
    if (!dateString || typeof dateString !== "string") return placeholder;

    const parts = dateString.split("-");
    if (parts.length !== 3) return placeholder; // Prevent errors

    const [year, month, day] = parts;
    return `${day}-${month}-${year}`;
};
