import React, { useState } from "react";
import styled from "styled-components";

const CustomCheckBox = ({ size = "30px" }) => {
    const [checked, setChecked] = useState(false);

    return (
        <StyledWrapper size={size} checked={checked} onClick={() => setChecked(!checked)}>
            <div className="uv-checkbox-wrapper">
                <div className="uv-checkbox-icon">
                    <svg viewBox="0 0 24 24" className="uv-checkmark">
                        <path d="M4.1,12.7 9,17.6 20.3,6.3" fill="none" />
                    </svg>
                </div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  display: inline-block;
  cursor: pointer;

  .uv-checkbox-wrapper {
    display: flex;
    align-items: center;
  }

  .uv-checkbox-icon {
    position: relative;
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    border: 2px solid ${(props) => (props.checked ? "#6c5ce7" : "#ccc")};
    border-radius: ${(props) =>
    props.checked ? "70% 30% 30% 70% / 70% 70% 30% 30%" : "30% 70% 70% 30% / 30% 30% 70% 70%"};
    background-color: ${(props) => (props.checked ? "#6c5ce7" : "transparent")};
    transition: border-color 0.3s ease, border-radius 0.3s ease, background-color 0.3s ease;
  }

  .uv-checkmark {
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    fill: none;
    stroke: white;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 24;
    stroke-dashoffset: ${(props) => (props.checked ? "0" : "24")};
    transition: stroke-dashoffset 0.5s cubic-bezier(0.45, 0.05, 0.55, 0.95);
  }

  .uv-checkbox-text {
    margin-left: 0.5em;
    font-size: ${(props) => `calc(${props.size} / 2)`};
    color: ${(props) => (props.checked ? "#6c5ce7" : "black")};
    transition: color 0.3s ease;
  }
`;

export default CustomCheckBox;
