import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AvailableDonations = () => {
  // Sample donation data
  const [donations, setDonations] = useState([
    {
      id: 1,
      type: 'blood',
      bloodType: 'O+',
      quantity: 2,
      postedDate: '2023-06-15T10:30:00',
      expiryDate: '2023-06-22',
      hospital: 'City General Hospital',
      distance: '3.2 km',
      urgency: 'high',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      id: 2,
      type: 'general',
      category: 'Clothing',
      item: 'Winter Coats',
      quantity: 8,
      postedDate: '2023-06-14T15:45:00',
      expiryDate: '2023-07-14',
      organization: 'Hope Shelter',
      distance: '5.7 km',
      condition: 'Like new',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
      id: 3,
      type: 'blood',
      bloodType: 'AB-',
      quantity: 1,
      postedDate: '2023-06-15T08:15:00',
      expiryDate: '2023-06-25',
      hospital: 'Regional Blood Center',
      distance: '12.1 km',
      urgency: 'medium',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      id: 4,
      type: 'general',
      category: 'School Supplies',
      item: 'Backpacks with supplies',
      quantity: 15,
      postedDate: '2023-06-13T09:20:00',
      expiryDate: null,
      organization: 'Community School',
      distance: '7.3 km',
      condition: 'New',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    {
      id: 5,
      type: 'blood',
      bloodType: 'B+',
      quantity: 1,
      postedDate: '2023-06-15T14:10:00',
      expiryDate: '2023-06-29',
      hospital: 'Childrens Hospital',
      distance: '8.5 km',
      urgency: 'low',
      avatar: 'https://randomuser.me/api/portraits/women/54.jpg'
    }
  ]);

  const [filters, setFilters] = useState({
    type: 'all',
    sort: 'latest',
    distance: 'all',
    urgency: 'all'
  });

  const [selectedDonation, setSelectedDonation] = useState(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Filter and sort donations
  const filteredDonations = donations
    .filter(donation => {
      return (
        (filters.type === 'all' || donation.type === filters.type) &&
        (filters.distance === 'all' || parseInt(donation.distance) <= parseInt(filters.distance)) &&
        (filters.urgency === 'all' || 
          (donation.type === 'blood' ? donation.urgency === filters.urgency : true))
      );
    })
    .sort((a, b) => {
      if (filters.sort === 'latest') {
        return new Date(b.postedDate) - new Date(a.postedDate);
      } else if (filters.sort === 'expiring') {
        if (!a.expiryDate) return 1;
        if (!b.expiryDate) return -1;
        return new Date(a.expiryDate) - new Date(b.expiryDate);
      } else {
        return parseInt(a.distance) - parseInt(b.distance);
      }
    });

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    return type === 'blood' ? 'bg-red-100 text-red-800' : 'bg-indigo-100 text-indigo-800';
  };

  const handleRequest = (donation) => {
    setSelectedDonation(donation);
    setShowRequestModal(true);
  };

  const submitRequest = () => {
    // Simulate API call
    setTimeout(() => {
      setShowRequestModal(false);
      setRequestMessage('');
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-2">Available Donations</h1>
          <p className="text-indigo-600">Find and request donations that match your needs</p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Donation Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value="all">All Types</option>
                <option value="blood">Blood</option>
                <option value="general">Items</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={filters.sort}
                onChange={(e) => setFilters({...filters, sort: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value="latest">Latest</option>
                <option value="expiring">Expiring Soon</option>
                <option value="distance">Nearest</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Distance</label>
              <select
                value={filters.distance}
                onChange={(e) => setFilters({...filters, distance: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value="all">Any Distance</option>
                <option value="5">Within 5 km</option>
                <option value="10">Within 10 km</option>
                <option value="20">Within 20 km</option>
              </select>
            </div>

            {filters.type === 'blood' || filters.type === 'all' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                <select
                  value={filters.urgency}
                  onChange={(e) => setFilters({...filters, urgency: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                  <option value="all">Any Urgency</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  disabled
                >
                  <option>Any Condition</option>
                </select>
              </div>
            )}
          </div>
        </motion.div>

        {/* Donation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDonations.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm"
            >
              <div className="text-indigo-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-indigo-800">No donations available</h3>
              <p className="text-indigo-600 mt-2">Try adjusting your filters or check back later</p>
            </motion.div>
          ) : (
            filteredDonations.map((donation, index) => (
              <motion.div
                key={donation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={donation.avatar} 
                        alt={donation.type === 'blood' ? donation.hospital : donation.organization}
                        className="h-12 w-12 rounded-full object-cover border-2 border-white shadow"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {donation.type === 'blood' ? donation.hospital : donation.organization}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {new Date(donation.postedDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(donation.type)}`}>
                      {donation.type === 'blood' ? 'Blood' : 'Item'}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {donation.type === 'blood' ? `${donation.bloodType} Blood` : donation.item}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {donation.type === 'blood' ? 
                        `${donation.quantity} pint${donation.quantity > 1 ? 's' : ''} available` : 
                        `${donation.quantity} unit${donation.quantity > 1 ? 's' : ''} available`}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                      {donation.distance} away
                    </span>
                    {donation.type === 'blood' ? (
                      <span className={`text-xs px-2 py-1 rounded-full ${getUrgencyColor(donation.urgency)}`}>
                        {donation.urgency} urgency
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                        {donation.condition}
                      </span>
                    )}
                    {donation.expiryDate && (
                      <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                        Expires {new Date(donation.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleRequest(donation)}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                      donation.type === 'blood' ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'
                    } transition-colors`}
                  >
                    Request Donation
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Request Modal */}
      <AnimatePresence>
        {showRequestModal && selectedDonation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden ${
                selectedDonation.type === 'blood' ? 'border-t-4 border-red-500' : 'border-t-4 border-indigo-500'
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Request Donation</h3>
                    <p className="text-sm text-gray-500">
                      {selectedDonation.type === 'blood' ? 
                        `${selectedDonation.bloodType} Blood from ${selectedDonation.hospital}` : 
                        `${selectedDonation.item} from ${selectedDonation.organization}`}
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowRequestModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message to Donor
                    </label>
                    <textarea
                      value={requestMessage}
                      onChange={(e) => setRequestMessage(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder={`Explain why you need this ${selectedDonation.type === 'blood' ? 'blood donation' : 'item'}`}
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="text-gray-500">Quantity Available</label>
                      <p className="font-medium">
                        {selectedDonation.quantity} {selectedDonation.type === 'blood' ? 'pints' : 'units'}
                      </p>
                    </div>
                    <div>
                      <label className="text-gray-500">Distance</label>
                      <p className="font-medium">{selectedDonation.distance} away</p>
                    </div>
                  </div>

                  {selectedDonation.expiryDate && (
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <div className="flex items-center text-amber-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium">
                          Expires {new Date(selectedDonation.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    onClick={submitRequest}
                    disabled={!requestMessage.trim()}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                      selectedDonation.type === 'blood' ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'
                    } transition-colors ${!requestMessage.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
              selectedDonation?.type === 'blood' ? 'bg-red-50 border border-red-200' : 'bg-indigo-50 border border-indigo-200'
            }`}
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 ${
                selectedDonation?.type === 'blood' ? 'text-red-400' : 'text-indigo-400'
              }`}>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${
                  selectedDonation?.type === 'blood' ? 'text-red-800' : 'text-indigo-800'
                }`}>
                  Request submitted successfully!
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvailableDonations;