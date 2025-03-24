import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaVenusMars, FaAt, FaCalendarAlt, FaLock, FaCheckCircle } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import validateField from "../utils/validateField.js";
import { validateForm } from "../utils/validateForm.js";
import InputField from "../components/UI/InputField.jsx";
import PasswordField from "../components/UI/PasswordField.jsx";
import SelectField from "../components/UI/SelectField.jsx";
import SocialButton from "../components/UI/SocialButton.jsx";
import AnimatedButton from "../components/UI/AnimatedButton.jsx";
import Modal from "../components/Modals/Modal.jsx";
import Loader from "../components/Loaders/Loader.jsx";



export default function Signup() {
    const formInitialState = useMemo(() => ({
        fullName: "", username: "", email: "", phone: "",
        password: "", confirmPassword: "", dob: "", gender: "", address: "", bloodGroup: ""
    }), []);

    const [formData, setFormData] = useState(formInitialState);
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [hoveredField, setHoveredField] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [modal, setModal] = useState({ show: false, type: "error", message: "" });
    const [showLoader, setShowLoader] = useState(false);


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
        setShowLoader(true);
        e.preventDefault();
        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setTimeout(() => {
        }, 1000);
    }, [formData]);


    useEffect(() => {
        if (showLoader) {
            const resetTimeout = setTimeout(() => {
                // setStep(1);
                // setFormData(formInitialState);
            }, 3000);
            return () => clearTimeout(resetTimeout);
        }
    }, [showLoader, formInitialState]);


    const handleNext = useCallback(() => setStep((prev) => prev + 1), []);
    const handlePrev = useCallback(() => setStep((prev) => prev - 1), []);


    return (
        <div className="flex h-screen items-center justify-center p-4">
            <div
                className="w-full max-w-[400px] bg-[#ffe2e2] px-8 py-14 rounded-xl shadow-[10px_10px_20px_rgba(0,0,0,0.3)] flex flex-col">
                {/* Step Indicator */}
                <StepTracker step={step}/>

                <div className="flex justify-between items-center mb-8">
                    <h2 className=" font-bold text-sm text-gray-700 text-center w-full flex items-center justify-center gap-2 uppercase">
                        {step === 1 ? "Create Your Account" : step === 2 ? "Personal Information" : "Contact Details"}
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
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    icon={<FaAt/>}
                                    value={formData.username}
                                    onChange={handleChange}
                                    error={errors.username}
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
                                    icon = {<FaCheckCircle />}
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
                                    icon={<FaUser/>}
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    error={errors.fullName}
                                    onHover={[hoveredField, setHoveredField]}
                                />

                                <InputField
                                    type="date"
                                    name="dob"
                                    placeholder="Date of Birth"
                                    icon={<FaCalendarAlt/>}
                                    value={formData.dob}
                                    onChange={handleChange}
                                    error={errors.dob}
                                    onHover={[hoveredField, setHoveredField]}
                                    extraProps={{
                                        style: {
                                            appearance: "none",
                                            WebkitAppearance: "none",
                                            MozAppearance: "none",
                                        },
                                    }}
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
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    icon={<FaEnvelope/>}
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    onHover={[hoveredField, setHoveredField]}
                                />

                                <InputField
                                    name="phone" type="phone"
                                    placeholder="Phone"
                                    icon={<FaPhone/>}
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

                <div className="mt-4 text-center text-gray-600 text-sm">
                    Already have an account? <a href="#"
                                                className="text-[#10c1bb]  font-sans font-medium tracking-wide">Login</a>
                </div>

                <div className="my-2 text-center text-gray-600 text-sm">Or sign up with</div>
                <SocialButton/>
            </div>
            {showLoader ? <Loader/> : modal.show && <Modal type={modal.type} message={modal.message} showLoader={modal.showLoader} onClose={() => setModal({ show: false })} />}
        </div>
    );
}