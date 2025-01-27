'use client';

import { useSelector } from 'react-redux';

import type { ReduxProps, StoreSuperAdminState } from '@store-types';
import type { useCurrentOrganizationProps } from './types';

const useCurrentOrganization: useCurrentOrganizationProps = () => {
  const organization = useSelector<ReduxProps, StoreSuperAdminState>(
    (state) => state.superadmin
  );

  return [organization.current];
};

export default useCurrentOrganization;
