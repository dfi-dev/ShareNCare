import { configureStore } from '@reduxjs/toolkit';
import donorsReducer from './slices/donorsSlice';
import donationReducer from './slices/donationSlice';
import statsReducer from './slices/statsSlice';
import authReducer from './slices/authSlice';
import dashboardReducer from './slices/dashboardSlice';
import notificationsReducer from './slices/notificationsSlice';

const store = configureStore({
  reducer: {
    donors: donorsReducer,
    dashboard: dashboardReducer,
    donations: donationReducer,
    stats: statsReducer,
    auth: authReducer,
    notifications: notificationsReducer
  }
});

export default store;
