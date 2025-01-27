import { createSlice } from '@reduxjs/toolkit';

import initialState from './notification.init';
import {
  setNewNotifications,
  setNotifications,
  setNotificationsRead,
} from './notifications.reducer';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNewNotifications,
    setNotifications,
    setNotificationsRead,
  },
});

export const {
  setNewNotifications: setNewNotificationsReducer,
  setNotifications: setNotificationsReducer,
  setNotificationsRead: setNotificationsReadReducer,
} = notificationSlice.actions;

export default notificationSlice.reducer;
