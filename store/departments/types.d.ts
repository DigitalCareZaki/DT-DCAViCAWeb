import { PayloadAction } from '@reduxjs/toolkit';
import type { DepartmentProps } from '@types';

export type StoreDepartmentState = {
  departments: DepartmentProps[];
};

export type SetDepartments = (
  state: StoreDepartmentState,
  payload: PayloadAction<{ data: DepartmentProps[] }>
) => void;
