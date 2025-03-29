const NodeCache = require('node-cache');
const User = require('../models/User');
const Donation = require('../models/Donation');
const BloodDonation = require('../models/BloodDonation');

const cache = new NodeCache({ stdTTL: 300 }); 

async function calculateStats() {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const [
    totalUsers,
    usersLast24Hours,
    completedDonations,
    completedBloodDonations,
    approvedDonations,
    approvedBloodDonations,
    pendingDonations,
    pendingBloodDonations,
    uniqueDonationDonors,
    uniqueBloodDonationDonors,
    completedDonationRecipients,
    completedBloodDonationRecipients
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ createdAt: { $gte: yesterday } }),
    Donation.countDocuments({ status: 'completed' }),
    BloodDonation.countDocuments({ status: 'completed' }),
    Donation.countDocuments({ status: 'approved' }),
    BloodDonation.countDocuments({ status: 'approved' }),
    Donation.countDocuments({ status: 'pending' }),
    BloodDonation.countDocuments({ status: 'pending' }),
    Donation.distinct('donor'),
    BloodDonation.distinct('donor'),
    Donation.distinct('recipient', { status: 'completed', recipient: { $ne: null } }),
    BloodDonation.distinct('recipient', { status: 'completed', recipient: { $ne: null } })
  ]);

  const totalDonors = new Set([...uniqueDonationDonors, ...uniqueBloodDonationDonors]).size;
  const totalRecipients = new Set([...completedDonationRecipients, ...completedBloodDonationRecipients]).size;

  const result = {
    totalUsers,
    usersLast24Hours,
    totalDonors,
    totalRecipients,
    totalDonations: completedDonations + completedBloodDonations +
                    approvedDonations + approvedBloodDonations +
                    pendingDonations + pendingBloodDonations,
    completedDonations: completedDonations + completedBloodDonations,
    approvedDonations: approvedDonations + approvedBloodDonations,
    pendingDonations: pendingDonations + pendingBloodDonations,
    peopleHelped: totalRecipients,
    regularDonations: completedDonations,
    bloodDonations: completedBloodDonations
  };

  cache.set('stats', result);
  return result;
}

module.exports = { calculateStats, cache };
