export const validateBloodDonationForm = (formData) => {
    let newErrors = {};

    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!formData.lastDonationDate) newErrors.lastDonationDate = "Last donation date is required";
    if (!formData.weight || formData.weight < 50) newErrors.weight = "Minimum weight is 50kg";
    if (!formData.consent) newErrors.consent = "You must agree to the terms";

    return newErrors;
};
