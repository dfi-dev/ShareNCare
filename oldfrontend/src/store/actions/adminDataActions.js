import axios from 'axios';
import { asyncThunkWrapper } from '../../utils/asyncThunkWrapper';
import {
  fetchAdminDataStart,
  fetchAdminDataSuccess,
  fetchAdminDataFailure
} from '../slices/adminDataSlice';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAdminData = () => async (dispatch) => {
  return asyncThunkWrapper({
    dispatch,
    asyncFunc: () => axios.get(`${BASE_URL}/api/admin/overview`).then(res => res.data),
    startAction: fetchAdminDataStart,
    successAction: fetchAdminDataSuccess,
    failureAction: fetchAdminDataFailure,
  });
};
