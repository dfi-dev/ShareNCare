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
            className={`flex items-center justify-center w-full bg-[#12b9b3] text-white p-[9px] rounded-lg hover:bg-[#10c1bb] text-sm font-[500] gap-1 ${className}`}
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
