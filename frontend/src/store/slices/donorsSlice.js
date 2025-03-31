import { createSlice } from '@reduxjs/toolkit';

const donorsSlice = createSlice({
  name: 'donors',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {
    fetchDonorsStart: (state) => { state.loading = true; },
    fetchDonorsSuccess: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    fetchDonorsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { fetchDonorsStart, fetchDonorsSuccess, fetchDonorsFailure } = donorsSlice.actions;
export default donorsSlice.reducer;
