import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  allDonations: [],
  loading: false,
  error: null,
};

const adminDataSlice = createSlice({
  name: 'adminData',
  initialState,
  reducers: {
    fetchAdminDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAdminDataSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.allDonations = action.payload.allDonations;
    },
    fetchAdminDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchAdminDataStart,
  fetchAdminDataSuccess,
  fetchAdminDataFailure
} = adminDataSlice.actions;

export default adminDataSlice.reducer;
