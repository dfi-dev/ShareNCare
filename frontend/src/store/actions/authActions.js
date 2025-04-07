import axios from 'axios';
import {
  loginSuccess,
  logout,
  setLoading,
  setError,
  clearError
} from '../slices/authSlice';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// LOGIN THUNK
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());

  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, credentials);

    const { token, user } = response.data;
    dispatch(loginSuccess({ token, user }));

    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Login failed";
    dispatch(setError(msg));
    throw new Error(msg);
  } finally {
    dispatch(setLoading(false));
  }
};

// LOGOUT THUNK 
export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};

// Register thunk 
export const registerUser = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());

  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, userData);

    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Registration failed";
    dispatch(setError(msg));
    throw new Error(msg);
  } finally {
    dispatch(setLoading(false));
  }
};
