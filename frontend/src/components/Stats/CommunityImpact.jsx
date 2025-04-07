import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../../store/actions/statsActions";
import { motion, useInView } from "framer-motion";
import {
  FaUsers,
  FaUserCheck,
  FaUserFriends,
  FaHandHoldingHeart,
  FaTint,
  FaBoxOpen,
} from "react-icons/fa";
import { Ri24HoursFill } from "react-icons/ri";

const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const duration = 1200;
      let start = null;
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setDisplayValue(Math.floor(progress * value));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
      {displayValue.toLocaleString()}
    </span>
  );
};

const StatCardLoader = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="rounded-3xl bg-white/80 backdrop-blur-sm p-6 border border-gray-200/50 shadow-lg space-y-5 overflow-hidden relative"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-white/50 opacity-40" />
    <div className="h-12 w-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse" />
    <div className="space-y-3">
      <div className="h-8 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
      <div className="h-4 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
    </div>
    <div className="h-1 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mt-6 animate-pulse" />
  </motion.div>
);

const CommunityImpact = () => {
  const dispatch = useDispatch();
  const { data: stats, loading } = useSelector((state) => state.stats);
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  const statItems = [
    { 
      title: "Total Users", 
      value: stats?.totalUsers ?? 0, 
      icon: FaUsers, 
      gradient: "from-indigo-500 to-blue-600",
      bg: "bg-indigo-50"
    },
    { 
      title: "New Today", 
      value: stats?.usersLast24Hours ?? 0, 
      icon: Ri24HoursFill, 
      gradient: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50"
    },
    { 
      title: "People Helped", 
      value: stats?.peopleHelped ?? 0, 
      icon: FaHandHoldingHeart, 
      gradient: "from-rose-500 to-pink-600",
      bg: "bg-rose-50"
    },
    { 
      title: "Active Donors", 
      value: stats?.totalDonors ?? 0, 
      icon: FaUserCheck, 
      gradient: "from-sky-500 to-cyan-600",
      bg: "bg-sky-50"
    },
    { 
      title: "Recipients", 
      value: stats?.totalRecipients ?? 0, 
      icon: FaUserFriends, 
      gradient: "from-violet-500 to-purple-600",
      bg: "bg-violet-50"
    },
    { 
      title: "Blood Donations", 
      value: stats?.bloodDonations ?? 0, 
      icon: FaTint, 
      gradient: "from-red-500 to-rose-600",
      bg: "bg-red-50"
    },
    { 
      title: "Item Donations", 
      value: stats?.regularDonations ?? 0, 
      icon: FaBoxOpen, 
      gradient: "from-amber-500 to-yellow-500",
      bg: "bg-amber-50"
    },
    { 
      title: "Completed", 
      value: stats?.completedDonations ?? 0, 
      icon: FaHandHoldingHeart, 
      gradient: "from-green-500 to-emerald-600",
      bg: "bg-green-50"
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-4 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
            Community Impact
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Together We Make <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">Impact</span>
          </h2>
          <p className="mt-5 text-xl text-gray-600 max-w-3xl mx-auto">
            Every number represents a life changed through collective generosity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? [...Array(8)].map((_, i) => <StatCardLoader key={i} />)
            : statItems.map((stat, i) => (
                <StatCard key={i} stat={stat} index={i} inView={inView} />
              ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ stat, index, inView }) => {
    const Icon = stat.icon;
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
        whileHover={{ 
          y: -8,
          scale: 1.02,
        }}
        className="relative rounded-3xl p-[2px] shadow-lg w-full"
      >
        {/* Glassmorphism background layer */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-[22px] border border-white/20" />
        
        {/* Decorative gradient border */}
        <div className={`absolute inset-0 rounded-[22px] bg-gradient-to-br ${stat.gradient} opacity-5 pointer-events-none`} />
        
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-indigo-400/50 rounded-tl-3xl" />
        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-pink-400/50 rounded-tr-3xl" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-emerald-400/50 rounded-bl-3xl" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-amber-400/50 rounded-br-3xl" />
  
        {/* Main card content */}
        <div className={`group relative overflow-hidden rounded-[22px] p-6 backdrop-blur-sm transition-all duration-300 h-full`}>
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden rounded-[22px]">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/40 rounded-full"
                animate={{
                  y: [0, -10 * (i % 2 ? 1 : -1)],
                  x: [0, 10 * (i % 3 ? 1 : -1)],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                style={{
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  top: `${10 + Math.random() * 80}%`,
                  left: `${10 + Math.random() * 80}%`,
                }}
              />
            ))}
          </div>
  
          {/* Icon container */}
          <div className={`relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg mb-4 transition-transform duration-300 group-hover:scale-110`}>
            <Icon className="text-xl" />
            <div className="absolute inset-0 rounded-xl border border-white/20" />
          </div>
  
          {/* Content */}
          <div className="relative z-10">
            <AnimatedNumber value={stat.value} />
            <p className="text-gray-700 mt-1 text-base font-medium">{stat.title}</p>
          </div>
  
          {/* Animated underline */}
          <motion.div 
            initial={{ width: 0 }}
            animate={inView ? { width: "100%" } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
            className={`relative z-10 mt-4 h-1 rounded-full bg-gradient-to-r ${stat.gradient}`}
          />
        </div>
      </motion.div>
    );
  };
  
  

export default CommunityImpact;