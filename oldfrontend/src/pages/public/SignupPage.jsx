import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SignupForm from "../../components/Forms/SignupForm.jsx";
import SocialButton from "../../components/UI/SocialButton.jsx";
import Loader from "../../components/Loaders/Loader.jsx";
import Modal from "../../components/Modals/Modal.jsx";
import { unwrapResult } from "@reduxjs/toolkit";
import { validateForm } from "../../utils/validateForm.js";
import { registerUser } from "../../store/actions/authActions.js";

export default function SignupPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const formInitialState = useMemo(() => ({
        fullName: "",
        userType: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        dob: "",
        gender: "",
        address: "",
        bloodGroup: ""
    }), []);

    const [formData, setFormData] = useState(formInitialState);
    const [errors, setErrors] = useState({});
    const [modal, setModal] = useState({ show: false, type: "", message: "" });

    const handleSignupSubmit = async () => {
        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setModal({
                show: true,
                type: "error",
                message: "Please fix the highlighted fields before submitting."
            });
            return;
        }

        const payload = {
            fullName: formData.fullName,
            email: formData.email,
            role: formData.userType,
            phone: formData.phone,
            address: formData.address,
            dob: formData.dob,
            gender: formData.gender,
            password: formData.password
        };

        try {
            const resultAction = await dispatch(registerUser(payload));
            const data = unwrapResult(resultAction); // ✅ unwrap for success/error

            setModal({
                show: true,
                type: "success",
                message: data.message || "Account created successfully! Redirecting to login..."
            });

            setTimeout(() => {
                navigate("/login");
            }, 3000);

        } catch (err) {
            setModal({
                show: true,
                type: "error",
                message: err || "Registration failed. Please try again."
            });
        }
    };

    
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-indigo-200/50 dark:bg-indigo-900/20"
                        initial={{
                            scale: 0,
                            x: Math.random() * 1000 - 500,
                            y: Math.random() * 1000 - 500,
                        }}
                        animate={{
                            scale: 1,
                            x: [null, Math.random() * 200 - 100],
                            y: [null, Math.random() * 200 - 100],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear",
                        }}
                        style={{
                            width: `${100 + Math.random() * 200}px`,
                            height: `${100 + Math.random() * 200}px`,
                        }}
                    />
                ))}
            </motion.div>

            {loading && <Loader />}

            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, type: "spring", damping: 10 }}
                    className="w-full max-w-md relative z-10"
                >
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/50">
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                    className="inline-block mb-4"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shadow-lg mx-auto">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                </motion.div>

                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl font-bold text-gray-800 dark:text-white mb-2"
                                >
                                    Join Us Today
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-gray-600 dark:text-gray-300"
                                >
                                    Create your account to get started
                                </motion.p>
                            </div>

                            <SignupForm
                                formData={formData}
                                setFormData={setFormData}
                                errors={errors}
                                setErrors={setErrors}
                                onSubmit={handleSignupSubmit}
                            />

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex items-center my-6"
                            >
                                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                                <span className="mx-4 text-gray-500 dark:text-gray-400 text-sm">or sign up with</span>
                                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                <SocialButton />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400"
                            >
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                                >
                                    Login
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {modal.show && (
                <Modal
                    message={modal.message}
                    type={modal.type}
                    onClose={() => setModal({ show: false, type: "", message: "" })}
                    autoClose={modal.type === "success" ? 3000 : 4000}
                />
            )}
        </div>
    );
}