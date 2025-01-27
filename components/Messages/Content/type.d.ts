import { ReactElement } from 'react';

export interface Props {
  label: string;
  actionType?: 'delete' | 'starred' | 'unstarred';
  icon: ReactElement;
  messageId: string;
  active?: boolean;
  activeIcon?: ReactElement;
  onSuccess?: () => void;
  disableOnActive?: boolean;
}
