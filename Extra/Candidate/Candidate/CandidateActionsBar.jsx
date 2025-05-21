import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  Mail,
  ClipboardList,
  MessageSquareText,
  Hand,
  ChevronDown,
} from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import DropdownButton from './DropdownButton';
import DisqualifyDropdown from './DisqualifyDropdown';

export default function CandidateActionsBar() {
  const candidateId = 1; // Change or pass as prop if dynamic
  // const [stages, setStages] = useState([]);
  const [stage, setStage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const buttonRef = useRef();

  // ✅ Fetch current candidate's stage
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/candidates/${candidateId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.stage) {
          setStage(data.stage);
        }
      })
      .catch((err) => console.error('Error fetching candidate:', err));
  }, [candidateId]);

  const stages = [
    'source',
    'applied',
    'assessment',
    'phone_screen',
    'interview',
    'hired'
  ];

  // ✅ Handle stage update
  const updateStage = (nextStage) => {
    setStage(nextStage); // Optimistically update UI

    fetch(`http://127.0.0.1:8000/api/candidates/${candidateId}/set-stage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`, // optional auth
      },
      body: JSON.stringify({ stage: nextStage }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Stage updated:', data);
      })
      .catch((err) => {
        console.error('Failed to update stage:', err);
        // Optionally revert UI state if needed
      });
  };

  return (
    <div className="flex justify-end items-center bg-white px-4 py-2 rounded-xl shadow-sm flex-wrap gap-4 relative">
      <div className="flex space-x-4 items-center">
        <button data-tooltip-id="tooltip" data-tooltip-content="Schedule interview" className="p-2 rounded-md hover:bg-gray-100">
          <Calendar size={20} />
        </button>
        <button data-tooltip-id="tooltip" data-tooltip-content="Send Email" className="p-2 rounded-md hover:bg-gray-100">
          <Mail size={20} />
        </button>
        <button data-tooltip-id="tooltip" data-tooltip-content="Add evaluation" className="p-2 rounded-md hover:bg-gray-100">
          <ClipboardList size={20} />
        </button>
        <button data-tooltip-id="tooltip" data-tooltip-content="Send text message" className="p-2 rounded-md hover:bg-gray-100">
          <MessageSquareText size={20} />
        </button>

        {/* Disqualify */}
        <DisqualifyDropdown onSelectReason={(reason) => console.log("Disqualified for:", reason)} />

        {/* ✅ Stage dropdown */}
        <div style={{ padding: 40 }}>
          <DropdownButton
            currentStage={stage}
            stages={stages}
            onSelect={updateStage}
          />
        </div>
      </div>

      <Tooltip id="tooltip" place="top" />
    </div>
  );
}
