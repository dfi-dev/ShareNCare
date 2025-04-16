import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DonationRequest = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    type: 'general',
    donationType: '',
    bloodType: 'A+',
    quantity: 1,
    purpose: '',
    urgency: 'medium',
    message: '',
    contactInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        type: 'general',
        donationType: '',
        bloodType: 'A+',
        quantity: 1,
        purpose: '',
        urgency: 'medium',
        message: '',
        contactInfo: ''
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold text-indigo-900 mb-2"
          >
            Request a Donation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-indigo-600"
          >
            Fill out the form to request blood or general donations
          </motion.p>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => {
                setActiveTab('general');
                setFormData(prev => ({ ...prev, type: 'general' }));
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'general' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              General Donation
            </button>
            <button
              onClick={() => {
                setActiveTab('blood');
                setFormData(prev => ({ ...prev, type: 'blood' }));
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'blood' 
                  ? 'bg-red-600 text-white' 
                  : 'text-red-600 hover:bg-red-50'
              }`}
            >
              Blood Donation
            </button>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="p-6">
            {/* Donation Type Specific Fields */}
            {activeTab === 'general' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="donationType" className="block text-sm font-medium text-gray-700 mb-1">
                    What do you need? *
                  </label>
                  <input
                    type="text"
                    id="donationType"
                    name="donationType"
                    value={formData.donationType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., School supplies, Winter clothes, Food items"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Type Needed *
                  </label>
                  <select
                    id="bloodType"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Urgency Level *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['high', 'medium', 'low'].map(level => (
                      <label key={level} className="flex items-center">
                        <input
                          type="radio"
                          name="urgency"
                          value={level}
                          checked={formData.urgency === level}
                          onChange={handleChange}
                          className="h-4 w-4 text-red-600 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Common Fields */}
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity Needed *
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {activeTab === 'blood' ? 'Number of pints needed' : 'Number of items/units needed'}
                </p>
              </div>

              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose of Donation *
                </label>
                <textarea
                  id="purpose"
                  name="purpose"
                  rows={3}
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Briefly explain what the donation will be used for"
                ></textarea>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Any special instructions or details for donors"
                ></textarea>
              </div>

              <div>
                <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Information *
                </label>
                <input
                  type="text"
                  id="contactInfo"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Phone number or email where donors can reach you"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  activeTab === 'blood' ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  activeTab === 'blood' ? 'focus:ring-red-500' : 'focus:ring-indigo-500'
                } transition-colors ${isSubmitting ? 'opacity-70' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  `Submit ${activeTab === 'blood' ? 'Blood' : 'Donation'} Request`
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`mt-4 p-4 rounded-md ${
                activeTab === 'blood' ? 'bg-red-50 border border-red-200' : 'bg-indigo-50 border border-indigo-200'
              }`}
            >
              <div className="flex">
                <div className={`flex-shrink-0 ${
                  activeTab === 'blood' ? 'text-red-400' : 'text-indigo-400'
                }`}>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className={`ml-3 ${
                  activeTab === 'blood' ? 'text-red-800' : 'text-indigo-800'
                }`}>
                  <h3 className="text-sm font-medium">
                    Request submitted successfully!
                  </h3>
                  <div className="mt-2 text-sm">
                    <p>
                      Your {activeTab === 'blood' ? 'blood donation' : 'donation'} request has been received. 
                      Donors will be able to see your request shortly.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === 'blood' ? 'About Blood Donations' : 'About General Donations'}
            </h3>
            {activeTab === 'blood' ? (
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  Blood donations are critical for medical treatments, emergency care, and saving lives. 
                  When requesting blood, please be accurate about the blood type and urgency level.
                </p>
                <p>
                  High urgency requests are typically for immediate medical needs, while medium and low 
                  urgency requests may be for scheduled treatments or reserves.
                </p>
              </div>
            ) : (
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  General donations can include items like clothing, food, school supplies, or other 
                  necessities. Be specific about what you need and how it will be used.
                </p>
                <p>
                  The more details you provide about your needs, the better donors can understand 
                  how to help.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DonationRequest;