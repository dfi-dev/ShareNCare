import validateField from "./validateField.js";

export const validateForm = (formData) => {
    const errors = {};

    Object.keys(formData).forEach((key) => {
        const error = validateField(key, formData[key], formData);
        if (error) {
            errors[key] = error;
        }
    });

    return errors;
};
