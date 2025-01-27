import type { InboxDataProps } from '@types';

export interface PreviewProps extends Partial<InboxDataProps> {}
export interface SidebarProps {
  type?: 'starred' | 'sent' | 'inbox';
  search?: string;
}

export interface HeaderProps {
  type?: 'starred' | 'sent' | 'inbox';
  search?: string;
}
