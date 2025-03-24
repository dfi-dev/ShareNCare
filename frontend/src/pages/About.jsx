import { motion } from "framer-motion";
import { FaArrowPointer, FaRegHand, FaRegHandPointer } from "react-icons/fa6";
import { GiClick } from "react-icons/gi";


const images = [
    "https://randomuser.me/api/portraits/men/20.jpg",  // Replace with your actual image paths
    "https://randomuser.me/api/portraits/men/67.jpg",
    "https://randomuser.me/api/portraits/men/44.jpg",
    "https://randomuser.me/api/portraits/men/51.jpg",
    "https://randomuser.me/api/portraits/men/22.jpg",
];


const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900">
      {/* Hero Section */}
      <header className="relative px-6 pt-14 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
          <motion.h1
            className="text-5xl font-bold text-indigo-900 sm:text-6xl"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About <span className="text-indigo-600">ShareNCare</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Connecting hearts through generosity. Making donations seamless,
            transparent, and impactful.
          </motion.p>
        </div>
      </header>

        {/* Our Mission Section */}
        <motion.section
            className="py-28 bg-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-5xl mx-auto text-center px-6">
                <h2 className="text-4xl font-bold text-indigo-900">Our Mission</h2>
                <p className="mt-4 text-lg text-gray-600">
                    At ShareNCare, we believe in creating a world where generosity knows no bounds.
                    Our platform helps donors connect with those in need by making it simple to donate
                    items like clothing, food, and essentials.
                </p>
            </div>

            {/* Image Carousel (66% Width) */}
            <div className="relative w-2/3 mx-auto overflow-hidden mt-12 ">
                <motion.div
                    className="flex gap-6"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                    {[...images, ...images].map((img, index) => (
                        <motion.div
                            key={index}
                            className="flex-shrink-0 w-1/2 md:w-1/4 h-auto rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
                            whileHover={{ scale: 1.1 }}
                        >
                            <img
                                src={img}
                                alt={`Mission ${index}`}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Gradient Fade for a Seamless Look */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white pointer-events-none"></div>
            </div>
        </motion.section>


        {/* How It Works */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-indigo-900">How It Works</h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Sign Up",
                desc: "Create a free account and join our community.",
              },
              {
                title: "Donate Items",
                desc: "List items you want to donate or find requests from those in need.",
              },
              {
                title: "Make an Impact",
                desc: "Track your contributions and see the difference you make.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <h3 className="text-2xl font-semibold text-indigo-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-indigo-900">Our Impact</h2>
          <p className="mt-4 text-lg text-gray-600">
            See how ShareNCare is making a difference.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-8">
            {[
              { number: "10,000+", text: "Items Donated" },
              { number: "5,000+", text: "Families Helped" },
              { number: "500+", text: "Active Donors" },
            ].map((impact, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <h3 className="text-3xl font-bold text-indigo-900">
                  {impact.number}
                </h3>
                <p className="text-gray-700">{impact.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        className="py-20 text-black text-center mx-[30px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold">Join Us in Making a Difference</h2>
        <p className="mt-4 text-lg">
          Be part of a movement that brings hope to those in need.
        </p>
        <div className="mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="mt-12 px-5 py-2 flex items-center gap-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition mx-auto">
            <GiClick className="text-xl" />
            Get Started
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
