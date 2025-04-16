import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiMail, FiMapPin, FiPhone, FiEdit, FiSave, 
  FiLock, FiTrash2, FiCalendar, FiBell, FiCamera 
} from 'react-icons/fi';
import { RiHandHeartLine } from 'react-icons/ri';

const ProfilePage = ({ isOAuthUser = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
  const [userData, setUserData] = useState({
    fullName: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, San Francisco, CA',
    dob: '1990-01-01',
    gender: 'male',
    bio: 'N/A',
    username: 'alexj',
    profilePicture: '',
    donations: 24,
    memberSince: 'Jan 2022',
    notificationPreferences: {
      donationUpdates: true,
      statusChanges: true,
      newsletters: false
    },
    donorDetails: {
      bloodGroup: 'O+',
      lastDonationDate: '2023-06-15',
      donationFrequency: 'regular'
    }
  });

  // Single theme configuration for all users
  const theme = {
    primary: 'from-violet-500 to-purple-600',
    secondary: 'bg-violet-100 text-purple-800',
    accent: 'text-violet-500',
    gradient: 'bg-gradient-to-r from-violet-500 to-purple-600',
    icon: 'text-violet-400'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedInputChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split('.');
    setUserData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value
      }
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setUserData(prev => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [name]: checked
      }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData(prev => ({ ...prev, profilePicture: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = () => {
    console.log('Account deletion requested');
    setShowDeleteConfirmation(false);
  };

  // Reusable EditableField Component
  const EditableField = ({ isEditing, label, name, value, onChange, type = 'text', required = false, prefix = '' }) => (
    <motion.div 
      className={`p-4 sm:p-6 rounded-xl ${isEditing ? 'bg-purple-50' : 'bg-gray-50'} transition-colors`}
      whileHover={{ scale: 1.01 }}
    >
      <label className="block text-sm font-medium text-gray-500 mb-2">{label}</label>
      {isEditing ? (
        <div className="flex items-center">
          {prefix && <span className="mr-2 text-gray-500">{prefix}</span>}
          <input
            type={type}
            name={name}
            value={value || ''}
            onChange={onChange}
            className="w-full bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none py-2 text-base sm:text-lg"
            required={required}
          />
        </div>
      ) : (
        <p className="text-base sm:text-lg text-gray-800">
          {prefix && <span className="text-gray-500">{prefix}</span>}
          {value || 'Not specified'}
        </p>
      )}
    </motion.div>
  );

  // Reusable EditableTextArea Component
  const EditableTextArea = ({ isEditing, label, name, value, onChange, placeholder }) => (
    <motion.div 
      className={`p-4 sm:p-6 rounded-xl ${isEditing ? 'bg-purple-50' : 'bg-gray-50'} transition-colors`}
      whileHover={{ scale: 1.01 }}
    >
      <label className="block text-sm font-medium text-gray-500 mb-2">{label}</label>
      {isEditing ? (
        <textarea
          name={name}
          value={value || ''}
          onChange={onChange}
          className="w-full bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none py-2 text-base sm:text-lg min-h-[80px] sm:min-h-[100px]"
          placeholder={placeholder}
        />
      ) : (
        <p className="text-base sm:text-lg text-gray-800 whitespace-pre-line">
          {value || <span className="text-gray-400">{placeholder}</span>}
        </p>
      )}
    </motion.div>
  );

  // Reusable EditableSelect Component
  const EditableSelect = ({ isEditing, label, name, value, onChange, options }) => (
    <motion.div 
      className={`p-4 sm:p-6 rounded-xl ${isEditing ? 'bg-purple-50' : 'bg-gray-50'} transition-colors`}
      whileHover={{ scale: 1.01 }}
    >
      <label className="block text-sm font-medium text-gray-500 mb-2">{label}</label>
      {isEditing ? (
        <select
          name={name}
          value={value || ''}
          onChange={onChange}
          className="w-full bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none py-2 text-base sm:text-lg"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <p className="text-base sm:text-lg text-gray-800 capitalize">
          {value || 'Not specified'}
        </p>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      {/* Main Profile Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden"
      >
        {/* Profile Header */}
        <div className={`relative h-40 sm:h-48 ${theme.gradient} flex items-end pb-4 sm:pb-6`}>
          {/* Profile Picture */}
          <motion.div 
            className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative group">
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-white shadow-md flex items-center justify-center overflow-hidden">
                {userData.profilePicture ? (
                  <img 
                    src={userData.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <FiUser className={`text-3xl sm:text-4xl ${theme.accent}`} />
                  </div>
                )}
              </div>
              {isEditing && (
                <>
                  <button 
                    onClick={() => document.getElementById('profile-picture-upload').click()}
                    className="absolute -bottom-2 -right-2 bg-purple-500 text-white p-1 sm:p-1.5 rounded-full shadow-sm"
                  >
                    <FiCamera className="text-xs sm:text-sm" />
                  </button>
                  <input 
                    type="file" 
                    id="profile-picture-upload" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </>
              )}
            </div>
          </motion.div>
          
          {/* Profile Info */}
          <motion.div 
            className="ml-24 sm:ml-36 mb-2 sm:mb-4 text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold truncate max-w-[180px] sm:max-w-none">
              {userData.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-white/90 truncate max-w-[180px] sm:max-w-none">
              {userData.bio}
            </p>
          </motion.div>
          
          {/* Edit Button */}
          <motion.button
            onClick={() => setIsEditing(!isEditing)}
            className={`absolute right-4 sm:right-8 bottom-4 sm:bottom-6 px-4 sm:px-6 py-1 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 shadow-md text-sm sm:text-base ${
              isEditing ? 'bg-white text-purple-600' : 'bg-white/20 backdrop-blur-sm text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {isEditing ? (
              <>
                <FiSave className="text-sm sm:text-lg" />
                <span>Save</span>
              </>
            ) : (
              <>
                <FiEdit className="text-sm sm:text-lg" />
                <span>Edit</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Profile Content */}
        <div className="mt-16 sm:mt-20 px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Tabs */}
            <motion.div 
              className="flex border-b border-gray-200 overflow-x-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {['personal', 'contact', 'donor'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-4 py-2 sm:py-3 font-medium relative capitalize text-sm sm:text-base whitespace-nowrap ${
                    activeTab === tab ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"
                      layoutId="tabIndicator"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 sm:space-y-6"
              >
                {activeTab === 'personal' ? (
                  <>
                    {/* Profile Picture Field */}
                    <motion.div 
                      className={`p-4 sm:p-6 rounded-xl ${isEditing ? 'bg-purple-50' : 'bg-gray-50'} transition-colors`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <label className="block text-sm font-medium text-gray-500 mb-2">Profile Picture</label>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src={userData.profilePicture || '/default-avatar.png'} 
                            alt="Profile"
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white shadow"
                          />
                          {isEditing && (
                            <button 
                              onClick={() => document.getElementById('profile-picture-upload').click()}
                              className="absolute -bottom-1 -right-1 bg-purple-500 text-white p-1 rounded-full shadow-sm"
                            >
                              <FiCamera className="text-xs" />
                            </button>
                          )}
                        </div>
                        {isEditing && (
                          <button 
                            onClick={() => setUserData({...userData, profilePicture: ''})}
                            className="text-xs sm:text-sm text-purple-600 hover:text-purple-800"
                          >
                            Remove photo
                          </button>
                        )}
                      </div>
                      <input 
                        type="file" 
                        id="profile-picture-upload" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </motion.div>

                    <EditableField
                      isEditing={isEditing}
                      label="Full Name"
                      name="fullName"
                      value={userData.fullName}
                      onChange={handleInputChange}
                      required
                    />

                    <EditableField
                      isEditing={isEditing}
                      label="Username"
                      name="username"
                      value={userData.username}
                      onChange={handleInputChange}
                      prefix="@"
                    />

                    <EditableTextArea
                      isEditing={isEditing}
                      label="Bio"
                      name="bio"
                      value={userData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself"
                    />

                    <EditableSelect
                      isEditing={isEditing}
                      label="Gender"
                      name="gender"
                      value={userData.gender}
                      onChange={handleInputChange}
                      options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'Other' },
                        { value: 'Not specified', label: 'Prefer not to say' }
                      ]}
                    />

                    <motion.div 
                      className={`p-4 sm:p-6 rounded-xl ${isEditing ? 'bg-purple-50' : 'bg-gray-50'} transition-colors`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <label className="block text-sm font-medium text-gray-500 mb-2">Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          name="dob"
                          value={userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : ''}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none py-2 text-base sm:text-lg"
                        />
                      ) : (
                        <p className="text-base sm:text-lg text-gray-800">
                          {userData.dob ? new Date(userData.dob).toLocaleDateString() : 'Not specified'}
                        </p>
                      )}
                    </motion.div>
                  </>
                ) : activeTab === 'contact' ? (
                  <>
                    <motion.div 
                      className={`p-4 sm:p-6 rounded-xl ${isEditing ? 'bg-purple-50' : 'bg-gray-50'} transition-colors`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <label className="block text-sm font-medium text-gray-500 mb-2">Email</label>
                      {isEditing && !isOAuthUser ? (
                        <input
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none py-2 text-base sm:text-lg"
                          required
                        />
                      ) : (
                        <div className="flex items-center justify-between">
                          <p className="text-base sm:text-lg text-gray-800 truncate">{userData.email}</p>
                          {isOAuthUser && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full whitespace-nowrap">
                              Connected via {userData.googleId ? 'Google' : 'GitHub'}
                            </span>
                          )}
                        </div>
                      )}
                    </motion.div>

                    <EditableField
                      isEditing={isEditing}
                      label="Phone"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      type="tel"
                    />

                    <EditableTextArea
                      isEditing={isEditing}
                      label="Address"
                      name="address"
                      value={userData.address}
                      onChange={handleInputChange}
                      placeholder="Street, City, State, ZIP"
                    />
                  </>
                ) : (
                  <>
                    <EditableSelect
                      isEditing={isEditing}
                      label="Blood Group"
                      name="donorDetails.bloodGroup"
                      value={userData.donorDetails?.bloodGroup}
                      onChange={handleNestedInputChange}
                      options={[
                        { value: 'A+', label: 'A+' },
                        { value: 'A-', label: 'A-' },
                        { value: 'B+', label: 'B+' },
                        { value: 'B-', label: 'B-' },
                        { value: 'AB+', label: 'AB+' },
                        { value: 'AB-', label: 'AB-' },
                        { value: 'O+', label: 'O+' },
                        { value: 'O-', label: 'O-' }
                      ]}
                    />

                    <motion.div 
                      className={`p-4 sm:p-6 rounded-xl ${isEditing ? 'bg-purple-50' : 'bg-gray-50'} transition-colors`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <label className="block text-sm font-medium text-gray-500 mb-2">Last Donation Date</label>
                      {isEditing ? (
                        <input
                          type="date"
                          name="donorDetails.lastDonationDate"
                          value={userData.donorDetails?.lastDonationDate || ''}
                          onChange={handleNestedInputChange}
                          className="w-full bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none py-2 text-base sm:text-lg"
                        />
                      ) : (
                        <p className="text-base sm:text-lg text-gray-800">
                          {userData.donorDetails?.lastDonationDate 
                            ? new Date(userData.donorDetails.lastDonationDate).toLocaleDateString() 
                            : 'Not specified'}
                        </p>
                      )}
                    </motion.div>

                    <EditableSelect
                      isEditing={isEditing}
                      label="Donation Frequency"
                      name="donorDetails.donationFrequency"
                      value={userData.donorDetails?.donationFrequency}
                      onChange={handleNestedInputChange}
                      options={[
                        { value: 'regular', label: 'Regular donor' },
                        { value: 'occasional', label: 'Occasional donor' },
                        { value: 'first-time', label: 'First time donor' }
                      ]}
                    />
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column - Stats and Actions */}
          <div className="space-y-4 sm:space-y-6">
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`p-4 sm:p-6 rounded-xl ${theme.gradient} text-white shadow-lg`}
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Your Impact</h3>
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <div className="flex justify-between items-center">
                  <span className="text-white/90">Total Donations</span>
                  <span className="font-bold">{userData.donations}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/90">Member Since</span>
                  <span className="font-bold">{userData.memberSince}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/90">Account Status</span>
                  <span className="font-bold">Verified</span>
                </div>
              </div>
            </motion.div>

            {/* Notification Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                <FiBell className={theme.icon} />
                <span>Notifications</span>
              </h3>
              <div className="space-y-2">
                <motion.label 
                  className="flex items-center justify-between cursor-pointer p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-gray-700 text-sm sm:text-base">Donation Updates</span>
                  <input
                    type="checkbox"
                    name="donationUpdates"
                    checked={userData.notificationPreferences?.donationUpdates || false}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded focus:ring-purple-500 text-purple-600"
                  />
                </motion.label>
                <motion.label 
                  className="flex items-center justify-between cursor-pointer p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-gray-700 text-sm sm:text-base">Status Changes</span>
                  <input
                    type="checkbox"
                    name="statusChanges"
                    checked={userData.notificationPreferences?.statusChanges || false}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded focus:ring-purple-500 text-purple-600"
                  />
                </motion.label>
                <motion.label 
                  className="flex items-center justify-between cursor-pointer p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-gray-700 text-sm sm:text-base">Newsletters</span>
                  <input
                    type="checkbox"
                    name="newsletters"
                    checked={userData.notificationPreferences?.newsletters || false}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded focus:ring-purple-500 text-purple-600"
                  />
                </motion.label>
              </div>
            </motion.div>

            {/* Security Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                <FiLock className={theme.icon} />
                <span>Security</span>
              </h3>
              <div className="space-y-1">
                {!isOAuthUser && (
                  <motion.button 
                    className="w-full text-left flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                    whileHover={{ x: 5 }}
                  >
                    <span className="flex items-center text-gray-700">
                      <FiLock className={`mr-2 ${theme.icon}`} />
                      Change Password
                    </span>
                    <span className="text-gray-400">→</span>
                  </motion.button>
                )}
                <motion.button
                  onClick={() => setShowDeleteConfirmation(true)}
                  className="w-full text-left flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-red-50 transition-colors text-red-600 text-sm sm:text-base"
                  whileHover={{ x: 5 }}
                >
                  <span className="flex items-center">
                    <FiTrash2 className="mr-2" />
                    Delete Account
                  </span>
                  <span className="text-red-400">→</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirmation && (
          <motion.div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-red-100">
                  <FiTrash2 className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mt-3">Delete Account</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete your account? All of your data will be permanently removed.
                  </p>
                </div>
              </div>
              <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-3">
                <motion.button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="px-3 sm:px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleDeleteAccount}
                  className="px-3 sm:px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;