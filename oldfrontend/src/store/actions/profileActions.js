// src/actions/profileActions.js
import axios from 'axios';
import { asyncThunkWrapper } from '../utils/asyncThunkWrapper';
import {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileSuccess
} from '../slices/profileSlice';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProfile = () => async (dispatch) => {
  return asyncThunkWrapper({
    dispatch,
    asyncFunc: () => axios.get(`${BASE_URL}/api/users/profile`).then(res => res.data),
    startAction: fetchProfileStart,
    successAction: fetchProfileSuccess,
    failureAction: fetchProfileFailure,
  });
};

export const updateProfile = (profileData) => async (dispatch) => {
  return asyncThunkWrapper({
    dispatch,
    asyncFunc: () => axios.put(`${BASE_URL}/api/users/profile`, profileData).then(res => res.data),
    startAction: fetchProfileStart,
    successAction: updateProfileSuccess,
    failureAction: fetchProfileFailure,
  });
};
