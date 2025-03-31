import { createSlice } from '@reduxjs/toolkit';

const donationSlice = createSlice({
  name: 'donations',
  initialState: {
    donations: [],
    requests: [],
    loading: false,
    error: null
  },
  reducers: {
    fetchDonationsStart: (state) => { state.loading = true; },
    fetchDonationsSuccess: (state, action) => {
      state.donations = action.payload;
      state.loading = false;
    },
    fetchRequestsSuccess: (state, action) => {
      state.requests = action.payload;
      state.loading = false;
    },
    fetchFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { fetchDonationsStart, fetchDonationsSuccess, fetchRequestsSuccess, fetchFailure } = donationSlice.actions;
export default donationSlice.reducer;
