import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requestHistory: [],
  availableDonations: [], // 🆕 new field
  loading: false,
  error: null,
};

const recipientDataSlice = createSlice({
  name: 'recipientData',
  initialState,
  reducers: {
    fetchRecipientStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRecipientSuccess: (state, action) => {
      state.loading = false;
      state.requestHistory = action.payload;
    },
    fetchRecipientFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // 🆕 Available donations handlers
    fetchAvailableDonationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAvailableDonationsSuccess: (state, action) => {
      state.loading = false;
      state.availableDonations = action.payload;
    },
    fetchAvailableDonationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const {
  fetchRecipientStart,
  fetchRecipientSuccess,
  fetchRecipientFailure,
  fetchAvailableDonationsStart,
  fetchAvailableDonationsSuccess,
  fetchAvailableDonationsFailure
} = recipientDataSlice.actions;

export default recipientDataSlice.reducer;
