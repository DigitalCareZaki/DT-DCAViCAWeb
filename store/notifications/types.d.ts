import type { PayloadAction } from '@reduxjs/toolkit';
import type { NotificationProps, PaginationProps } from '@types';

export interface StoreNotificationProps {
  notifications: NotificationProps[];
  unread: boolean;
  pagination?: PaginationProps;
}

export type SetNotifications = (
  state: StoreNotificationProps,
  payload: PayloadAction<{ data: { data: NotificationProps[]; pagination?: PaginationProps } }>
) => void;

export type SetNewNotification = (
  state: StoreNotificationProps,
  payload: PayloadAction<{ data: NotificationProps }>
) => void;

export type SetReadNotifications = (state: StoreNotificationProps) => void;
