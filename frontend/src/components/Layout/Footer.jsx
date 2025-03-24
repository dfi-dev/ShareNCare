import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white font-sans py-10">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold">ShareNCare</h2>
            <p className="mt-2 text-gray-300">
              Connecting hearts through generosity. Making donations seamless, transparent, and impactful.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {["Home", "About Us", "Our Mission", "Donate", "Contact"].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.05, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="cursor-pointer hover:text-gray-200 transition"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold">Subscribe to Our Newsletter</h3>
            <p className="mt-2 text-gray-300">Get updates on donations, events, and more.</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                className="w-[80%] md:w-auto mx-auto px-4 py-2 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter your email"
              />
              <motion.button
                className="bg-white text-indigo-700 font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="mt-4 flex justify-center sm:justify-start gap-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp].map((Icon, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="cursor-pointer p-3 bg-white text-indigo-700 rounded-full shadow-lg hover:bg-gray-200 transition"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-500" />

        {/* Copyright Text */}
        <p className="text-center text-gray-300 text-sm">
          © {new Date().getFullYear()} ShareNCare. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
