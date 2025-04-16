import React, { useState } from 'react';
import {
  FiHeart, FiPackage, FiClock, FiTrendingUp,
  FiMessageSquare, FiAward, FiCheckCircle, FiAlertCircle
} from 'react-icons/fi';
import { RiHandHeartLine, RiLeafLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCounter from '../../components/UI/AnimatedCounter';
import { useSelector } from 'react-redux'; // ✅ Add this

const DonorLanding = ({ userName = 'Donor' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showImpactVisualization, setShowImpactVisualization] = useState(false);
  const [activeCarouselItem, setActiveCarouselItem] = useState(0);


  const user = useSelector((state) => state.userAuth.user);

  const config = {
    color: 'from-pink-500 to-rose-500',
    lightColor: 'bg-pink-50 text-pink-600',
    icon: <FiHeart className="text-pink-500" />,
    welcomeTitle: `Welcome back, ${user.name}!`,
    welcomeSubtitle: 'Your generosity is changing lives every day.',
    stats: [
      { value: '12', label: 'Total Donations', icon: <FiHeart className="text-pink-500" /> },
      { value: '3', label: 'Active Requests', icon: <FiPackage className="text-blue-500" /> },
      { value: '24', label: 'Lives Impacted', icon: <RiHandHeartLine className="text-green-500" /> },
      { value: '5', label: 'Streak (weeks)', icon: <FiTrendingUp className="text-yellow-500" /> }
    ],
    quickActions: [
      { label: 'Donate Items', icon: <FiPackage className="text-pink-500" />, path: '/new-donation' },
      { label: 'View Requests', icon: <FiHeart className="text-blue-500" />, path: '/requests' },
      { label: 'Donation History', icon: <FiClock className="text-purple-500" />, path: '/donation-history' }
    ],
    recentItems: [
      { id: 1, type: 'Donation', item: 'Clothes', meta: '2 hours ago', status: 'Completed' },
      { id: 2, type: 'Request', item: 'Food', meta: '1 day ago', status: 'Pending' },
      { id: 3, type: 'Donation', item: 'Books', meta: '3 days ago', status: 'Completed' }
    ],
    tabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'impact', label: 'Your Impact' },
      { id: 'community', label: 'Community' }
    ],
    featuredRequests: [
      { id: 1, title: 'Winter Clothing Drive', organization: 'City Shelter', items: 'Coats, Sweaters', urgency: 'High', distance: '2.3 miles' },
      { id: 2, title: 'School Supplies', organization: 'Local Elementary', items: 'Notebooks, Pens', urgency: 'Medium', distance: '4.1 miles' }
    ],
    donationTips: [
      { id: 1, title: 'Preparing Your Donation', content: 'Learn how to properly package items for maximum impact.' },
      { id: 2, title: 'Most Needed Items', content: 'See what items are in highest demand this season.' }
    ],
    milestones: [
      { id: 1, title: 'Bronze Donor', achieved: true, progress: 100 },
      { id: 2, title: 'Silver Donor', achieved: false, progress: 65 },
      { id: 3, title: 'Gold Donor', achieved: false, progress: 30 }
    ]
  };

  const renderImpactVisualization = () => {
    if (!showImpactVisualization) return null;

    const impactData = [
      { label: 'Meals Provided', value: 42, color: 'bg-pink-400' },
      { label: 'Clothes Donated', value: 28, color: 'bg-purple-400' },
      { label: 'Shelters Supported', value: 5, color: 'bg-yellow-400' }
    ];

    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="mt-6 bg-white rounded-xl p-6 shadow-sm overflow-hidden"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <RiLeafLine className="mr-2 text-green-500" />
          Your Impact Visualization
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {impactData.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg border border-gray-200"
            >
              <div className="flex items-center mb-2">
                <div className={`w-4 h-4 rounded-full ${item.color} mr-2`}></div>
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="flex items-end">
                <span className="text-3xl font-bold mr-2">{item.value}</span>
                <div
                  className={`flex-1 ${item.color} rounded-full`}
                  style={{ height: `${Math.min(item.value / 2, 50)}px` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
        <button
          onClick={() => setShowImpactVisualization(false)}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700"
        >
          Close visualization
        </button>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`bg-gradient-to-r ${config.color} rounded-xl p-6 text-white shadow-lg mb-8`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{config.welcomeTitle}</h1>
              <p className="mt-2 opacity-90">{config.welcomeSubtitle}</p>
            </div>
            <button
              className="bg-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition"
              style={{ color: '#db2777' }}
            >
              Make a New Donation
            </button>
          </div>
        </motion.div>

        {/* Role-Specific Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {config.tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium text-sm relative ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-current"
                  transition={{ type: 'spring', bounce: 0.25 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {config.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-gray-100 mr-4">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Primary Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center">
                  <FiClock className="mr-2 text-pink-500" />
                  Recent Activity
                </h2>
                <button
                  onClick={() => setShowImpactVisualization(!showImpactVisualization)}
                  className="px-3 py-1 rounded-full text-sm bg-pink-50 text-pink-600 hover:bg-opacity-80 transition"
                >
                  {showImpactVisualization ? 'Hide Impact' : 'Show Impact'}
                </button>
              </div>

              <AnimatePresence>
                {renderImpactVisualization()}
              </AnimatePresence>

              <div className="divide-y divide-gray-200">
                {config.recentItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.type}: {item.item}</p>
                        <p className="text-sm text-gray-500">{item.meta}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {item.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200 text-center">
                <button className="text-pink-600 hover:opacity-80 font-medium">
                  View All Activity
                </button>
              </div>
            </div>

            {/* Featured Requests Carousel */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold flex items-center">
                  <FiHeart className="mr-2 text-pink-500" />
                  Featured Requests
                </h2>
              </div>
              <div className="relative">
                {config.featuredRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: index === activeCarouselItem ? 1 : 0,
                      height: index === activeCarouselItem ? 'auto' : 0
                    }}
                    transition={{ duration: 0.5 }}
                    className={`p-6 ${index === activeCarouselItem ? 'block' : 'absolute top-0 left-0 right-0'}`}
                  >
                    <h3 className="font-medium">{request.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{request.organization}</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="text-sm">
                        <span className="text-gray-500">Items:</span> {request.items}
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Distance:</span> {request.distance}
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Urgency:</span>
                        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${request.urgency === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {request.urgency}
                        </span>
                      </div>
                    </div>
                    <button className="mt-4 w-full py-2 bg-pink-50 text-pink-600 rounded-lg font-medium hover:bg-opacity-80 transition">
                      Respond to Request
                    </button>
                  </motion.div>
                ))}
                <div className="flex justify-center space-x-2 p-4">
                  {config.featuredRequests.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCarouselItem(index)}
                      className={`w-2 h-2 rounded-full ${index === activeCarouselItem ? 'bg-pink-500' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions and Secondary Content */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold flex items-center">
                  <RiHandHeartLine className="mr-2 text-pink-500" />
                  Quick Actions
                </h2>
              </div>
              <div className="p-4 space-y-4">
                {config.quickActions.map((action, index) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-full flex items-center justify-between p-4 bg-pink-50 rounded-lg transition hover:bg-opacity-80"
                  >
                    <span className="font-medium">{action.label}</span>
                    {action.icon}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Donation Milestones */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold flex items-center">
                  <FiAward className="mr-2 text-yellow-500" />
                  Your Milestones
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {config.milestones.map(milestone => (
                  <div key={milestone.id}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{milestone.title}</span>
                      {milestone.achieved ? (
                        <span className="text-sm text-green-500">Achieved!</span>
                      ) : (
                        <span className="text-sm text-gray-500">{milestone.progress}%</span>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${milestone.achieved ? 'bg-yellow-500' : 'bg-pink-300'}`}
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donation Tips */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold flex items-center">
                  <FiMessageSquare className="mr-2 text-gray-500" />
                  Donation Tips
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {config.donationTips.map(tip => (
                    <li key={tip.id} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium">{tip.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{tip.content}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonorLanding;