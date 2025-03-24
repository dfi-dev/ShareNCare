import { FaHandHoldingDroplet } from "react-icons/fa6";
import { BiDonateHeart } from "react-icons/bi";
import { FaTshirt, FaUtensils, FaBook, FaHandsHelping, FaUsers, FaGift } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { motion } from "framer-motion";

const Donate = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-24">

      {/* Hero Section */}
      <header className="text-center py-16">
        <motion.h1
          className="text-3xl sm:text-5xl font-bold text-gray-900"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Donate & Make a Difference
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
     Even the smallest act of generosity can create a ripple effect of kindness,<br/> bringing hope and positive change to those in need.
        </motion.p>
      </header>

      {/* Why Donate? */}
      <section className="max-w-5xl mx-auto mt-10 p-6 sm:p-16 bg-yellow-50 rounded-lg shadow-lg text-center">
        <FaUsers className="text-5xl text-yellow-600 mx-auto mb-2" />
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-700">Why Donate?</h2>
        <p className="mt-4 text-lg text-gray-600">Every donation helps someone in need. Your kindness makes the world a better place.</p>
      </section>

      {/* Other Items Donation */}
      <motion.section 
        className="max-w-5xl mx-auto mt-10 p-6 sm:p-16 bg-green-50 rounded-lg shadow-lg text-center"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <FaHandsHelping className="text-5xl text-green-600 mx-auto mb-2" />
        <h2 className="text-2xl sm:text-3xl font-bold text-green-700">Donate Essential Items</h2>
        <p className="mt-4 text-lg text-gray-600">Your contribution can bring a smile to someone in need.</p>

        {/* Donation Categories */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 justify-center">
          {[
            { name: "Clothes", icon: <FaTshirt className="text-4xl text-green-600" /> },
            { name: "Food", icon: <FaUtensils className="text-4xl text-green-600" /> },
            { name: "Books", icon: <FaBook className="text-4xl text-green-600" /> },
            { name: "Other Essentials", icon: <FaGift className="text-4xl text-green-600" /> }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {item.icon}
              <p className="mt-2 text-lg font-semibold text-gray-800">{item.name}</p>
            </motion.div>
          ))}
        </div>

        {/* Donate AnimatedButton */}
        <button className="mt-6 px-5 py-2 flex items-center gap-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition mx-auto">
          <BiDonateHeart className="text-xl" /> Donate Now
        </button>
      </motion.section>

      {/* Blood Donation */}
      <motion.section 
        className="max-w-5xl mx-auto mt-10 p-6 sm:p-16 bg-red-50 rounded-lg shadow-lg text-center"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <FaDroplet className="text-5xl text-red-600 mx-auto mb-2" />
        <h2 className="text-2xl sm:text-3xl font-bold text-red-700">Donate Blood, Save Lives</h2>
        <p className="mt-4 text-lg text-gray-600">Join our community of blood donors and make an impact.</p>
        <button className="mt-6 px-5 py-2 flex items-center gap-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition mx-auto">
          <FaHandHoldingDroplet className="text-xl" /> Donate Blood
        </button>
      </motion.section>

      {/* How It Works Section */}
      <section className="max-w-5xl mx-auto mt-10 p-6 sm:p-16 bg-blue-50 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700">How It Works</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { step: "Sign Up", description: "Create an account and join our mission." },
            { step: "Choose Donation", description: "Select what you want to donate." },
            { step: "Make an Impact", description: "Deliver your donation and help someone in need." }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-900">{item.step}</h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Donate;
