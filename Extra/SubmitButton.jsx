import React from "react";

function SubmitButton({ isLoading = false }) {
  return (
    <button
      type="submit"
      className={`relative flex items-center justify-center px-6 py-2 rounded-md font-semibold transition-colors duration-300
        ${
          isLoading
            ? "bg-indigo-600 text-white cursor-default"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
    >
      {isLoading ? (
        <ForwardBackwardDots />
      ) : (
        "Submit"
      )}
    </button>
  );
}

function ForwardBackwardDots() {
  return (
    <div className="flex space-x-1 py-2 px-2">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <style jsx>{`
        .dot {
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
          animation: forwardBackward 1.5s ease-in-out infinite;
          margin-left: 4px;
        }
        .dot:nth-child(1) {
          animation-delay: 0s;
        }
        .dot:nth-child(2) {
          animation-delay: 0.3s;
        }
        .dot:nth-child(3) {
          animation-delay: 0.6s;
        }
        @keyframes forwardBackward {
          0%, 100% {
            transform: translateX(0);
            opacity: 0.4;
          }
          50% {
            transform: translateX(12px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default SubmitButton;
