import { createSlice } from '@reduxjs/toolkit';

// Safely parse localStorage data
let storedUser = null;
try {
  storedUser = JSON.parse(localStorage.getItem('user'));
} catch (e) {
  storedUser = null;
}

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: storedUser || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {loginSuccess,logout,setLoading,setError,clearError} = authSlice.actions;

export default authSlice.reducer;
