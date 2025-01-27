import { StoreUserState } from './types';

const initialState: StoreUserState = {
  user: {
    id: undefined,
    email: undefined,
    name: undefined,
    type: undefined,
    role: undefined,
    first_name: undefined,
    middle_name: undefined,
    last_name: undefined,
    token: undefined,
    isPincode: false,
  },
};

export default initialState;
