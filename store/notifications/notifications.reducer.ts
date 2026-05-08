import type {
  SetNewNotification,
  SetNotifications,
  SetReadNotifications,
} from './types';

export const setNewNotifications: SetNewNotification = (state, payload) => {
  const notifications = state.notifications.find(
    (el) =>
      el.id === payload.payload.data.id ||
      (
        el.title === payload.payload.data.title &&
        el.description === payload.payload.data.description &&
        el.created_at === payload.payload.data.created_at
      )
  );

  if (!notifications) {
    state.notifications = [payload.payload.data, ...state.notifications];
  }

  state.unread = true;
};

export const setNotifications: SetNotifications = (state, payload) => {
  state.notifications = [...payload.payload.data.data];
  state.pagination = payload.payload.data.pagination;
};

export const setNotificationsRead: SetReadNotifications = (state) => {
  state.unread = false;
};
