import React, { useState } from 'react';
import {
  FiUsers, FiBarChart2, FiFileText, FiAlertTriangle,
  FiMessageSquare, FiClock, FiAlertCircle, FiCheckCircle
} from 'react-icons/fi';
import { RiTeamLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCounter from '../../components/AnimatedCounter';

const AdminLanding = ({ userName = 'Admin' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showImpactVisualization, setShowImpactVisualization] = useState(false);

  const config = {
    color: 'from-blue-500 to-cyan-500',
    lightColor: 'bg-blue-50 text-blue-600',
    icon: <RiTeamLine className="text-blue-500" />,
    welcomeTitle: 'Admin Dashboard',
    welcomeSubtitle: 'Manage the platform and monitor activity.',
    stats: [
      { value: '1,248', label: 'Total Users', icon: <FiUsers className="text-blue-500" /> },
      { value: '342', label: 'New This Month', icon: <FiUsers className="text-green-500" /> },
      { value: '5,678', label: 'Total Donations', icon: <FiBarChart2 className="text-purple-500" /> },
      { value: '23', label: 'Pending Actions', icon: <FiAlertTriangle className="text-yellow-500" /> }
    ],
    quickActions: [
      { label: 'User Management', icon: <FiUsers className="text-blue-500" />, path: '/manage-users' },
      { label: 'Content Moderation', icon: <FiFileText className="text-purple-500" />, path: '/moderation' },
      { label: 'Platform Analytics', icon: <FiBarChart2 className="text-green-500" />, path: '/analytics' }
    ],
    recentItems: [
      { id: 1, user: 'Alex Johnson', action: 'New donation posted', meta: '10 min ago' },
      { id: 2, user: 'Sarah Miller', action: 'Request approved', meta: '25 min ago' },
      { id: 3, user: 'Jamie Smith', action: 'Account flagged', meta: '1 hour ago' }
    ],
    tabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'moderation', label: 'Moderation' },
      { id: 'insights', label: 'Insights' }
    ],
    systemAlerts: [
      { id: 1, type: 'Maintenance', message: 'Scheduled downtime tonight', severity: 'medium' },
      { id: 2, type: 'New Feature', message: 'Reporting tools updated', severity: 'low' }
    ],
    recentSignups: [
      { id: 1, name: 'Taylor Swift', role: 'Donor', date: 'Today' },
      { id: 2, name: 'John Doe', role: 'Recipient', date: 'Yesterday' }
    ],
    performanceMetrics: [
      { metric: 'Match Rate', value: '78%', trend: 'up' },
      { metric: 'Avg. Response Time', value: '2.4h', trend: 'down' }
    ]
  };

  const renderImpactVisualization = () => {
    if (!showImpactVisualization) return null;

    const impactData = [
      { label: 'Total Connections', value: 1248, color: 'bg-blue-400' },
      { label: 'Successful Matches', value: 876, color: 'bg-green-400' },
      { label: 'Active Communities', value: 14, color: 'bg-cyan-400' }
    ];

    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="mt-6 bg-white rounded-xl p-6 shadow-sm overflow-hidden"
      >
        <h3 className="text-lg font-semibold mb-4">Platform Impact Visualization</h3>
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
                  style={{ height: `${Math.min(item.value / 20, 50)}px` }}
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
            <div className="flex space-x-3">
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition">
                View Analytics
              </button>
              <button className="bg-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition">
                Manage Users
              </button>
            </div>
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
                  <FiBarChart2 className="mr-2 text-blue-500" />
                  Recent Activity
                </h2>
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
                        <p className="font-medium">{item.user}</p>
                        <p className="text-sm text-gray-600">{item.action}</p>
                      </div>
                      <p className="text-sm text-gray-500">{item.meta}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200 text-center">
                <button className="text-blue-600 hover:opacity-80 font-medium">
                  View All Activity
                </button>
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold flex items-center">
                  <FiAlertTriangle className="mr-2 text-yellow-500" />
                  System Alerts
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {config.systemAlerts.map(alert => (
                    <li key={alert.id} className="flex items-start">
                      <div className={`p-2 rounded-lg mr-3 ${alert.severity === 'high' ? 'bg-red-100 text-red-500' :
                          alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-500' : 'bg-blue-100 text-blue-500'
                        }`}>
                        <FiAlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">{alert.type}</p>
                        <p className="text-sm text-gray-600">{alert.message}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions and Secondary Content */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold flex items-center">
                  <FiFileText className="mr-2 text-blue-500" />
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
                    className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-lg transition hover:bg-opacity-80"
                  >
                    <span className="font-medium">{action.label}</span>
                    {action.icon}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recent Signups */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold flex items-center">
                  <FiUsers className="mr-2 text-blue-500" />
                  Recent Signups
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {config.recentSignups.map(user => (
                    <li key={user.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600 capitalize">{user.role}</p>
                      </div>
                      <div className="text-sm text-gray-500">{user.date}</div>
                    </li>
                  ))}
                </ul>
                <button className="mt-4 w-full py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-opacity-80 transition">
                  View All Users
                </button>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold flex items-center">
                  <FiMessageSquare className="mr-2 text-gray-500" />
                  Performance Metrics
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {config.performanceMetrics.map(metric => (
                    <div key={metric.metric} className="flex justify-between items-center">
                      <span className="font-medium">{metric.metric}</span>
                      <div className="flex items-center">
                        <span className="mr-2">{metric.value}</span>
                        <span className={`p-1 rounded ${metric.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                          {metric.trend === 'up' ? '↑' : '↓'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLanding;