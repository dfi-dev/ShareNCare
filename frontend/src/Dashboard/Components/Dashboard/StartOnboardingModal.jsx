import React, { useState } from "react";
import { X } from "lucide-react";
import ActionButton from "../ActionButton";
import ModalWrapper from "../ModalWrapper";

const StartOnboardingModal = ({ candidateName, onCancel, onStart }) => {
  const [profileTemplate, setProfileTemplate] = useState("Default");
  const [onboardingWorkflow, setOnboardingWorkflow] = useState("Default");
  const [startDate, setStartDate] = useState("immediately");
  const [publishProfile, setPublishProfile] = useState(true);
  const [inviteUser] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingAction, setSubmittingAction] = useState("");

  const handleSubmit = () => {
    setIsSubmitting(true);
    setSubmittingAction("start");
    setTimeout(() => {
      onStart({ profileTemplate, onboardingWorkflow, startDate, publishProfile, inviteUser });
      setIsSubmitting(false);
      setSubmittingAction("");
    }, 2000);
  };

  return (
    <ModalWrapper>
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-8 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Start Onboarding for {candidateName}
          </h2>
          <button onClick={onCancel}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Profile Template */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Template <span className="text-red-500">*</span>
          </label>
          <select
            value={profileTemplate}
            onChange={(e) => setProfileTemplate(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#007a6e]"
          >
            <option>Default</option>
          </select>
        </div>

        {/* Onboarding Workflow */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Onboarding Workflow <span className="text-red-500">*</span>
          </label>
          <select
            value={onboardingWorkflow}
            onChange={(e) => setOnboardingWorkflow(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#007a6e]"
          >
            <option>Default</option>
          </select>
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Onboarding Start Date</p>
          <div className="flex items-center gap-4">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="radio"
                name="startDate"
                value="immediately"
                checked={startDate === "immediately"}
                onChange={() => setStartDate("immediately")}
                className="text-[#007a6e] focus:ring-[#007a6e]"
              />
              <span className="ml-2">Immediately</span>
            </label>
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="radio"
                name="startDate"
                value="custom"
                checked={startDate === "custom"}
                onChange={() => setStartDate("custom")}
                className="text-[#007a6e] focus:ring-[#007a6e]"
              />
              <span className="ml-2">Custom</span>
            </label>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Publish profile and invite user</p>
          <label className="flex items-center mb-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={publishProfile}
              onChange={() => setPublishProfile(!publishProfile)}
              className="text-[#007a6e] focus:ring-[#007a6e]"
            />
            <span className="ml-2">Automatically publish profile on start date</span>
          </label>
          <label className="flex items-center text-sm text-gray-400 cursor-not-allowed">
            <input type="checkbox" checked={inviteUser} disabled className="text-[#007a6e]" />
            <span className="ml-2">Automatically Invite for basic access upon publishing</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <ActionButton
            label="Start Onboarding"
            onClick={handleSubmit}
            isLoading={isSubmitting && submittingAction === "start"}
            disabled={isSubmitting}
            className="h-[38px] px-[20px] w-[180px] disabled:opacity-50"
            labelClassName="text-sm"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default StartOnboardingModal;
