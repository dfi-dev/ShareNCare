import { useState } from "react";

export default function SubmitButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // alert("Form submitted!");
    }, 3000);
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={isSubmitting}
      className="relative flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-70 transition-all duration-300"
    >
      {isSubmitting ? (
        <div className="flex space-x-1">
          <span className="dot animate-dotPulse [animation-delay:0s]"></span>
          <span className="dot animate-dotPulse [animation-delay:0.2s]"></span>
          <span className="dot animate-dotPulse [animation-delay:0.4s]"></span>
        </div>
      ) : (
        "Submit"
      )}
    </button>
  );
}
