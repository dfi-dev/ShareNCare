import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaPen } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";

const Testimonial = ({ userList }) => {
    const [imageError, setImageError] = useState({});
    const [index, setIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                nextTestimonial();
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [index, isHovered]);

    const nextTestimonial = () => {
        setIndex((prevIndex) => (prevIndex + 1) % userList.length);
    };

    const prevTestimonial = () => {
        setIndex((prevIndex) => (prevIndex - 1 + userList.length) % userList.length);
    };

    return (
        <section className="py-20 bg-gray-100">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-10">What Donors Say</h2>

                <div
                    className="relative max-w-3xl mx-auto overflow-visible mt-20"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white shadow-lg rounded-2xl p-8 pb-12 relative flex flex-col items-center overflow-visible min-h-[250px] m-5"
                        >
                            {/* Profile Image */}

                            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 overflow-visible">
                                {!userList[index].imageUrl || imageError[index] ? (
                                    <IoIosPerson className="w-20 h-20 text-gray-400 bg-white rounded-full border-4 border-gray-300 shadow-md p-2" />
                                ) : (
                                    <img
                                        src={userList[index].imageUrl}
                                        alt="Donor"
                                        className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                                        onError={(e) => {
                                            e.target.onerror = null; // Prevent infinite loops
                                            setImageError(prev => {
                                                if (!prev[index]) return { ...prev, [index]: true }; // If error already exists, do nothing

                                            });
                                        }}
                                    />
                                )}
                            </div>

                            {/* Testimonial Content */}
                            <p className="text-lg text-gray-700 italic mt-16">
                                "{userList[index].description}"
                            </p>
                            <div className="mt-4 font-semibold space-x-2 text-base text-gray-700 flex justify-center items-center gap-2">
                                <FaPen /> {userList[index].name}
                                <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-900">
                                    <circle r={1} cx={1} cy={1} />
                                </svg>
                                <div className="text-gray-400"> {userList[index].type} </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevTestimonial}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-500"
                    >
                        <FaChevronLeft />
                    </button>

                    <button
                        onClick={nextTestimonial}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-500"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
