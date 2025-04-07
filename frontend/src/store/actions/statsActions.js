import axios from 'axios';
import { fetchStatsStart, fetchStatsSuccess, fetchStatsFailure } from '../slices/statsSlice';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchStats = () => async (dispatch) => {
  dispatch(fetchStatsStart());

  try {
    const response = await axios.get(`${BASE_URL}/api/stats`);
    dispatch(fetchStatsSuccess(response.data));
  } catch (error) {
    const msg = error.response?.data?.message || 'Failed to fetch statistics';
    dispatch(fetchStatsFailure(msg));
  }
};
