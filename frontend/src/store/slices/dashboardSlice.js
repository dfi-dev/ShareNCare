import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    role: null,
    donorData: {
      donations: [],
      requests: [],
      loading: false,
      error: null,
    },
    recipientData: {
      receivedDonations: [],
      requestStatus: [],
      loading: false,
      error: null,
    },
    adminData: {
      stats: null,
      users: [],
      loading: false,
      error: null,
    },
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setDonorData: (state, action) => {
      state.donorData = { ...state.donorData, ...action.payload };
    },
    setRecipientData: (state, action) => {
      state.recipientData = { ...state.recipientData, ...action.payload };
    },
    setAdminData: (state, action) => {
      state.adminData = { ...state.adminData, ...action.payload };
    },
  },
});

export const { setRole, setDonorData, setRecipientData, setAdminData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
