import type { SetDepartments } from './types';

export const setDepartments: SetDepartments = (state, payload) => {
  state.departments = payload.payload.data;
};
