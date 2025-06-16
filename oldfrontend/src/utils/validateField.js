const validateField = (fieldName, fieldValue, formData) => {

    switch (fieldName) {
        case "fullName":
            return fieldValue.trim() ? "" : "Full Name is required";
        case "email":
            if (!fieldValue.trim()) return "Email is required";
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(fieldValue) ? "" : "Invalid email format";
        case "phone":
            if (!fieldValue.trim()) return "Phone number is required";
            return /^\d{10}$/.test(fieldValue) ? "" : "Phone number must be 10 digits";
        case "password":
            if (!fieldValue) return "Password is required";
            if (fieldValue.length < 8) return "Password must be at least 8 characters";
            return /[A-Za-z]/.test(fieldValue) && /\d/.test(fieldValue) ? "" : "Password must contain letters and numbers";
        case "confirmPassword":
            if (!fieldValue) return "Confirm Password is required";
            if (fieldValue !== formData.password) return "Passwords do not match";
            return "";
        case "address":
        return fieldValue.length >= 5 ? "" : "Address must be at least 5 characters";
        case "username":
            return fieldValue.length > 0 ? "" : "Username is required";
        case "dob":
            return fieldValue ? "" : "Date is required";
        case "gender":
            return fieldValue ? "" : "Gender is required";
        case "userType":
            return ["admin", "donor", "recipient"].includes(fieldValue) ? "" : "Invalid user type";
        default:
            return "";
    }
};

export default validateField;
