import type { UserRole } from '@types';

export type SidebarProps = {
  renderKey: 'users' | 'settings';
};

export type TelemedSidebarProps = {
  userType: UserRole | undefined;
};
