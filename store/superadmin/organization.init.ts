import type { StoreSuperAdminState } from './types';

const initialState: StoreSuperAdminState = {
  current: {
    name: undefined,
    email: undefined,
    phone_number: undefined,
    uri: undefined,
    active: undefined,
  },
  profile: null,
  users: [],
  branches: [],
};

export default initialState;
