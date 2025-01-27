import type { ReactNode, StyleHTMLAttributes } from 'react';
import { Style } from 'util';

export type TooltipProps = {
  title: string;
  children?: ReactNode;
  className?: string;
  style?: any;
};
