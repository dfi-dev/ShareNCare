const { calculateStats, cache } = require('../utils/calculateStats');
const emitEvent = require('../socket/emitEvent');

// Selective update logic for frequent changes
async function updateStatsOnChange(io, { prevStatus, newStatus, type, action }) {
  let cachedStats = cache.get('stats') || await calculateStats();

  // Flexible logic for dynamic updates
  const changeValue = action === 'add' ? 1 : -1;

  switch (type) {
    case 'user':
      cachedStats.totalUsers += changeValue;
      if (action === 'add') cachedStats.usersLast24Hours++;
      break;

    case 'donation':
      cachedStats.totalDonations += changeValue;
      if (prevStatus === 'pending') cachedStats.pendingDonations -= changeValue;
      if (prevStatus === 'approved') cachedStats.approvedDonations -= changeValue;
      if (prevStatus === 'completed') cachedStats.completedDonations -= changeValue;
      if (newStatus === 'pending') cachedStats.pendingDonations += changeValue;
      if (newStatus === 'approved') cachedStats.approvedDonations += changeValue;
      if (newStatus === 'completed') cachedStats.completedDonations += changeValue;
      break;

    case 'bloodDonation':
      cachedStats.bloodDonations += changeValue;
      if (prevStatus === 'pending') cachedStats.pendingDonations -= changeValue;
      if (prevStatus === 'approved') cachedStats.approvedDonations -= changeValue;
      if (prevStatus === 'completed') cachedStats.completedDonations -= changeValue;
      if (newStatus === 'pending') cachedStats.pendingDonations += changeValue;
      if (newStatus === 'approved') cachedStats.approvedDonations += changeValue;
      if (newStatus === 'completed') cachedStats.completedDonations += changeValue;
      break;

    default:
      console.warn(`Unknown type: ${type}`);
      return;
  }

  cache.set('stats', cachedStats);
  emitEvent(io, 'all', 'updateStats', cachedStats);
}


// API endpoint to fetch stats
exports.getStats = async (req, res) => {
  try {
    const result = cache.get('stats') || await calculateStats();
    return successResponse(res, 'Statistics fetched successfully', result, 200);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return errorResponse(res, 'Failed to fetch statistics', { error: error.message }, 500);
  }
};

// Call this whenever a donation status changes
exports.updateStats = async (io, changeDetails) => {
  try {
    await updateStatsOnChange(io, changeDetails);
  } catch (error) {
    console.error('Error updating stats:', error);
  }
};
