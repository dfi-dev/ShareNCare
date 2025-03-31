import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    list: [],
    unreadCount: 0,
    loading: false,
    error: null
  },
  reducers: {
    fetchNotificationsStart: (state) => { state.loading = true; },
    fetchNotificationsSuccess: (state, action) => {
      state.list = action.payload;
      state.unreadCount = action.payload.filter(n => !n.isRead).length;
      state.loading = false;
    },
    markAsRead: (state, action) => {
      const id = action.payload;
      const notification = state.list.find(n => n.id === id);
      if (notification) {
        notification.isRead = true;
        state.unreadCount -= 1;
      }
    },
    fetchNotificationsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { fetchNotificationsStart, fetchNotificationsSuccess, markAsRead, fetchNotificationsFailure } = notificationsSlice.actions;
export default notificationsSlice.reducer;
