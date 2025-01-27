import type { StoreSocketProps } from './types';

const initialState: StoreSocketProps = {
  emit: {
    payload: null,
    event: null,
  },
  participants: [],
};

export default initialState;
