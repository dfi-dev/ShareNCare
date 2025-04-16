import { motion } from "framer-motion";
import Testimonial from "../../components/Testimonials/Testimonial.jsx";
import CommunityImpact from "../../components/Stats/CommunityImpact.jsx";
import { FaHandsHelping, FaShieldAlt, FaChartLine } from "react-icons/fa";
import FeatureCard from "../../components/Modals/FeatureGrid.jsx";


const Welcome = () => {
  const testimonialData = [
    {
      name: "Sunny Kumar",
      imageUrl: "https://randomuser.me/api/portraits/men/357.jpg",
      description: "ShareNCare has transformed the way I contribute to society. It's simple, fast, and truly impactful!",
      type: "Donor"
    },
    {
      name: "Shubham Yadav",
      imageUrl: "https://randomuser.me/api/portraits/women/607.jpg",
      description: "ShareNCare has revolutionized my way of giving back. It's so simple, yet so powerful!",
      type: "Recipient"
    },
    {
      name: "Nidhi Kumari",
      imageUrl: "https://randomuser.me/api/portraits/men/357.jpg",
      description: "ShareNCare has transformed the way I contribute to society. It's simple, fast, and truly impactful!",
      type: "Donor"
    },
  ]

  const features = [
    {
      icon: <FaHandsHelping />,
      title: "Seamless Donations",
      description: "Quick and secure giving with just a few clicks.",
      bgColor: "bg-blue-400",
    },
    {
      icon: <FaShieldAlt />,
      title: "Trust & Transparency",
      description: "Track where your donation goes in real-time.",
      bgColor: "bg-teal-500",
    },
    {
      icon: <FaChartLine />,
      title: "Impact Insights",
      description: "Visualize the change your support makes.",
      bgColor: "bg-violet-500",
    },
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="relative isolate px-6 pt-24 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-blue-100"></div>

        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-indigo-200 to-purple-300 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-pink-200 to-rose-300 rounded-full filter blur-3xl opacity-20 -z-10"></div>

        <motion.div
          className="mx-auto max-w-4xl py-20 sm:py-28 lg:py-28 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
            Join the Movement
          </motion.div>

          <motion.h1
            className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
              Empower
            </span> Your Generosity
          </motion.h1>

          <motion.p
            className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            ShareNCare bridges compassion with action. Transform lives through simple, meaningful donations.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center sm:flex-row sm:justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {/* Get Started */}
            <motion.a
              href="#"
              className="w-40 sm:w-48 h-12 overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 text-base font-medium text-white shadow-md hover:shadow-lg transition-all duration-300 group flex items-center justify-center"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>

            {/* Learn More */}
            <motion.a
              href="#"
              className="w-40 sm:w-48 h-12 overflow-hidden rounded-lg bg-white hover:bg-gray-100 px-5 py-2.5 text-base font-medium text-slate-800 border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 group flex items-center justify-center gap-1 relative"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="transition-colors duration-300 group-hover:text-slate-900">
                Learn More
              </span>
              <span className="transition-colors duration-300 text-blue-600 group-hover:text-blue-700">
                →
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </header>

      {/* Community Impact Section */}
      <CommunityImpact />

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
              Our Features
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Why Choose Donate2Serve?
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Making donations <span className="font-semibold text-indigo-600">easy</span>,{" "}
              <span className="font-semibold text-teal-600">impactful</span>, and{" "}
              <span className="font-semibold text-purple-600">transparent</span>.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonial userList={testimonialData} />
    </div>
  );
};

export default Welcome;