import React from "react";
import Select from "react-select";

const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" }
];

const customStyles = {
    control: (provided) => ({
        ...provided,
        padding: "5px", // Adds padding inside the select box
        fontSize: "16px",
        borderRadius: "5px"
    }),
    option: (provided, state) => ({
        ...provided,
        padding: "15px", // Adds padding inside each option
        backgroundColor: state.isFocused ? "#ddd" : "white",
        color: "black",
        cursor: "pointer"
    })
};

const CustomDropdown = () => {
    return (
        <Select
            options={genderOptions}
            placeholder="Select Gender"
            styles={customStyles}
        />
    );
};

export default CustomDropdown;
