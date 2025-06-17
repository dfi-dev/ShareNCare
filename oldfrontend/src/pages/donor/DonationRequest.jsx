import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroHeader from '../../components/UI/HeroHeader';

const DonationRequest = () => {
  // Sample data for both types of requests
  const [requests, setRequests] = useState({
    general: [
      {
        id: 1,
        type: 'general',
        recipientName: "Sarah Johnson",
        organization: "Hope for Children Foundation",
        donationType: "School supplies",
        quantity: 50,
        purpose: "For underprivileged children in downtown schools",
        date: "2023-05-15",
        status: "pending",
        urgency: null,
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        message: "We urgently need these supplies before the new semester starts."
      },
      {
        id: 2,
        type: 'general',
        recipientName: "Michael Chen",
        organization: "Green Earth Initiative",
        donationType: "Gardening tools",
        quantity: 20,
        purpose: "Urban community garden project",
        date: "2023-05-10",
        status: "pending",
        urgency: null,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        message: "Our volunteers need proper tools to maintain the gardens."
      }
    ],
    blood: [
      {
        id: 3,
        type: 'blood',
        recipientName: "Amina Diallo",
        organization: "City General Hospital",
        bloodType: "O+",
        quantity: 2, // in pints
        purpose: "Emergency surgery for accident victim",
        date: "2023-05-05",
        status: "pending",
        urgency: "high",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg",
        message: "Patient requires immediate transfusion before surgery."
      },
      {
        id: 4,
        type: 'blood',
        recipientName: "David Wilson",
        organization: "Regional Blood Center",
        bloodType: "AB-",
        quantity: 1,
        purpose: "Regular transfusion for thalassemia patient",
        date: "2023-05-03",
        status: "pending",
        urgency: "medium",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        message: "Monthly scheduled transfusion for long-term patient."
      }
    ]
  });

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [filter, setFilter] = useState('all');

  const handleApprove = (id, type) => {
    setIsProcessing({ action: 'approve', id, type });
    setTimeout(() => {
      setRequests(prev => ({
        ...prev,
        [type]: prev[type].map(req =>
          req.id === id ? { ...req, status: "approved", approvedDate: new Date().toISOString() } : req
        )
      }));
      setIsProcessing(false);
      setSelectedRequest(null);
    }, 1500);
  };

  const handleReject = (id, type) => {
    setIsProcessing({ action: 'reject', id, type });
    setTimeout(() => {
      setRequests(prev => ({
        ...prev,
        [type]: prev[type].map(req =>
          req.id === id ? { ...req, status: "rejected" } : req
        )
      }));
      setIsProcessing(false);
      setSelectedRequest(null);
    }, 1500);
  };

  const handleComplete = (id, type) => {
    setIsProcessing({ action: 'complete', id, type });
    setTimeout(() => {
      setRequests(prev => ({
        ...prev,
        [type]: prev[type].map(req =>
          req.id === id ? { ...req, status: "completed", completedDate: new Date().toISOString() } : req
        )
      }));
      setIsProcessing(false);
      setSelectedRequest(null);
    }, 1500);
  };

  const filteredRequests = (type) => {
    const reqs = requests[type];
    if (filter === 'all') return reqs;
    return reqs.filter(req => req.status === filter);
  };

  const pendingCounts = {
    general: requests.general.filter(req => req.status === "pending").length,
    blood: requests.blood.filter(req => req.status === "pending").length
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <HeroHeader
          title="Donation Requests"
          subtitle="Requests"
          description="Review and manage donation requests from recipients"
        />


        {/* Tabs and Filter */}
        {/* Tabs and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 mb-6 overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-200/50 px-1 pt-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('general')}
              className={`py-3 px-5 font-medium text-sm rounded-t-lg transition-all relative ${activeTab === 'general'
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-indigo-500'
                }`}
            >
              General Donations
              {activeTab === 'general' && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-t-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('blood')}
              className={`py-3 px-5 font-medium text-sm rounded-t-lg transition-all relative ${activeTab === 'blood'
                ? 'text-red-600'
                : 'text-gray-500 hover:text-red-500'
                }`}
            >
              Blood Donations
              {activeTab === 'blood' && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-t-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 gap-4">
            <div className="flex flex-wrap gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter('all')}
                className={`text-xs px-4 py-2 rounded-xl font-medium transition-all shadow-sm ${filter === 'all'
                  ? 'bg-indigo-600 text-white shadow-indigo-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                All
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter('pending')}
                className={`text-xs px-4 py-2 rounded-xl font-medium transition-all shadow-sm ${filter === 'pending'
                  ? 'bg-yellow-500 text-white shadow-yellow-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                Pending
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter('approved')}
                className={`text-xs px-4 py-2 rounded-xl font-medium transition-all shadow-sm ${filter === 'approved'
                  ? 'bg-green-500 text-white shadow-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                Approved
              </motion.button>
            </div>

            <div className="text-xs text-gray-500 font-medium">
              Showing {filteredRequests(activeTab).length} {filter === 'all' ? '' : filter} requests
            </div>
          </div>
        </motion.div>

        {/* Request Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests(activeTab).length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100"
            >
              <div className={`${activeTab === 'blood' ? 'text-red-400' : 'text-indigo-400'} mb-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold ${activeTab === 'blood' ? 'text-red-800' : 'text-indigo-800'}`}>
                No {filter === 'all' ? '' : filter} requests found
              </h3>
              <p className={`mt-2 ${activeTab === 'blood' ? 'text-red-600' : 'text-indigo-600'}`}>
                {filter === 'pending' ? 'All requests have been processed' : 'No requests match your filter'}
              </p>
            </motion.div>
          ) : (
            filteredRequests(activeTab).map(request => (
              <motion.div
                key={`${request.type}-${request.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden cursor-pointer border-l-4 ${request.type === 'blood'
                  ? 'border-red-500 hover:shadow-red-100/50'
                  : 'border-indigo-500 hover:shadow-indigo-100/50'
                  } ${request.status === 'approved' ? 'bg-gradient-to-br from-green-50/50 to-white' : ''}`}
                onClick={() => setSelectedRequest(request)}
              >
                <div className="p-6">
                  {/* Header with avatar and urgency */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={request.avatar}
                          alt={request.recipientName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                        />
                        <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${request.type === 'blood' ? 'bg-red-500' : 'bg-indigo-500'}`}></span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{request.recipientName}</h3>
                        <p className="text-xs text-gray-500 font-medium">{request.organization}</p>
                      </div>
                    </div>
                    {request.type === 'blood' && request.urgency && (
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getUrgencyColor(request.urgency)} shadow-sm`}>
                        {request.urgency}
                      </span>
                    )}
                  </div>

                  {/* Purpose and status */}
                  <div className="mb-5">
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{request.purpose}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        Requested: <span className="font-medium text-gray-700">
                          {new Date(request.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium shadow-sm ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                          request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                        }`}>
                        {request.status}
                      </span>
                    </div>
                  </div>

                  {/* Details section */}
                  <div className="bg-gray-50/50 p-4 rounded-xl">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {request.type === 'blood' ? 'Blood Type' : 'Type'}
                        </p>
                        <p className={`mt-1 font-semibold ${request.type === 'blood' ? 'text-red-600' : 'text-indigo-600'}`}>
                          {request.type === 'blood' ? request.bloodType : request.donationType}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</p>
                        <p className="mt-1 font-semibold text-gray-800">
                          {request.quantity} {request.type === 'blood' ? 'pints' : 'units'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Request Detail Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedRequest(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl max-w-md w-full overflow-hidden border-l-4 ${selectedRequest.type === 'blood'
                  ? 'border-red-500'
                  : 'border-indigo-500'
                }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={selectedRequest.avatar}
                        alt={selectedRequest.recipientName}
                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                      />
                      <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${selectedRequest.type === 'blood' ? 'bg-red-500' : 'bg-indigo-500'
                        }`}></span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{selectedRequest.recipientName}</h3>
                      <p className="text-sm text-gray-600 font-medium">{selectedRequest.organization}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-5 mb-6">
                  {/* Type and Quantity */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50/70 p-3 rounded-xl">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {selectedRequest.type === 'blood' ? 'Blood Type' : 'Type'}
                      </p>
                      <p className={`mt-1 font-bold ${selectedRequest.type === 'blood'
                          ? 'text-red-600'
                          : 'text-indigo-600'
                        }`}>
                        {selectedRequest.type === 'blood'
                          ? selectedRequest.bloodType
                          : selectedRequest.donationType}
                      </p>
                    </div>
                    <div className="bg-gray-50/70 p-3 rounded-xl">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</p>
                      <p className="mt-1 font-bold text-gray-800">
                        {selectedRequest.quantity} {selectedRequest.type === 'blood' ? 'pints' : 'units'}
                      </p>
                    </div>
                  </div>

                  {/* Urgency (if blood) */}
                  {selectedRequest.type === 'blood' && (
                    <div className="bg-gray-50/70 p-3 rounded-xl">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</p>
                      <div className="mt-1">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${getUrgencyColor(selectedRequest.urgency)} shadow-sm`}>
                          {selectedRequest.urgency}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Purpose */}
                  <div className="bg-gray-50/70 p-3 rounded-xl">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</p>
                    <p className="mt-1 text-gray-700">{selectedRequest.purpose}</p>
                  </div>

                  {/* Message (if exists) */}
                  {selectedRequest.message && (
                    <div className="bg-gray-50/70 p-3 rounded-xl">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient's Note</p>
                      <div className="mt-1 italic text-gray-700">
                        "{selectedRequest.message}"
                      </div>
                    </div>
                  )}

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50/70 p-3 rounded-xl">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Requested</p>
                      <p className="mt-1 text-sm text-gray-700">
                        {new Date(selectedRequest.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    {selectedRequest.status === 'approved' && selectedRequest.approvedDate && (
                      <div className="bg-gray-50/70 p-3 rounded-xl">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Approved</p>
                        <p className="mt-1 text-sm text-gray-700">
                          {new Date(selectedRequest.approvedDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  {selectedRequest.status === 'pending' && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleReject(selectedRequest.id, selectedRequest.type)}
                        disabled={isProcessing}
                        className={`flex-1 py-2.5 px-4 rounded-xl border font-medium flex items-center justify-center space-x-2 transition-all ${selectedRequest.type === 'blood'
                            ? 'border-red-500 text-red-600 hover:bg-red-50'
                            : 'border-indigo-500 text-indigo-600 hover:bg-indigo-50'
                          } ${isProcessing ? 'opacity-50' : ''}`}
                      >
                        {isProcessing && isProcessing.id === selectedRequest.id && isProcessing.action === 'reject' ? (
                          <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Rejecting...</span>
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span>Reject</span>
                          </>
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleApprove(selectedRequest.id, selectedRequest.type)}
                        disabled={isProcessing}
                        className={`flex-1 py-2.5 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 text-white transition-all ${selectedRequest.type === 'blood'
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                          } ${isProcessing ? 'opacity-50' : ''}`}
                      >
                        {isProcessing && isProcessing.id === selectedRequest.id && isProcessing.action === 'approve' ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Approving...</span>
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Approve</span>
                          </>
                        )}
                      </motion.button>
                    </>
                  )}
                  {selectedRequest.status === 'approved' && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleComplete(selectedRequest.id, selectedRequest.type)}
                      disabled={isProcessing}
                      className={`flex-1 py-2.5 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium flex items-center justify-center space-x-2 transition-all ${isProcessing ? 'opacity-50' : ''
                        }`}
                    >
                      {isProcessing && isProcessing.id === selectedRequest.id && isProcessing.action === 'complete' ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Completing...</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Mark Completed</span>
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation animations */}
      <AnimatePresence>
        {isProcessing && isProcessing.action === 'approve' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.2 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`rounded-full p-8 shadow-xl ${requests[isProcessing.type].find(r => r.id === isProcessing.id)?.type === 'blood'
                ? 'bg-red-100'
                : 'bg-indigo-100'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke={
                requests[isProcessing.type].find(r => r.id === isProcessing.id)?.type === 'blood'
                  ? '#dc2626'
                  : '#4f46e5'
              }>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProcessing && isProcessing.action === 'reject' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.2 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-100 rounded-full p-8 shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProcessing && isProcessing.action === 'complete' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.2 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-green-100 rounded-full p-8 shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonationRequest;