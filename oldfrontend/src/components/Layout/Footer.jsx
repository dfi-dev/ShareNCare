import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdLocationOn, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500/10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-5 py-16 relative z-10">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* About section - spans 5 columns */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaHandHoldingHeart className="text-4xl text-teal-400" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Donate2Serve
              </h2>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6 text-base">
              Empowering communities through transparent and impactful donations. 
              We bridge the gap between generosity and need.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Trusted", color: "from-teal-500 to-teal-600" },
                { label: "Secure", color: "from-blue-500 to-blue-600" },
                { label: "24/7 Support", color: "from-purple-500 to-purple-600" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -3 }}
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-medium shadow-md`}
                >
                  {item.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact and Newsletter - spans 7 columns */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-6 pb-3 border-b border-gray-700/50 relative">
                <span className="relative inline-block">
                  Contact Us
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-blue-500"></span>
                </span>
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-gray-800/50 rounded-lg">
                    <MdLocationOn className="text-teal-400 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm">Location</h4>
                    <p className="text-gray-300">Kharar, Punjab, India</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-gray-800/50 rounded-lg">
                    <MdPhone className="text-teal-400 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm">Phone</h4>
                    <p className="text-gray-300">+91 7667536861</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-gray-800/50 rounded-lg">
                    <IoMdMail className="text-teal-400 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm">Email</h4>
                    <p className="text-gray-300 break-all">donate2serve5@gmail.com</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-6 pb-3 border-b border-gray-700/50 relative">
                <span className="relative inline-block">
                  Newsletter
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-blue-500"></span>
                </span>
              </h3>
              
              <p className="text-gray-300 mb-6">
                Join our community to receive updates on our latest initiatives.
              </p>
              
              <div className="space-y-4">
                <motion.div whileHover={{ y: -2 }}>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-teal-400 focus:ring-2 focus:ring-teal-300/20 outline-none transition-all placeholder-gray-500"
                    placeholder="Your email address"
                  />
                </motion.div>
                
                <motion.button
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IoMdMail className="text-lg" />
                  Subscribe Now
                </motion.button>
              </div>
              
              <div className="mt-8">
                <h4 className="text-sm font-medium mb-4 text-gray-400 uppercase tracking-wider">
                  Follow Us
                </h4>
                <div className="flex gap-3">
                  {[
                    { icon: FaFacebook, color: "hover:bg-blue-500" },
                    { icon: FaTwitter, color: "hover:bg-sky-500" },
                    { icon: FaInstagram, color: "hover:bg-pink-500" },
                    { icon: FaLinkedin, color: "hover:bg-blue-600" },
                    { icon: FaWhatsapp, color: "hover:bg-green-500" },
                  ].map(({ icon: Icon, color }, index) => (
                    <motion.a
                      key={index}
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 ${color} hover:text-white transition-all`}
                    >
                      <Icon className="text-lg" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/50 my-10"></div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm"
        >
          <p>© {new Date().getFullYear()} Donate2Serve. All rights reserved.</p>
          
          <div className="flex gap-4 mt-4 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((item, index) => (
              <motion.a
                key={index}
                whileHover={{ color: "#5eead4" }} // teal-300
                className="hover:text-teal-300 cursor-pointer transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;