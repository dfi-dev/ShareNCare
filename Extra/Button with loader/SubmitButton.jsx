import { useState } from "react";

export default function SubmitButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 3000);
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={isSubmitting}
      className="relative w-[180px] h-[42px] flex items-center justify-center bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 disabled:opacity-70 transition-all duration-300"
    >
      <div className="flex items-center justify-center space-x-1">
        {isSubmitting ? (
          <>
            <span className="dot animate-dotPulse [animation-delay:0s]"></span>
            <span className="dot animate-dotPulse [animation-delay:0.2s]"></span>
            <span className="dot animate-dotPulse [animation-delay:0.4s]"></span>
          </>
        ) : (
          <span>Submit</span>
        )}
      </div>
    </button>
  );
}
