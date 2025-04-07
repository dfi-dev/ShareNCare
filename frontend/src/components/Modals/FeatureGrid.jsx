import { motion } from "framer-motion";

const FeatureCard = ({ icon, title, description, bgColor, index }) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      viewport={{ once: true }}
      whileHover={{
        y: -12,
        scale: 1.02,
      }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 ${bgColor} opacity-90`}></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-br-full backdrop-blur-sm"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/10 rounded-tl-full backdrop-blur-sm"></div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/40 rounded-full"
          animate={{
            y: [0, -15 * (i % 2 ? 1 : -1)],
            x: [0, 10 * (i % 3 ? 1 : -1)],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 p-8 h-full">
        <div className="flex flex-col h-full">
          {/* Icon with glow effect */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="mb-8 p-4 bg-white/20 rounded-2xl w-20 h-20 flex items-center justify-center backdrop-blur-md shadow-inner mx-auto"
          >
            <div className="text-white text-3xl">{icon}</div>
          </motion.div>

          {/* Text content */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
            <p className="text-gray-100 text-lg mb-8">{description}</p>
          </div>

          {/* Animated button */}
          <div className="mt-auto">
            <motion.a
              href="#"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Learn more
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </motion.div>
  );
};

export default FeatureCard;
