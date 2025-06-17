import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";

const Testimonial = ({ userList }) => {
    const [imageError, setImageError] = useState({});
    const [index, setIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                setIndex((prevIndex) => (prevIndex + 1) % userList.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isHovered, userList.length]);
    

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <motion.h2
                    className="text-4xl font-bold text-gray-900 mb-4 sm:text-5xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">Inspiring</span> Stories
                </motion.h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-20">
                    Real experiences from our generous community
                </p>

                <div
                    className="relative max-w-4xl mx-auto"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="bg-white rounded-3xl p-8 pb-16 relative flex flex-col items-center shadow-xl overflow-visible min-h-[300px] border border-gray-100"
                        >
                            {/* Decorative elements */}
                            <div className="absolute top-0 left-0 w-16 h-16 bg-indigo-100/50 rounded-tl-3xl"></div>
                            <div class="absolute bottom-0 right-0 w-16 h-16 bg-blue-100/50 rounded-br-3xl"></div>


                            {/* Profile Image */}
                            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full blur-md opacity-30 -z-10"></div>
                                    {!userList[index].imageUrl || imageError[index] ? (
                                        <IoIosPerson className="w-28 h-28 text-gray-400 bg-white rounded-full border-4 border-white shadow-xl p-3" />
                                    ) : (
                                        <img
                                            src={userList[index].imageUrl}
                                            alt="Donor"
                                            className="w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover"
                                            onError={() => setImageError(prev => ({ ...prev, [index]: true }))}
                                        />
                                    )}
                                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-2 rounded-full shadow-md">
                                        <FaQuoteLeft className="text-sm" />
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial Content */}
                            <div className="relative z-10 w-full mt-20">
                                <FaQuoteLeft className="text-4xl text-gray-200 absolute -top-2 left-4" />
                                <p className="text-lg text-gray-700 px-10 relative italic leading-relaxed">
                                    "{userList[index].description}"
                                </p>
                                <div className="mt-8 font-medium text-gray-800 flex flex-col sm:flex-row justify-center items-center gap-1">
                                    <div className="flex items-center">
                                        <span className="font-semibold">{userList[index].name}</span>
                                    </div>
                                    <div className="bg-white text-blue-600 border border-blue-200 px-4 py-1 rounded-full text-sm font-medium shadow-sm hover:bg-blue-50 transition duration-200">
                                        {userList[index].type}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Indicator dots */}
                    <div className="flex justify-center mt-8 gap-2">
                        {userList.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === index ? 'bg-gradient-to-br from-indigo-500 to-blue-500 w-6' : 'bg-gray-200'}`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;