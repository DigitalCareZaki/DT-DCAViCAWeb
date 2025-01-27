import type {
  SetCurrentOrganizationProps,
  SetOrganizationUsersFunc,
  SetBranchesProps,
} from './types';

export const setCurrentOrganization: SetCurrentOrganizationProps = (
  state,
  payload
) => {
  state.current = payload.payload.current;
};

export const setOrganizationUsers: SetOrganizationUsersFunc = (
  state,
  payload
) => {
  state.users = payload.payload.users;
};

export const setBranches: SetBranchesProps = (state, payload) => {
  state.branches = payload.payload.branches;
};
