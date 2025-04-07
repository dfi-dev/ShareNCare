import { createSlice } from '@reduxjs/toolkit';

const donorsSlice = createSlice({
  name: 'donors',
  initialState: {
    topDonors: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchTopDonorsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTopDonorsSuccess: (state, action) => {
      state.loading = false;
      state.topDonors = action.payload;
    },
    fetchTopDonorsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTopDonorsStart,
  fetchTopDonorsSuccess,
  fetchTopDonorsFailure,
} = donorsSlice.actions;

export default donorsSlice.reducer;
