import type { ChangeEvent } from 'react';
import type { UserRole } from '@types';

export interface AppointmentFilters {
  search: string;
  date: string; // YYYY-MM-DD, empty when unset
}

export interface TopbarProps {
  userType?: UserRole | undefined;
  search?: string;
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearSearch?: () => void;
  loading?: boolean;
  date?: string;
  onDateChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearDate?: () => void;
}

export interface DateFieldProps {
  placeholder: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
