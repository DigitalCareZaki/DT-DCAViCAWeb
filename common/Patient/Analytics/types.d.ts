import type { ChangeEvent } from 'react';
import type { PatientNursesProps } from '@types';

export type Props = {
  patient?: string;
};

export type TableProps = {
  data: Array<PatientNursesProps>;
};

export interface AnalyticsQuery {
  page: number;
  search: string;
  date: string; // YYYY-MM-DD, empty when unset
}

export interface HeaderProps {
  search: string;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  loading?: boolean;
  date: string;
  onDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearDate: () => void;
}
