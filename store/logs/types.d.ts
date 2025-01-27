import type { PayloadAction } from '@reduxjs/toolkit';
import type { LogsDataProps } from '@types';

export interface StoreLogsState {
  logs: LogsDataProps[];
}

export type SetLogs = (
  state: StoreLogsState,
  payload: PayloadAction<{ data: LogsDataProps[] }>
) => void;
