import axios from 'axios';
import { asyncThunkWrapper } from '../../utils/asyncThunkWrapper';
import {
  fetchDonorDataStart,
  fetchDonorDataSuccess,
  fetchDonorDataFailure
} from '../slices/donorDataSlice';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchDonorData = (donorId) => async (dispatch) => {
  return asyncThunkWrapper({
    dispatch,
    asyncFunc: () => axios.get(`${BASE_URL}/api/donors/${donorId}/data`).then(res => res.data),
    startAction: fetchDonorDataStart,
    successAction: fetchDonorDataSuccess,
    failureAction: fetchDonorDataFailure,
  });
};
