'use client';

import { useSelector } from 'react-redux';

import type { ReduxProps, StoreUserState } from '@store-types';
import type { useUserProps } from './types';

const useUser: useUserProps = () => {
  const user = useSelector<ReduxProps, StoreUserState>((state) => state.user);

  return [user.user];
};

export default useUser;
