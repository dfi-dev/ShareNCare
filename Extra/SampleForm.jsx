import React, { useState } from "react";
import SubmitButton from "./SubmitButton";

function SampleForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple clicks
    if (isLoading) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Form submitted!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-sm mx-auto bg-white shadow rounded">
      <input
        type="text"
        placeholder="Enter something..."
        className="w-full px-3 py-2 border border-gray-300 rounded"
        required
      />
      <SubmitButton isLoading={isLoading} />
    </form>
  );
}

export default SampleForm;
