import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Loader2 } from "lucide-react";

export default function DropdownButton({ currentStage = "", stages = [], onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);

  const wrapperRef = useRef(null);
  const iconRef = useRef(null);
  const buttonRef = useRef(null);

  const stageLabels = {
    source: 'Source',
    applied: 'Applied',
    assessment: 'Assessment',
    phone_screen: 'Phone Screen',
    interview: 'Interview',
    hired: 'Hired',
  };

  // Sync selected stage from props
  useEffect(() => {
    if (stages.includes(currentStage)) {
      setSelectedStage(currentStage);
    }
  }, [currentStage, stages]);

  const currentIndex = stages.findIndex((s) => s === selectedStage);
  const nextStage = currentIndex !== -1 ? stages[currentIndex + 1] : null;

  const isLoading = selectedStage === null || !stages.includes(selectedStage);

  const label = isLoading
    ? "Loading..."
    : nextStage
      ? `Move to ${stageLabels[nextStage]}`
      : `${stageLabels[selectedStage]}`;


  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleMoveToNextStage = () => {
    if (!isLoading && nextStage) {
      setSelectedStage(nextStage);
      onSelect(nextStage);
      setIsOpen(false);
    }
  };

  const handleSelect = (stage) => {
    if (stage !== selectedStage) {
      setSelectedStage(stage);
      onSelect(stage);
      setIsOpen(false);
    }
  };



  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dropdown direction
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownHeight = Math.min(stages.length * 40, 224);
      setDropUp(spaceBelow < dropdownHeight && spaceAbove > spaceBelow);
    }
  }, [isOpen, stages.length]);

  return (
    <div
      ref={wrapperRef}
      className="relative inline-flex items-center bg-teal-700 text-white rounded-3xl overflow-visible"
    >
      <button
        ref={buttonRef}
        onClick={handleMoveToNextStage}
        disabled={isLoading || !nextStage}
        className="flex-1 text-sm px-4 py-2 text-left cursor-pointer rounded-l-3xl hover:bg-teal-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isLoading && <Loader2 size={16} className="animate-spin" />}
        {label}
      </button>

      <button
        onClick={toggleDropdown}
        ref={iconRef}
        className="px-3 py-[10px] rounded-r-3xl hover:bg-teal-800 focus:outline-none transition"
      >
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute z-[9999] w-60 bg-white text-black border border-gray-200 rounded-xl shadow-lg right-0 py-2
          ${dropUp ? "bottom-full mb-2" : "top-full mt-2"} animate-fade-in`}
        >
          {stages.map((stage, i) => {
            const isCurrent = stage === selectedStage;
            return (
              <button
                key={i}
                onClick={() => handleSelect(stage)}
                disabled={isCurrent}
                className={`w-full text-left px-4 py-2 text-sm transition ${isCurrent
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
                  }`}
              >
                {isCurrent
                  ? `${stageLabels[stage]} (current stage)`
                  : stageLabels[stage]}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
