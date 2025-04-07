import React from 'react';
import styled from 'styled-components';

const NotificationIcon = ({ notificationCount }) => {
  return (
    <StyledWrapper>
      <div className="loader">
        {/* Show the green ripple effect icon only when notificationCount > 0 */}
        {notificationCount > 0 ? (
          <>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              height={18}  // Set size to 18px
              width={18}   // Set size to 18px
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-5 h-5 text-gray-800 dark:text-white"  // Adjusted to size 18px
            >
              <path
                d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="currentColor"
              />
            </svg>
            <div className="point" />
          </>
        ) : (
          // Show a regular icon when notificationCount <= 0
          <svg
            viewBox="0 0 24 24"
            fill="none"
            height={18}  // Set size to 18px
            width={18}   // Set size to 18px
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-5 h-5 text-gray-800 dark:text-white"
          >
            <path
              d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="currentColor"
            />
          </svg>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    width: fit-content;
    height: fit-content;
    background-color: transparent;
    border: 1px solid rgba(128, 128, 128, 0.4); /* Light gray border */
    border-radius: 8px;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    transition: border-color 0.25s ease-in-out;
  }

  .loader:hover {
    background-color: transparent; /* Always transparent */
    border-color: rgba(128, 128, 128, 0.7); /* Slightly darker gray */
  }

  .loader:hover svg {
    color: black; /* Stay black on hover */
  }

  .loader svg {
    color: rgba(5, 5, 5, 0.65); /* Slightly faded black initially */
    transition: color 0.25s ease-in-out;
  }

  .point {
    position: absolute;
    bottom: 4px;
    left: 4px;
    width: 6px;
    height: 6px;
    background-color: rgb(180, 218, 14);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .point::before {
    content: "";
    position: absolute;
    width: 1px;
    height: 1px;
    background-color: rgb(180, 218, 14);
    border-radius: 50%;
    animation: loop 1s 0s infinite;
  }

  @keyframes loop {
    0% {
      background-color: rgb(180, 218, 14);
      width: 6px;
      height: 6px;
    }
    100% {
      background-color: rgba(0, 255, 0, 0);
      width: 24px;
      height: 24px;
    }
  }
`;



export default NotificationIcon;
