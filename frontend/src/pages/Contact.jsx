import { MdEmail, MdLocalPhone, MdLocationOn } from "react-icons/md";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";


const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-10">
      {/* Hero Section */}
      <motion.header
        className="relative isolate px-6 pt-14 lg:px-8 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-2xl py-20">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Get in Touch
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Have questions or want to contribute? Reach out to us anytime.
          </p>
        </div>
      </motion.header>

      {/* Contact Form Section */}
      <motion.section
        className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Leave a Message
        </h2>
        <form className="mt-6 space-y-4">
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block text-gray-700 font-medium">Your Name</label>
            <input
              type="text"
              className="w-full mt-2 p-2 border rounded-md outline-indigo-500"
              placeholder="John Doe"
              required
            />
          </motion.div>
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block text-gray-700 font-medium">Your Email</label>
            <input
              type="email"
              className="w-full mt-2 p-2 border rounded-md outline-indigo-500"
              placeholder="you@example.com"
              required
            />
          </motion.div>
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              className="w-full mt-2 p-2 border rounded-md outline-indigo-500"
              rows="4"
              placeholder="Write your message here..."
              required
            ></textarea>
          </motion.div>
          <motion.button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md text-lg font-medium hover:bg-indigo-500 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </form>
      </motion.section>

      {/* Contact Details */}
      <motion.section
        className="max-w-5xl mx-auto mt-20 mb-20 p-6 sm:p-16 bg-yellow-50 rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <FaUsers className="text-5xl text-yellow-600 mx-auto mb-2" />
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-700">Our Contact Details</h2>
        <p className="mt-4 text-lg text-gray-600">Feel free to reach out through any of the following methods:</p>

        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-800 space-y-4 sm:space-y-0 sm:space-x-10">
          {[{
            icon: <MdEmail className="text-3xl text-yellow-700" />,
            text: "contact@sharencare.com"
          }, {
            icon: <MdLocalPhone className="text-3xl text-yellow-700" />,
            text: "+91 123 456 7890"
          }, {
            icon: <MdLocationOn className="text-3xl text-yellow-700" />,
            text: "Kharar, Punjab, 140301"
          }].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-4 justify-center sm:justify-start"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {item.icon}
              <p className="font-medium text-lg text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;