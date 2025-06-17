import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bloodDonations: [],
  generalDonations: [],
  requests: [],
  loading: false,
  error: null,
};

const donorDataSlice = createSlice({
  name: 'donorData',
  initialState,
  reducers: {
    fetchDonorDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDonorDataSuccess: (state, action) => {
      state.loading = false;
      state.bloodDonations = action.payload.bloodDonations;
      state.generalDonations = action.payload.generalDonations;
      state.requests = action.payload.requests;
    },
    fetchDonorDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchDonorDataStart,
  fetchDonorDataSuccess,
  fetchDonorDataFailure
} = donorDataSlice.actions;

export default donorDataSlice.reducer;
