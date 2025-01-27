import type { ReactNode } from 'react';
import type { UserProps, CurrentOrganization } from '@types';

export type Props = {
  user: UserProps | undefined;
  children?: ReactNode;
  organization: CurrentOrganization | undefined;
};
