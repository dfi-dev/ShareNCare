import { useState } from 'react';
import { motion } from 'framer-motion';
import HeroHeader from '../../components/UI/HeroHeader';
import { Droplet, Gift } from 'lucide-react';

const DonationPortal = () => {
  const [donationType, setDonationType] = useState('blood');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    bloodType: 'A+',
    itemType: 'Clothing',
    quantity: 1,
    location: '',
    urgency: 'medium',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        name: '',
        contact: '',
        bloodType: 'A+',
        itemType: 'Clothing',
        quantity: 1,
        location: '',
        urgency: 'medium',
        message: ''
      });
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };
  const urgencyOptions = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <HeroHeader
          title="Make a Impact on Other's Life"
          subtitle={`${donationType === "blood" ? "Blood Donation" : "General Donation"} Portal`}
          description="Whether it’s blood or essential items, your donation matters."
          size="text-3xl md:text-4xl"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-6"
        >
          <div className="relative inline-flex bg-white rounded-md border border-gray-200 p-1 overflow-hidden">
            {['blood', 'general'].map((type) => {
              const isActive = donationType === type;
              const isBlood = type === 'blood';
              const Icon = isBlood ? Droplet : Gift;

              return (
                <button
                  key={type}
                  onClick={() => setDonationType(type)}
                  className="relative z-10 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-[8px] transition-colors duration-200 ease-in-out"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 rounded-[8px] ${isBlood ? 'bg-red-600' : 'bg-indigo-600'
                        } shadow`}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 flex items-center gap-2 ${isActive
                        ? 'text-white'
                        : isBlood
                          ? 'text-red-600'
                          : 'text-indigo-600'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {isBlood ? 'Blood Donation' : 'General Donation'}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.form
  onSubmit={handleSubmit}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="bg-white rounded-xl shadow-md p-6 space-y-6"
>
  {/* Personal Info */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <InputField
      label="Your Name *"
      id="name"
      value={formData.name}
      onChange={handleChange}
      inputClass="focus:ring-blue-500 focus:border-blue-500"
    />
    <InputField
      label="Contact Info *"
      id="contact"
      placeholder="Phone or Email"
      value={formData.contact}
      onChange={handleChange}
      inputClass="focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  {/* Donation Specific Fields */}
  {donationType === 'blood' ? (
    <>
      {/* Blood Type + Urgency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Blood Group *"
          id="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          inputClass="focus:ring-blue-500 focus:border-blue-500"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Level *</label>
          <div className="grid grid-cols-3 gap-2">
            {urgencyOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer"
              >
                <input
                  type="radio"
                  name="urgency"
                  value={option.value}
                  checked={formData.urgency === option.value}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <InputField
        label="Hospital Name / Location"
        id="hospital"
        placeholder="Optional if not admitted"
        value={formData.hospital}
        onChange={handleChange}
        inputClass="focus:ring-blue-500 focus:border-blue-500"
      />
    </>
  ) : (
    // General Donation Fields
    <GeneralFields
      formData={formData}
      handleChange={handleChange}
      inputClass="focus:ring-blue-500 focus:border-blue-500"
    />
  )}

  {/* Common Location */}
  <InputField
    label="Location (City/Area) *"
    id="location"
    value={formData.location}
    onChange={handleChange}
    inputClass="focus:ring-blue-500 focus:border-blue-500"
  />

  {/* Message */}
  <div>
    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
      Additional Details
    </label>
    <textarea
      id="message"
      name="message"
      rows={3}
      value={formData.message}
      onChange={handleChange}
      placeholder="Any special notes for recipients?"
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  {/* Submit Button */}
  <div>
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full flex justify-center items-center py-2 px-4 text-sm font-medium rounded-md text-white transition 
        ${donationType === 'blood' ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'} 
        ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isSubmitting ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Submitting...
        </>
      ) : (
        `Donate ${donationType === 'blood' ? 'Blood' : 'Items'}`
      )}
    </button>
  </div>
</motion.form>

      </motion.div>
    </div>
  );
};

const InputField = ({ label, id, value, onChange, placeholder = '', inputClass = '' }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${inputClass}`}
    />
  </div>
);


const BloodFields = ({ formData, handleChange, urgencyOptions }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 mb-1">
        Blood Type *
      </label>
      <select
        id="bloodType"
        name="bloodType"
        value={formData.bloodType}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
      >
        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Level *</label>
      <div className="grid grid-cols-3 gap-2">
        {urgencyOptions.map((level) => (
          <label key={level} className="flex items-center text-sm">
            <input
              type="radio"
              name="urgency"
              value={level}
              checked={formData.urgency === level}
              onChange={handleChange}
              className="h-4 w-4 text-red-600 focus:ring-red-500"
            />
            <span className="ml-2 capitalize">{level}</span>
          </label>
        ))}
      </div>
    </div>
  </div>
);

const GeneralFields = ({ formData, handleChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label htmlFor="itemType" className="block text-sm font-medium text-gray-700 mb-1">
        Item Type *
      </label>
      <select
        id="itemType"
        name="itemType"
        value={formData.itemType}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      >
        {['Clothing', 'Food', 'School Supplies', 'Books', 'Other'].map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
        Quantity *
      </label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        min="1"
        value={formData.quantity}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  </div>
);

export default DonationPortal;
