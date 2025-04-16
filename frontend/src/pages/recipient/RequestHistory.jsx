import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RequestHistory = () => {
  // Sample data - in a real app, this would come from your API
  const [requests, setRequests] = useState({
    general: [
      {
        id: 1,
        type: 'general',
        donationType: "School supplies",
        quantity: 50,
        purpose: "For underprivileged children in downtown schools",
        requestDate: "2023-05-15",
        status: "approved",
        approvedDate: "2023-05-16",
        completedDate: null,
        donorName: "Education Foundation",
        donorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
        message: "Your request has been approved. We'll contact you for delivery details."
      },
      {
        id: 2,
        type: 'general',
        donationType: "Winter clothes",
        quantity: 30,
        purpose: "For homeless shelter residents",
        requestDate: "2023-05-10",
        status: "pending",
        approvedDate: null,
        completedDate: null,
        donorName: null,
        donorAvatar: null,
        message: "Your request is under review."
      }
    ],
    blood: [
      {
        id: 3,
        type: 'blood',
        bloodType: "O+",
        quantity: 2,
        purpose: "Emergency surgery for accident victim",
        urgency: "high",
        requestDate: "2023-05-05",
        status: "completed",
        approvedDate: "2023-05-05",
        completedDate: "2023-05-06",
        donorName: "City Blood Bank",
        donorAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
        message: "Blood donation successfully matched and delivered."
      }
    ]
  });

  const [activeTab, setActiveTab] = useState('all');
  const [expandedRequest, setExpandedRequest] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'approved':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'completed':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'rejected':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const filteredRequests = () => {
    if (activeTab === 'all') {
      return [...requests.general, ...requests.blood];
    }
    return requests[activeTab];
  };

  const getTypeBadge = (type) => {
    return (
      <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
        type === 'blood' ? 'bg-red-100 text-red-800' : 'bg-indigo-100 text-indigo-800'
      }`}>
        {type === 'blood' ? 'Blood' : 'General'}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-900 mb-1 md:mb-2">Your Donation Requests</h1>
          <p className="text-sm md:text-base text-indigo-600">Track the status of your requests</p>
        </div>

        {/* Tabs - Made responsive */}
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="inline-flex bg-white rounded-lg shadow-sm p-1 flex-wrap justify-center">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 md:px-4 md:py-2 text-xs sm:text-sm font-medium rounded-md ${
                activeTab === 'all' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`px-3 py-1 md:px-4 md:py-2 text-xs sm:text-sm font-medium rounded-md ${
                activeTab === 'general' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('blood')}
              className={`px-3 py-1 md:px-4 md:py-2 text-xs sm:text-sm font-medium rounded-md ${
                activeTab === 'blood' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Blood
            </button>
          </div>
        </div>

        {/* Request List */}
        <div className="space-y-3 md:space-y-4">
          {filteredRequests().length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-6 md:py-12 bg-white rounded-xl shadow-sm"
            >
              <div className="text-indigo-400 mb-3 md:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 md:h-16 w-12 md:w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-indigo-800">No requests found</h3>
              <p className="text-sm md:text-base text-indigo-600 mt-1 md:mt-2">
                {activeTab === 'all' 
                  ? "You haven't made any requests yet." 
                  : `No ${activeTab === 'blood' ? 'blood' : 'general'} requests found.`}
              </p>
            </motion.div>
          ) : (
            filteredRequests().map(request => (
              <motion.div
                key={`${request.type}-${request.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                  expandedRequest === request.id ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <div 
                  className="p-4 md:p-5 cursor-pointer"
                  onClick={() => setExpandedRequest(expandedRequest === request.id ? null : request.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="flex-shrink-0">
                        {getStatusIcon(request.status)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                          {request.type === 'blood' ? `${request.bloodType} Blood` : request.donationType}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">{request.purpose}</p>
                      </div>
                    </div>
                    <div className="flex sm:items-center justify-end sm:justify-normal gap-2">
                      {getTypeBadge(request.type)}
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(request.status)} whitespace-nowrap`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedRequest === request.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                          <div>
                            <label className="text-xs font-medium text-gray-500">Request Date</label>
                            <p className="text-xs sm:text-sm text-gray-900">
                              {new Date(request.requestDate).toLocaleDateString()}
                            </p>
                          </div>
                          {request.approvedDate && (
                            <div>
                              <label className="text-xs font-medium text-gray-500">Approved Date</label>
                              <p className="text-xs sm:text-sm text-gray-900">
                                {new Date(request.approvedDate).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                          {request.completedDate && (
                            <div>
                              <label className="text-xs font-medium text-gray-500">Completed Date</label>
                              <p className="text-xs sm:text-sm text-gray-900">
                                {new Date(request.completedDate).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                          {request.type === 'blood' && (
                            <div>
                              <label className="text-xs font-medium text-gray-500">Urgency</label>
                              <p className="text-xs sm:text-sm text-gray-900 capitalize">
                                {request.urgency}
                              </p>
                            </div>
                          )}
                        </div>

                        {request.donorName && (
                          <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-4">
                            <div className="flex-shrink-0">
                              <img 
                                src={request.donorAvatar || "https://ui-avatars.com/api/?background=random&name="+request.donorName} 
                                alt={request.donorName}
                                className="h-8 md:h-10 w-8 md:w-10 rounded-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-500">Donor</p>
                              <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                                {request.donorName}
                              </p>
                            </div>
                          </div>
                        )}

                        {request.message && (
                          <div className="mt-3 md:mt-4">
                            <label className="text-xs font-medium text-gray-500">Status Message</label>
                            <div className="mt-1 p-2 md:p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs sm:text-sm text-gray-700">{request.message}</p>
                            </div>
                          </div>
                        )}

                        {request.status === 'approved' && !request.completedDate && (
                          <div className="mt-3 md:mt-4">
                            <button className="w-full py-1 md:py-2 px-3 md:px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium rounded-md transition-colors">
                              Contact Donor
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* Status Legend - Made more compact for mobile */}
        <div className="mt-6 md:mt-8 bg-white rounded-xl shadow-sm p-3 md:p-4">
          <h3 className="text-xs md:text-sm font-medium text-gray-900 mb-2 md:mb-3">Status Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            <div className="flex items-center space-x-1 md:space-x-2">
              <span className="h-2 md:h-3 w-2 md:w-3 rounded-full bg-yellow-500"></span>
              <span className="text-xs md:text-sm text-gray-600">Pending</span>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2">
              <span className="h-2 md:h-3 w-2 md:w-3 rounded-full bg-blue-500"></span>
              <span className="text-xs md:text-sm text-gray-600">Approved</span>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2">
              <span className="h-2 md:h-3 w-2 md:w-3 rounded-full bg-green-500"></span>
              <span className="text-xs md:text-sm text-gray-600">Completed</span>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2">
              <span className="h-2 md:h-3 w-2 md:w-3 rounded-full bg-red-500"></span>
              <span className="text-xs md:text-sm text-gray-600">Rejected</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RequestHistory;