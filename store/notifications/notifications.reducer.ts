import type {
  SetNewNotification,
  SetNotifications,
  SetReadNotifications,
} from './types';

export const setNewNotifications: SetNewNotification = (state, payload) => {
  const notifications = state.notifications.find(
    (el) => el.id === payload.payload.data.id
  );

  if (!notifications) {
    state.notifications = [...state.notifications, payload.payload.data];
  }

  state.unread = true;
};

export const setNotifications: SetNotifications = (state, payload) => {
  state.notifications = [...payload.payload.data];
};

export const setNotificationsRead: SetReadNotifications = (state) => {
  state.unread = false;
};
