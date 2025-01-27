import { CSSProperties } from 'react';
import type { icon } from '../types';

export type Props = {
  name: icon;
  size: number;
  onClick?: VoidFunction;
  style?: CSSProperties;
  color?: '#6b7280' | string;
  className?: string;
};
