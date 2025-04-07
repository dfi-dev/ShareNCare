import { motion } from "framer-motion";

const AnimatedButton = ({
                            onClick,
                            children,
                            className = "",
                            whileHover = { scale: 1.04 },
                            iconAnimation = {},
                            transition = { duration: 0.8, repeat: Infinity },
                            Icon,
                            iconPosition = "before",
                        }) => {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            className={`flex items-center justify-center w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 p-[9px] rounded-lg text-sm font-[500] gap-1 ${className}`}
            whileHover={whileHover}
        >
            {Icon && iconPosition === "before" && (
                <motion.span animate={iconAnimation} transition={transition}>
                    <Icon className="text-lg" />
                </motion.span>
            )}

            {children}

            {Icon && iconPosition === "after" && (
                <motion.span animate={iconAnimation} transition={transition}>
                    <Icon className="text-lg" />
                </motion.span>
            )}
        </motion.button>
    );
};

export default AnimatedButton;
