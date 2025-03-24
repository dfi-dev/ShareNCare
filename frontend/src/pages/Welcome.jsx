import { motion } from "framer-motion";
import Testimonial from "../components/Testimonials/Testimonial.jsx";
import {FaArrowPointer} from "react-icons/fa6";
import {FaHandsHelping, FaUsers} from "react-icons/fa";
import { Ri24HoursFill } from "react-icons/ri";

const Welcome = () => {
  const testimonialData = [
      {name: "Sunny Kumar", imageUrl: "https://randomuser.me/api/portraits/men/35.jpg", description: "ShareNCare has transformed the way I contribute to society. It's simple, fast, and truly impactful!", type: "Donor"},
      {name: "Michelle", imageUrl: "https://randomuser.me/api/portraits/women/60.jpg", description: "ShareNCare has revolutionized my way of giving back. It's so simple, yet so powerful!", type: "Recipient"},
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] 
            bg-gradient-to-tr from-pink-400 to-indigo-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <motion.div
          className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Empowering Your Generosity
          </h1>
          <p className="mt-6 text-lg text-gray-700">
            ShareNCare connects donors with those in need. Donate items, contribute to social impact, and make a difference today.
          </p>
          <div className="mt-8 flex justify-center gap-x-4">
            <a
              href="#"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-base font-semibold text-white shadow-md hover:bg-indigo-500 transition duration-300"
            >
              Get Started
            </a>
            <a
              href="#"
              className="rounded-lg px-4 py-2 text-base font-semibold text-gray-900 border border-gray-300 shadow-md hover:bg-gray-100 transition duration-300"
            >
              Learn More →
            </a>
          </div>

        </motion.div>
      </header>

      {/* Community Impact Section */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Community Impact</h2>
          <motion.div
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8"
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            {[
              { title: <>Total Users <FaUsers className="text-2xl inline-block"/></>, value: "25,000+", customStyle: { backgroundColor: "rgb(63 59 246 / 58%)" } },
              { title: <>New in Last 24 Hrs <Ri24HoursFill className="text-2xl inline-block"/></>, value: "150+", bgColor: "bg-green-500" },
              { title: <>Recipients Helped <FaHandsHelping className="text-2xl inline-block"/></>, value: "12,000+", customStyle: { backgroundColor: "rgb(221 148 8)" } },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`p-6 text-white rounded-lg shadow-lg transition duration-300 ${stat.bgColor || ""}`}
                whileHover={{ scale: 1.05 }}
                style={stat.customStyle || {}}
              >
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="mt-2 text-lg">{stat.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Why Choose ShareNCare?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Making donations easy, impactful, and transparent.
          </p>
          <motion.div
            className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            {[
              { title: "Easy Donations", description: <>Donate clothes, food, and more with a single click<FaArrowPointer className="inline-block ml-2"/></>, customStyle: { backgroundColor: "rgb(131 131 131)" } },
              { title: "Real-Time Updates", description: "Track your donations and see their impact live.", customStyle: { backgroundColor: "rgb(215 164 120)" } },
              { title: "Community-Driven", description: "Join a network of like-minded donors and volunteers.", customStyle: { backgroundColor: "rgb(109 155 211)" } },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 text-white rounded-lg shadow-lg transition duration-300"
                style={item.customStyle}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="mt-2">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonial userList={testimonialData}/>
    </div>
  );
};

export default Welcome;
