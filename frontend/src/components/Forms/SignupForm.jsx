import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {FaUser, FaEnvelope, FaMapMarkerAlt, FaVenusMars, FaCalendarAlt, FaLock, FaIdBadge} from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import validateField from "../../utils/validateField.js";
import InputField from "../UI/InputField.jsx";
import PasswordField from "../UI/PasswordField.jsx";
import SelectField from "../UI/SelectField.jsx";
import AnimatedButton from "../UI/AnimatedButton.jsx";
import {ImPhone} from "react-icons/im";
import CustomDatePicker from "../UI/CustomDatePicker.jsx";


const SignupForm = ({ formData, setFormData, errors, setErrors, onSubmit }) => {

    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [hoveredField, setHoveredField] = useState(null);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            if (prev[name] === value) return prev; // Avoid unnecessary state updates
            const updatedForm = { ...prev, [name]: value };

            // If password changes, revalidate confirmPassword
            if (name === "password" && updatedForm.confirmPassword) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmPassword: updatedForm.confirmPassword !== value ? "Passwords do not match" : "",
                }));
            }

            return updatedForm;
        });

        setErrors((prevErrors) => {
            if (!value.length) {
                const { [name]: _, ...rest } = prevErrors; // Remove error when input is empty
                return rest;
            }

            return {
                ...prevErrors,
                ...(name === "confirmPassword"
                    ? { confirmPassword: value !== e.target.form.password.value ? "Passwords do not match" : "" }
                    : { [name]: validateField(name, value, formData) }),
            };
        });
    }, []);


    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onSubmit();
    }, [onSubmit]);


    const handleNext = useCallback(() => setStep((prev) => prev + 1), []);
    const handlePrev = useCallback(() => setStep((prev) => prev - 1), []);

    return (
        <>

        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl text-gray-700 text-center w-full flex items-center justify-center gap-2">
                {step === 1 ? "Let's Get Started!" : step === 2 ? "You're Almost There!" : "Final Step!"}
            </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
            <motion.div
                key={step}
                initial={{ opacity: 0, x: step === 1 ? -50 : 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: step === 1 ? -50 : 50, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="space-y-3 min-h-[200px]"
            >
                {step === 1 && (
                    <>
                        <InputField
                            name="email"
                            type="email"
                            placeholder="Email"
                            icon={<FaEnvelope/>}
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            onHover={[hoveredField, setHoveredField]}
                        />

                        <PasswordField
                            name="password"
                            placeholder={"Password"}
                            icon= {<FaLock/>}
                            value={formData.password}
                            onChange={handleChange}
                            showPassword={showPassword}  // Pass current state
                            togglePassword={() => setShowPassword((prev) => !prev)} // Toggle function
                            error={errors.password}
                            onHover={[hoveredField, setHoveredField]}
                        />

                        <PasswordField
                            name="confirmPassword"
                            placeholder={"Confirm Password"}
                            icon = {<FaLock />}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            showPassword={showPassword}  // Pass current state
                            togglePassword={() => setShowPassword((prev) => !prev)} // Toggle function
                            error={errors.confirmPassword}
                            onHover={[hoveredField, setHoveredField]}
                        />


                        <div className="relative">
                            <AnimatedButton
                                onClick={handleNext}
                                Icon={MdOutlineKeyboardDoubleArrowRight}
                                iconAnimation={{ x: [0, 4, 0] }}
                                iconPosition="after"
                            >
                                Next
                            </AnimatedButton>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <InputField
                            name="fullName"
                            type="text"
                            placeholder="Full Name"
                            icon={<FaIdBadge/>}
                            value={formData.fullName}
                            onChange={handleChange}
                            error={errors.fullName}
                            onHover={[hoveredField, setHoveredField]}
                        />

                        <CustomDatePicker
                            name="dob"
                            placeholder="Date of Birth"
                            value={formData.dob}
                            onHover={[hoveredField, setHoveredField]}
                            error={errors.dob}
                            shouldValidate={true}
                            onChange={handleChange}
                        />

                        <SelectField
                            name="gender"
                            icon={<FaVenusMars/>}
                            value={formData.gender}
                            onChange={handleChange}
                            onHover={[hoveredField, setHoveredField]}
                            error={errors.gender}
                            options={[
                                {value: "", label: "Select Gender"},
                                {value: "male", label: "Male"},
                                {value: "female", label: "Female"},
                                {value: "other", label: "Other"},
                            ]}
                            required
                        />

                        <div className="relative flex w-full gap-4">
                            <AnimatedButton
                                onClick={handlePrev}
                                Icon={MdOutlineKeyboardDoubleArrowLeft}
                                iconAnimation={{ x: [0, 4, 0] }}
                            >
                                Prev
                            </AnimatedButton>

                            <AnimatedButton
                                onClick={handleNext}
                                Icon={MdOutlineKeyboardDoubleArrowRight}
                                iconAnimation={{ x: [0, 4, 0] }}
                                iconPosition="after"
                            >
                                Next
                            </AnimatedButton>
                        </div>

                    </>
                )}

                {step === 3 && (
                    <>

                        <InputField
                            name="phone" type="phone"
                            placeholder="Phone"
                            icon={<ImPhone/>}
                            value={formData.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            onHover={[hoveredField, setHoveredField]}
                        />
                        <InputField
                            name="address"
                            type="text"
                            placeholder="Address"
                            icon={<FaMapMarkerAlt/>}
                            value={formData.address}
                            onChange={handleChange}
                            error={errors.address}
                            onHover={[hoveredField, setHoveredField]}
                        />

                        <SelectField
                            name="userType"
                            icon={<FaUser/>}
                            value={formData.userType}
                            onChange={handleChange}
                            onHover={[hoveredField, setHoveredField]}
                            error={errors.userType}
                            options={[
                                { value: "", label: "User Type" },
                                { value: "admin", label: "Admin" },
                                { value: "donor", label: "Donor" },
                                { value: "recipient", label: "Recipient" }
                            ]}
                            required
                        />

                        <div className="relative flex w-full gap-4">
                            <AnimatedButton
                                onClick={handlePrev}
                                Icon={MdOutlineKeyboardDoubleArrowLeft}
                                iconAnimation={{ x: [0, 4, 0] }}
                            >
                                Prev
                            </AnimatedButton>

                            <AnimatedButton
                                onClick={handleSubmit}
                                iconAnimation={{ x: [0, 4, 0] }}
                            >
                                Submit
                            </AnimatedButton>
                        </div>
                    </>
                )}
            </motion.div>
        </form>
        </>
    );
};

export default SignupForm;
