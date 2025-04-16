import { useState } from 'react';
import { motion } from 'framer-motion';
import HeroHeader from '../../components/UI/HeroHeader'
import Filters from '../../components/UI/Filters';
import CardList from '../../components/UI/CardList';

const DonationHistory = () => {

  // Sample donation data
  const [donations, setDonations] = useState([
    {
      id: 1,
      type: 'blood',
      date: '2023-06-15',
      recipient: 'City General Hospital',
      bloodType: 'O+',
      pints: 1,
      status: 'completed',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      id: 2,
      type: 'general',
      date: '2023-05-28',
      recipient: 'Hope Shelter',
      item: 'Winter Coats',
      quantity: 5,
      status: 'completed',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
      id: 3,
      type: 'blood',
      date: '2023-04-10',
      recipient: 'Regional Blood Center',
      bloodType: 'O+',
      pints: 1,
      status: 'completed',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      id: 4,
      type: 'general',
      date: '2023-03-22',
      recipient: 'Community School',
      item: 'School Supplies',
      quantity: 20,
      status: 'completed',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    {
      id: 5,
      type: 'blood',
      date: '2023-02-05',
      recipient: 'Childrens Hospital',
      bloodType: 'O+',
      pints: 1,
      status: 'scheduled',
      avatar: 'https://randomuser.me/api/portraits/women/54.jpg'
    }
  ]);

  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    sort: 'newest'
  });

  const [expandedDonation, setExpandedDonation] = useState(null);

  // Filter configuration for the reusable component
  const filterConfig = [
    {
      id: 'type',
      label: 'Donation Type',
      defaultValue: 'all',
      options: [
        { value: 'all', label: 'All Types' },
        { value: 'blood', label: 'Blood Donations' },
        { value: 'general', label: 'Item Donations' },
      ],
    },
    {
      id: 'status',
      label: 'Status',
      defaultValue: 'all',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'completed', label: 'Completed' },
        { value: 'scheduled', label: 'Scheduled' },
        { value: 'cancelled', label: 'Cancelled' },
      ],
    },
    {
      id: 'sort',
      label: 'Sort By',
      defaultValue: 'newest',
      options: [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
      ],
    },
  ];

  const handleFilterChange = (id, value) => {
    setFilters(prev => ({ ...prev, [id]: value }));
  };

  const resetFilters = () => {
    setFilters({
      type: 'all',
      status: 'all',
      sort: 'newest'
    });
  };

  // Filter and sort donations
  const filteredDonations = donations
    .filter(donation => {
      return (
        (filters.type === 'all' || donation.type === filters.type) &&
        (filters.status === 'all' || donation.status === filters.status)
      );
    })
    .sort((a, b) => {
      if (filters.sort === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <HeroHeader
          title="Donation History"
          subtitle="History"
          description="View all your past and upcoming donations"
          size="text-3xl md:text-4xl"
        />


        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {/* Total Donations */}
          <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Donations</p>
                <p className="text-3xl font-extrabold text-indigo-900">{donations.length}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Blood Donations */}
          <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Blood Donations</p>
                <p className="text-3xl font-extrabold text-red-700">
                  {donations.filter(d => d.type === 'blood').length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>

          {/* Item Donations */}
          <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Item Donations</p>
                <p className="text-3xl font-extrabold text-indigo-900">
                  {donations.filter(d => d.type === 'general').length}
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>


        {/* Filters Section */}
        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={resetFilters}
          config={filterConfig}
          title="Filter Donations"
        />


        {/* Donation List */}
        <CardList
        filteredDonations={filteredDonations}
        expandedDonation={expandedDonation}
        setExpandedDonation={setExpandedDonation}
        />


      </motion.div>
    </div>
  );
};

export default DonationHistory;