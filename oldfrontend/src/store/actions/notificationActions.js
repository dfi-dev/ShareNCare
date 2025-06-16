import axios from 'axios';
import { asyncThunkWrapper } from '../../utils/asyncThunkWrapper';
import {
  fetchNotificationsStart,
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
  markAsReadStart,
  markAsReadSuccess,
  markAsReadFailure
} from '../slices/notificationSlice';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchNotifications = (userId) => async (dispatch) => {
  return asyncThunkWrapper({
    dispatch,
    asyncFunc: () => axios.get(`${BASE_URL}/api/notifications/${userId}`).then(res => res.data),
    startAction: fetchNotificationsStart,
    successAction: fetchNotificationsSuccess,
    failureAction: fetchNotificationsFailure,
  });
};

export const markNotificationAsRead = (notificationId) => async (dispatch) => {
  return asyncThunkWrapper({
    dispatch,
    asyncFunc: () => axios.patch(`${BASE_URL}/api/notifications/read/${notificationId}`).then(res => res.data),
    startAction: markAsReadStart,
    successAction: markAsReadSuccess,
    failureAction: markAsReadFailure,
  });
};
