import type { ReactNode } from 'react';
import type { UserProps } from '@types';

export type Props = {
  user: UserProps | undefined;
  children?: ReactNode;
};
