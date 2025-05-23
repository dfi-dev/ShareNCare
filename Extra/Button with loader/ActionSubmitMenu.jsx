import { useState, useRef, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ActionSubmitMenu() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const containerRef = useRef(null);

  const handleSubmit = (stage) => {
    setIsSubmitting(true);
    console.log("Submitting with stage:", stage);
    setShowOptions(false); // ensure dropdown closes on any submit
    setTimeout(() => {
      setIsSubmitting(false);
    }, 3000);
  };

  // Click outside closes dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Decide whether to drop up or down
  useEffect(() => {
    if (showOptions && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 150;
      setDropUp(spaceBelow < dropdownHeight);
    }
  }, [showOptions]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <div className="flex w-[200px] h-[42px] rounded-lg shadow-md overflow-hidden">
        {/* Main Button */}
        <button
          onClick={() => handleSubmit("source")}
          disabled={isSubmitting}
          className="flex-1 bg-teal-600 text-white font-semibold flex items-center justify-center transition-all duration-300 disabled:opacity-80 hover:bg-teal-700"
        >
          {isSubmitting ? (
            <div className="flex space-x-1">
              <span className="dot animate-dotPulse [animation-delay:0s]"></span>
              <span className="dot animate-dotPulse [animation-delay:0.2s]"></span>
              <span className="dot animate-dotPulse [animation-delay:0.4s]"></span>
            </div>
          ) : (
            "Add to Sourced"
          )}
        </button>

        {/* Chevron Section */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (!isSubmitting) setShowOptions(!showOptions);
          }}
          className={`w-10 bg-teal-600 flex items-center justify-center cursor-pointer transition-all ${
            !isSubmitting ? "hover:bg-teal-800" : "opacity-80 cursor-not-allowed"
          }`}
        >
          <ChevronUp
            size={18}
            className={`text-white transition-transform ${showOptions ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>

      {/* Dropdown Options */}
      {showOptions && (
        <div
          className={`absolute ${dropUp ? "bottom-full mb-2" : "top-full mt-2"} left-0 w-[200px] bg-white border border-gray-200 rounded-md shadow-lg z-10`}
        >
          <ul className="py-2 text-sm text-gray-700">
            {["Option 1", "Option 2", "Option 3"].map((label, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleSubmit(index + 1);
                }}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
