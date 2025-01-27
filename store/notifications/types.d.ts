import type { PayloadAction } from '@reduxjs/toolkit';
import type { NotificationProps } from '@types';

export interface StoreNotificationProps {
  notifications: NotificationProps[];
  unread: boolean;
}

export type SetNotifications = (
  state: StoreNotificationProps,
  payload: PayloadAction<{ data: NotificationProps[] }>
) => void;

export type SetNewNotification = (
  state: StoreNotificationProps,
  payload: PayloadAction<{ data: NotificationProps }>
) => void;

export type SetReadNotifications = (state: StoreNotificationProps) => void;
