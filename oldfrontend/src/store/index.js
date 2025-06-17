import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import donorDataReducer from './slices/donorDataSlice';
import recipientDataReducer from './slices/recipientDataSlice';
import notificationsReducer from './slices/notificationsSlice';
import adminDataReducer from './slices/adminDataSlice';
import statsReducer from "./slices/statsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    donorData: donorDataReducer,
    recipientData: recipientDataReducer,
    notifications: notificationsReducer,
    adminData: adminDataReducer,
    stats: statsReducer,
  }
});

export default store;
