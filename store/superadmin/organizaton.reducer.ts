import type {
  SetCurrentOrganizationProps,
  SetOrganizationUsersFunc,
  SetBranchesProps,
  UpdateUserStatusFunc,
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

export const updateUserStatus: UpdateUserStatusFunc = (
  state,
  payload
) => {
  const { userId, active } = payload.payload;
  const userIndex = state.users.findIndex((user: any) => user.id === userId);

  if (userIndex !== -1) {
    state.users[userIndex].active = active;
  }
};
