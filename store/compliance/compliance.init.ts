import type { StoreComplianceState } from './types';

const initState: StoreComplianceState = {
  data: {
    user: {
      id: '',
    },
    medications: [],
  },
  selected: {
    id: '',
    data: {},
  },
};

export default initState;
