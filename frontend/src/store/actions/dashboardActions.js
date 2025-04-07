import apiClient from '../../api/apiClient';
import {setDonorData,setRecipientData,setAdminData,setRole} from '../slices/dashboardSlice';

export const fetchDashboardData = (role) => async (dispatch) => {
  dispatch(setRole(role));

  if (role === 'donor') {
    dispatch(setDonorData({ loading: true }));
    try {
      const [donations, requests] = await Promise.all([
        apiClient.get('/donations/user'),
        apiClient.get('/requests/to-me'), // hypothetical endpoint
      ]);
      dispatch(setDonorData({
        donations: donations.data,
        requests: requests.data,
        loading: false,
        error: null,
      }));
    } catch (err) {
      dispatch(setDonorData({ error: err.message, loading: false }));
    }
  } else if (role === 'recipient') {
    dispatch(setRecipientData({ loading: true }));
    try {
      const [received, status] = await Promise.all([
        apiClient.get('/donations/received'),
        apiClient.get('/requests/status'),
      ]);
      dispatch(setRecipientData({
        receivedDonations: received.data,
        requestStatus: status.data,
        loading: false,
        error: null,
      }));
    } catch (err) {
      dispatch(setRecipientData({ error: err.message, loading: false }));
    }
  } else if (role === 'admin') {
    dispatch(setAdminData({ loading: true }));
    try {
      const [stats, users] = await Promise.all([
        apiClient.get('/admin/stats'),
        apiClient.get('/admin/users'),
      ]);
      dispatch(setAdminData({
        stats: stats.data,
        users: users.data,
        loading: false,
        error: null,
      }));
    } catch (err) {
      dispatch(setAdminData({ error: err.message, loading: false }));
    }
  }
};
