import React, { useRef } from 'react';
import styled from 'styled-components';

const OTPModal = () => {
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  // Handle input focus navigation
  const handleInput = (index, e) => {
    const { value } = e.target;
    if (value && index < otpRefs.length - 1) {
      otpRefs[index + 1].current.focus();
    } else if (!value && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  return (
    <StyledWrapper>
      <form className="otp-Form">
        <span className="mainHeading">Enter OTP</span>
        <p className="otpSubheading">
          We've sent a verification code to your mobile number
        </p>

        <div className="inputContainer">
          {otpRefs.map((ref, index) => (
            <input
              key={index}
              ref={ref}
              required
              maxLength={1}
              type="text"
              className="otp-input"
              onInput={(e) => handleInput(index, e)}
            />
          ))}
        </div>

        <button className="verifyButton" type="submit">
          Verify
        </button>
        <button className="exitBtn" aria-label="Close">×</button>

        <p className="resendNote">
          Didn't receive the code?{' '}
          <button className="resendBtn">Resend Code</button>
        </p>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .otp-Form {
    width: 280px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 25px 30px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .mainHeading {
    font-size: 1.3em;
    font-weight: bold;
    color: #333;
  }

  .otpSubheading {
    font-size: 0.9em;
    color: #666;
    text-align: center;
    margin-bottom: 10px;
  }

  .inputContainer {
    display: flex;
    gap: 12px;
  }

  .otp-input {
    background-color: #f0f2f5;
    width: 40px;
    height: 40px;
    text-align: center;
    border: 2px solid #ccc;
    border-radius: 8px;
    font-size: 1.2em;
    outline: none;
    transition: border-color 0.2s ease;
  }

  .otp-input:focus {
    border-color: #7f81ff;
    background-color: #eaeaff;
  }

  .verifyButton {
    width: 100%;
    height: 40px;
    background-color: #7f81ff;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .verifyButton:hover {
    background-color: #6a6df0;
  }

  .exitBtn {
    position: absolute;
    top: 8px;
    right: 8px;
    background-color: transparent;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    color: #333;
  }

  .resendNote {
    font-size: 0.8em;
    text-align: center;
    color: #555;
  }

  .resendBtn {
    background-color: transparent;
    border: none;
    color: #7f81ff;
    cursor: pointer;
    font-weight: bold;
    font-size: 0.9em;
  }

  @media (max-width: 400px) {
    .otp-Form {
      width: 90%;
      padding: 20px;
    }

    .otp-input {
      width: 35px;
      height: 35px;
    }
  }
`;

export default OTPModal;
