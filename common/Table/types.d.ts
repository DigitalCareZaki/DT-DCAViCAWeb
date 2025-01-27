import { ReactElement } from 'react';

export type TableProps = {
  heads: Array<string>;
  children?: ReactElement;
  className?: string;
};
