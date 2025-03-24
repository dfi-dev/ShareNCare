import { useState } from "react";
import { motion } from "framer-motion";
import { MdLocationOn } from "react-icons/md";
import { VscDebugBreakpointDataUnverified } from "react-icons/vsc";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaArrowPointer } from "react-icons/fa6";



const TopDonors = () => {
  const [filter, setFilter] = useState("alltime");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const donors = [
    { name: "John Doe", location: "New York, USA", donations: 45, image: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Jane Smith", location: "London, UK", donations: 30, image: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "Emily Johnson", location: "Sydney, Australia", donations: 25, image: "https://randomuser.me/api/portraits/women/3.jpg" },
    { name: "Michael Brown", location: "Toronto, Canada", donations: 20, image: "https://randomuser.me/api/portraits/men/4.jpg" },
  ];

  return (
    <motion.div className="min-h-screen bg-gray-50 px-4 py-20">
      {/* Hero Section */}
      <header className="text-center py-24">
        <motion.h1
          className="text-3xl sm:text-5xl font-bold text-gray-900"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Top Donors
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Celebrate the generosity of our top contributors.
        </motion.p>
      </header>

      {/* Filter Section */}
      <motion.div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-3 p-4 bg-white shadow-md rounded-lg">
        {["alltime", "thismonth", "custom"].map((type) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.1 }}
            transition={{ delay: 0.0, duration: 0.0 }}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition m-2 ${filter === type ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setFilter(type)}
          >
            {type === "alltime" ? "All Time" : type === "thismonth" ? "This Month" : "Custom Date"}
          </motion.button>
        ))}
      </motion.div>

      {filter === "custom" && (
        <div className="max-w-3xl mx-auto mt-4 p-4 bg-white shadow-md rounded-lg flex flex-wrap sm:flex-nowrap sm:items-center gap-4">

          {/* From Date */}
          <div className="flex flex-col w-full sm:w-auto flex-1">
            <label className="text-gray-700 font-semibold mb-1">From:</label>
            <input
              type="date"
              className="border p-1 rounded-lg w-full sm:w-48"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {/* To Date */}
          <div className="flex flex-col w-full sm:w-auto flex-1">
            <label className="text-gray-700 font-semibold mb-1">To:</label>
            <input
              type="date"
              className="border p-1 rounded-lg w-full sm:w-48"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {/* Apply Filter AnimatedButton */}
          <button className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-sm text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
            Apply Filter
          </button>
        </div>
      )}


      {/* Donor List */}
      <section className="max-w-5xl mx-auto mt-10 p-6 sm:p-12 sm:pb-20 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6 sm:mb-8">
          Meet Our Top Donors
        </h2>
        <div className="space-y-6 sm:space-y-8">
          {donors.map((donor, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center p-4 sm:p-4 bg-gray-100 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.01] transition transform duration-300"
            >
              {/* Donor Image */}
              <img
                src={donor.image}
                alt={donor.name}
                className="w-20 h-20 sm:w-16 sm:h-16 rounded-full border-4 border-white shadow-md"
              />

              {/* Donor Info */}
              <div className="text-center sm:text-left sm:ml-6 flex-1 mt-3 sm:mt-0">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{donor.name}</h3>
                <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-600">
                  <MdLocationOn className="text-indigo-600 text-lg" />
                  <span>{donor.location}</span>
                </div>
              </div>

              {/* Donation Count + Badge */}
              <div className="text-center mt-3 sm:mt-0">
                <p className="text-lg font-bold text-gray-900">{donor.donations} Donations</p>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-lg ${donor.donations >= 40
                    ? "bg-yellow-400 text-black"
                    : donor.donations >= 25
                      ? "bg-blue-400 text-white"
                      : "bg-green-400 text-white"
                    }`}
                >
                  {donor.donations >= 40 ? "Gold Donor" : donor.donations >= 25 ? "Silver Donor" : "Bronze Donor"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="max-w-5xl mx-auto mt-10 p-6 sm:p-16 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Donate?</h2>
        <p className="mt-4 text-lg text-gray-600">
          Your donation helps those in need, bringing hope and change to countless lives. <br /> Join us in making a difference today!
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ delay: 0.0, duration: 0.0 }}
          className="mt-6 px-5 py-2 flex items-center gap-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition mx-auto">
          <BiSolidDonateHeart className="text-xl" />Start Donating
        </motion.button>
      </section>



      {/* How to Become a Top Donor Section */}
      <section className="max-w-5xl mx-auto mt-10 p-6 sm:p-16 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">How to Become a Top Donor?</h2>
        <p className="mt-8 text-lg text-gray-600">
          Start making a difference today! Follow these simple steps:
        </p>
        <ul className="mt-8 text-gray-700 text-lg space-y-3 flex flex-col items-center">
          <li className="flex items-center justify-start w-full max-w-md gap-4">
            <VscDebugBreakpointDataUnverified className="text-indigo-600 text-xl" />
            <span>Sign up and create an account.</span>
          </li>
          <li className="flex items-center justify-start w-full max-w-md gap-4">
            <VscDebugBreakpointDataUnverified className="text-indigo-600 text-xl" />
            <span>Choose items you wish to donate.</span>
          </li>
          <li className="flex items-center justify-start w-full max-w-md gap-4">
            <VscDebugBreakpointDataUnverified className="text-indigo-600 text-xl" />
            <span>Deliver your donation to a verified recipient.</span>
          </li>
          <li className="flex items-center justify-start w-full max-w-md gap-4">
            <VscDebugBreakpointDataUnverified className="text-indigo-600 text-xl" />
            <span>Track your contributions and get recognized!</span>
          </li>
        </ul>


        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="mt-12 px-5 py-2 flex items-center gap-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition mx-auto">
          <FaArrowPointer className="text-xl" />
          Start Your Journey
        </motion.button>
      </section>


    </motion.div>
  );
};

export default TopDonors;
