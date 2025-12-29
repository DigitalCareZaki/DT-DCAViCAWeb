import type { UserRole } from '@types';

export interface TopbarProps {
  userType?: UserRole | undefined;
  onSearch?: (e: any) => void;
  loading?: boolean;
}
