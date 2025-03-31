import { createSlice } from '@reduxjs/toolkit';

const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    data: {},
    loading: false,
    error: null
  },
  reducers: {
    fetchStatsStart: (state) => { state.loading = true; },
    fetchStatsSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    fetchStatsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { fetchStatsStart, fetchStatsSuccess, fetchStatsFailure } = statsSlice.actions;
export default statsSlice.reducer;
