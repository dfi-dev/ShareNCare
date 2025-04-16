import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTint, FaGift } from 'react-icons/fa';
import InfoCard from '../UI/InfoCard';
import { FaCheckCircle, FaClock, FaHourglassHalf } from 'react-icons/fa';



const CardList = ({ filteredDonations, expandedDonation, setExpandedDonation }) => {

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'scheduled':
        return <FaClock className="text-yellow-500" />;
      case 'pending':
        return <FaHourglassHalf className="text-gray-500" />;
      default:
        return null;
    }
  };
  return (
    <div className="space-y-4">
      {filteredDonations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-100"
        >
          <div className="text-indigo-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-indigo-800">No donations found</h3>
          <p className="text-indigo-600 mt-2">Try adjusting your filters to see more results</p>
        </motion.div>
      ) : (
        filteredDonations.map((donation, index) => {
          const isExpanded = expandedDonation === donation.id;

          return (
            <motion.div
              key={donation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200 ${isExpanded ? 'ring-2 ring-indigo-300' : ''}`}
            >
              <div
                className="p-5 cursor-pointer"
                onClick={() => setExpandedDonation(isExpanded ? null : donation.id)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={donation.avatar}
                        alt={donation.recipient}
                        className="h-12 w-12 rounded-full object-cover border-2 border-white shadow"
                      />
                      <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${donation.type === 'blood' ? 'bg-red-500' : 'bg-indigo-500'}`}></span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{donation.recipient}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(donation.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${donation.type === 'blood' ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'}`}>
                      {donation.type === 'blood' ? <FaTint className="text-red-500" /> : <FaGift className="text-indigo-500" />}
                      {donation.type === 'blood' ? 'Blood' : 'Item'}
                    </span>

                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${donation.status === 'completed' ? 'bg-green-100 text-green-700' :
                      donation.status === 'scheduled' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                      {getStatusIcon(donation.status)}
                      {donation.status}
                    </span>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-gray-100/50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <InfoCard label="Donation Date" value={new Date(donation.date).toLocaleDateString('en-US', {
                          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                        })} />
                        <InfoCard label="Status" value={donation.status} icon={getStatusIcon(donation.status)} />
                        {donation.type === 'blood' ? (
                          <InfoCard label="Blood Type" value={donation.bloodType} />
                        ) : (
                          <InfoCard label="Item Donated" value={donation.item} />
                        )}
                        <InfoCard
                          label={donation.type === 'blood' ? 'Pints Donated' : 'Quantity Donated'}
                          value={donation.type === 'blood' ? donation.pints : donation.quantity}
                        />
                      </div>

                      {donation.status === 'scheduled' && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-sm font-medium rounded-lg shadow-md transition-all duration-200"
                        >
                          View Appointment Details
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })
      )}
    </div>
  );
};

export default CardList;
