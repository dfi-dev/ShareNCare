import { motion } from "framer-motion";

const HeroHeader = ({
  title = "Make a Life-Changing Impact",
  subtitle = "Join the Movement",
  description = "Donate2Serve bridges compassion with action. Transform lives through simple, meaningful donations.",
  headerSize = "text-4xl sm:text-5xl md:text-6xl lg:text-5xl",
  subtitleSize = "text-lg sm:text-xl md:text-2xl",
  descriptionSize = "text-base sm:text-lg md:text-xl",
}) => {
  const [firstWord, ...rest] = title.split(" ");
  const restText = rest.join(" ");

  return (
    <motion.div
      className="mx-auto max-w-6xl px-4 sm:px-8 pt-16 pb-4 sm:pt-24 sm:pb-12 md:pt-28 md:pb-16 text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium mb-6 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
          {subtitle}
        </motion.div>
      )}

      <motion.h1
        className={`font-extrabold tracking-tight text-black leading-tight ${headerSize} whitespace-nowrap`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
          {firstWord}
        </span>{" "}
        {restText}
      </motion.h1>

      {description && (
        <motion.p
          className={`mt-4 ${descriptionSize} text-gray-600 dark:text-gray-600 max-w-2xl mx-auto`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default HeroHeader;
