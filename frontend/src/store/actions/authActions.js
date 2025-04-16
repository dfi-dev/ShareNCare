import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// LOGIN
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, credentials);
      return response.data; // { token, user }
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      return rejectWithValue(msg);
    }
  }
);

// REGISTER
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, userData);
      return response.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      return rejectWithValue(msg);
    }
  }
);

// LOGOUT (can be sync)
export const logoutUser = () => (dispatch) => {
  dispatch({ type: 'auth/logout' });
};
