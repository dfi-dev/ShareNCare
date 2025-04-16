import React, { useState } from 'react';
import {
  FiShoppingBag, FiCheckCircle, FiAlertCircle, FiClock,
  FiMessageSquare, FiMapPin, FiCalendar
} from 'react-icons/fi';
import { RiHandHeartLine, RiCommunityLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCounter from '../../components/AnimatedCounter';

const RecipientLanding = ({ userName = 'User' }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const config = {
    color: 'from-emerald-500 to-teal-500',
    lightColor: 'bg-emerald-50 text-emerald-600',
    icon: <RiHandHeartLine className="text-emerald-500" />,
    welcomeTitle: `Welcome, ${userName}!`,
    welcomeSubtitle: 'Find the help you need in your community.',
    stats: [
      { value: '5', label: 'Active Requests', icon: <FiShoppingBag className="text-emerald-500" /> },
      { value: '12', label: 'Completed', icon: <FiCheckCircle className="text-blue-500" /> },
      { value: '2', label: 'Pending', icon: <FiAlertCircle className="text-yellow-500" /> },
      { value: '3', label: 'Available Today', icon: <RiHandHeartLine className="text-green-500" /> }
    ],
    quickActions: [
      { label: 'Create New Request', icon: <FiShoppingBag className="text-emerald-500" />, path: '/new-request' },
      { label: 'My Requests', icon: <FiCheckCircle className="text-blue-500" />, path: '/my-requests' },
      { label: 'Receipt History', icon: <FiClock className="text-purple-500" />, path: '/receipt-history' }
    ],
    recentItems: [
      { id: 1, category: 'Food', item: 'Fresh groceries', meta: '0.5 miles', status: 'Available now' },
      { id: 2, category: 'Clothing', item: 'Winter coats', meta: '1.2 miles', status: 'Until 5 PM' },
      { id: 3, category: 'Furniture', item: 'Dining table', meta: '2.5 miles', status: 'Available tomorrow' }
    ],
    tabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'nearby', label: 'Nearby Help' },
      { id: 'history', label: 'Your History' }
    ],
    nearbyDonations: [
      { id: 1, category: 'Food', items: 'Fresh produce', distance: '0.3 miles', pickupTime: 'Today 2-4 PM' },
      { id: 2, category: 'Furniture', items: 'Sofa, chairs', distance: '1.7 miles', pickupTime: 'Tomorrow 10-12' }
    ],
    pickupTips: [
      { id: 1, title: 'Preparing for Pickup', content: 'What to bring and how to prepare for item collection.' },
      { id: 2, title: 'Transport Options', content: 'Local services that can help with large item transport.' }
    ],
    communityResources: [
      { id: 1, name: 'Food Assistance Program', type: 'Government', contact: '555-1234' },
      { id: 2, name: 'Housing Support', type: 'Non-profit', contact: '555-5678' }
    ]
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
              style={{ color: '#059669' }}
            >
              Browse Available Donations
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
            {/* Available Items Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center">
                  <RiHandHeartLine className="mr-2 text-emerald-500" />
                  Available Near You
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {config.recentItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 hover:bg-gray-50 transition"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{item.category}</p>
                          <p className="text-sm text-gray-600">{item.item}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{item.meta}</p>
                          <p className="text-xs text-gray-500">{item.status}</p>
                        </div>
                      </div>
                      <button className="mt-3 w-full py-2 bg-emerald-50 text-emerald-600 rounded-lg font-medium hover:bg-opacity-80 transition text-sm">
                        Request Item
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200 text-center">
                <button className="text-emerald-600 hover:opacity-80 font-medium">
                  View All Donations
                </button>
              </div>
            </div>

            {/* Nearby Donations */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold flex items-center">
                  <FiMapPin className="mr-2 text-blue-500" />
                  Nearby Donations
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.nearbyDonations.map(donation => (
                  <div key={donation.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                        <RiHandHeartLine className="text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-medium">{donation.category}</p>
                        <p className="text-sm text-gray-600">{donation.items}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Distance:</span> {donation.distance}
                      </div>
                      <div>
                        <span className="text-gray-500">Pickup:</span> {donation.pickupTime}
                      </div>
                    </div>
                    <button className="mt-3 w-full py-2 bg-emerald-50 text-emerald-600 rounded-lg font-medium hover:bg-opacity-80 transition text-sm">
                      Reserve Items
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions and Secondary Content */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold flex items-center">
                  <FiShoppingBag className="mr-2 text-emerald-500" />
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
                    className="w-full flex items-center justify-between p-4 bg-emerald-50 rounded-lg transition hover:bg-opacity-80"
                  >
                    <span className="font-medium">{action.label}</span>
                    {action.icon}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Community Resources */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold flex items-center">
                  <RiCommunityLine className="mr-2 text-blue-500" />
                  Community Resources
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {config.communityResources.map(resource => (
                    <li key={resource.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{resource.name}</p>
                        <p className="text-sm text-gray-600">{resource.type}</p>
                      </div>
                      <a href={`tel:${resource.contact}`} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition">
                        Call
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Helpful Resources */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold flex items-center">
                  <FiMessageSquare className="mr-2 text-gray-500" />
                  Helpful Resources
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {config.pickupTips.map(tip => (
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

export default RecipientLanding;