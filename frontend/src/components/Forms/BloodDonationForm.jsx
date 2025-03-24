import { useState } from "react";
import { motion } from "framer-motion";
import InputField from "../UI/InputField";
import SelectField from "../UI/SelectField";
import AnimatedButton from "../UI/AnimatedButton";
import Modal from "../Modals/Modal";
import { FaTint, FaWeight, FaCalendarAlt, FaNotesMedical } from "react-icons/fa";
import CustomDatePicker from "../UI/CustomDatePicker.jsx";
import CustomCheckBox from "../UI/CustomCheckBox.jsx";

export default function BloodDonationForm() {
    const [formData, setFormData] = useState({
        bloodGroup: "",
        lastDonationDate: "",
        weight: "",
        medicalConditions: "",
        recentSurgeries: "",
        consent: false,
    });

    const [errors, setErrors] = useState({});
    const [modal, setModal] = useState({ show: false, type: "error", message: "" });
    const [hoveredField, setHoveredField] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
        if (!formData.lastDonationDate) newErrors.lastDonationDate = "Last donation date is required";
        if (!formData.weight || formData.weight < 50) newErrors.weight = "Minimum weight is 50kg";
        if (!formData.consent) newErrors.consent = "You must agree to the terms";

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0){
            setModal({ show: true, type: "error", message: "Please fill required fields!" });
            return;
        }

        setModal({ show: true, type: "success", message: "Thank you for your donation!" });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg bg-white py-16 px-10 rounded-xl shadow-lg"
            >
                <h2 className="text-xl font-bold text-center text-gray-700 mb-6">Blood Donation Form</h2>

                <form className="space-y-4">
                    {/* Blood Group */}
                    <SelectField
                        name="bloodGroup"
                        icon={<FaTint />}
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        onHover={[hoveredField, setHoveredField]}
                        error={errors.bloodGroup}
                        options={[
                            { value: "", label: "Select Blood Group" },
                            { value: "A+", label: "A+" },
                            { value: "A-", label: "A-" },
                            { value: "B+", label: "B+" },
                            { value: "B-", label: "B-" },
                            { value: "O+", label: "O+" },
                            { value: "O-", label: "O-" },
                            { value: "AB+", label: "AB+" },
                            { value: "AB-", label: "AB-" },
                        ]}
                    />
                    {/* Date of Last Donation */}
                    <CustomDatePicker
                        name="lastDonationDate"
                        placeholder="Last Donation Date"
                        value={formData.lastDonationDate}
                        onHover={[hoveredField, setHoveredField]}
                        error={errors.dob}
                        shouldValidate={true}
                        onChange={handleChange}
                    />

                    {/* Weight */}
                    <InputField
                        type="text"
                        name="weight"
                        placeholder="Weight (kg)"
                        icon={<FaWeight />}
                        value={formData.weight}
                        onChange={handleChange}
                        error={errors.weight}
                    />

                    {/* Medical Conditions */}
                    <InputField
                        type="text"
                        name="medicalConditions"
                        placeholder="Medical Conditions (if any)"
                        icon={<FaNotesMedical />}
                        value={formData.medicalConditions}
                        onChange={handleChange}
                    />

                    {/* Recent Surgeries */}
                    <SelectField
                        name="recentSurgeries"
                        icon={<FaNotesMedical />}
                        value={formData.recentSurgeries}
                        onChange={handleChange}
                        onHover={[hoveredField, setHoveredField]}
                        options={[
                            { value: "", label: "Recent Surgery/Medication?" },
                            { value: "yes", label: "Yes" },
                            { value: "no", label: "No" },
                        ]}
                    />

                    {/* Consent Checkbox */}
                    <div className="flex items-center gap-2">
                        <CustomCheckBox size="20px"/>
                        <label htmlFor="consent" className="text-sm text-gray-700 ml-1">
                            I confirm that I meet the eligibility criteria for blood donation.
                        </label>
                    </div>
                    {errors.consent && <p className="text-red-500 text-sm">{errors.consent}</p>}

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <AnimatedButton type="button" onClick={handleSubmit}>Submit</AnimatedButton>
                    </div>
                </form>
            </motion.div>

            {/* Success Modal */}
            {modal.show && (
                <Modal
                    type={modal.type}
                    message={modal.message}
                    onClose={() => setModal({ show: false })}
                />
            )}
        </div>
    );
}
