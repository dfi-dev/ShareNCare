import apiClient from '../../api/apiClient';
import {
  fetchTopDonorsStart,
  fetchTopDonorsSuccess,
  fetchTopDonorsFailure,
} from '../slices/donorsSlice';

export const getTopDonors = () => async (dispatch) => {
  dispatch(fetchTopDonorsStart());
  try {
    const response = await apiClient.get('/users/top-donors');
    dispatch(fetchTopDonorsSuccess(response.data));
  } catch (error) {
    dispatch(fetchTopDonorsFailure(error.message));
  }
};
