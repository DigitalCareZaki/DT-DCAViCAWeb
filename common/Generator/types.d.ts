import { ReactElement } from 'react';

export interface GeneratorProps {
  data?: Array<{ [key: any]: any }>;
  children?: ReactElement;
  [key: string]: any;
  test?: string;
}
