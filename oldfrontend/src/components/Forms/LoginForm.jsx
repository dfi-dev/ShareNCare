import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaAt, FaLock } from "react-icons/fa";
import InputField from "../UI/InputField.jsx";
import PasswordField from "../UI/PasswordField.jsx";
import { FaUnlockKeyhole } from "react-icons/fa6";


const LoginForm = ({ setFormData, onSubmit, isPasswordCorrect, formData }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [hoveredField, setHoveredField] = useState(null);


    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);


    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onSubmit();
    }, [formData, onSubmit]);


    const lockIcon = useMemo(() => (
        isPasswordCorrect ? <FaUnlockKeyhole className="text-lg" /> : <FaLock className="text-lg" />
    ), [isPasswordCorrect]);


    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <InputField
                name="email"
                value={formData.email}
                type="text"
                placeholder="Email"
                icon={<FaAt />}
                onChange={handleChange}
                shouldValidate={false}
                onHover={[]}

            />
            <PasswordField
                name="password"
                placeholder="Password"
                value={formData.password}
                icon={<FaLock />}
                onChange={handleChange}
                showPassword={showPassword}
                togglePassword={() => setShowPassword((prev) => !prev)}
                shouldValidate={false}
                onHover={[hoveredField, setHoveredField]}
            />

            <motion.button
                type="submit"
                className="flex items-center justify-center w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-[9px] rounded-lg text-sm font-medium gap-2 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
                whileHover={{
                    scale: 1.04,
                    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.25)"
                }}
                whileTap={{
                    scale: 0.98,
                    boxShadow: "0 2px 6px rgba(99, 102, 241, 0.2)"
                }}
            >
                <motion.span
                    animate={
                        isPasswordCorrect
                            ? {
                                y: [0, -5, 0],
                                rotate: [0, 15, -15, 0],
                                scale: [1, 1.1, 1]
                            }
                            : { rotate: 0 }
                    }
                    transition={{
                        duration: 0.5,
                        repeat: 0,
                        ease: "easeInOut"
                    }}
                >
                    {lockIcon}
                </motion.span>
                <motion.span
                    animate={isPasswordCorrect ? { x: [0, 2, 0] } : {}}
                    transition={{ duration: 0.3 }}
                >
                    Sign In
                </motion.span>
            </motion.button>
        </form>
    );
}
export default LoginForm