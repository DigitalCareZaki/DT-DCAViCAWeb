import type { ReactElement } from 'react';

export interface TabProps {
  children?: ReactElement;
  title: string;
  onClick?: () => void;
}
