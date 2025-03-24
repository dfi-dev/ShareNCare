import {useCallback, useMemo, useState} from "react";
import { motion } from "framer-motion";
import {FaAt, FaLock } from "react-icons/fa";
import InputField from "../UI/InputField.jsx";
import PasswordField from "../UI/PasswordField.jsx";
import {FaUnlockKeyhole} from "react-icons/fa6";


const LoginForm = ({setFormData, onSubmit, isPasswordCorrect, formData}) => {

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
                name="username"
                value={formData.username}
                type="text"
                placeholder="Username"
                icon={<FaAt/>}
                onChange={handleChange}
                shouldValidate={false}
                onHover={[]}

            />
            <PasswordField
                name="password"
                placeholder="Password"
                value={formData.password}
                icon= {<FaLock/>}
                onChange={handleChange}
                showPassword={showPassword}
                togglePassword={() => setShowPassword((prev) => !prev)}
                shouldValidate={false}
                onHover={[hoveredField, setHoveredField]}
            />

            <motion.button
                type="submit"
                className="flex items-center justify-center w-full bg-[#10c1bb] text-white p-[9px] rounded-lg text-sm font-[500] gap-2"
                whileHover={{ scale: 1.04 }}>
                <motion.span
                    animate={
                        isPasswordCorrect
                            ? { y: [0, -5, 0], rotate: [0, 15, -15, 0] }
                            : { rotate: 0 }
                    }
                    transition={{ duration: 0.5, repeat: 0, repeatType: "reverse" }}>
                    {lockIcon}
                </motion.span>
            </motion.button>
        </form>
    );
}
export default LoginForm