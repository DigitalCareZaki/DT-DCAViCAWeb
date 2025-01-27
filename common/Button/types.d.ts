import { ButtonHTMLAttributes, HTMLProps, ReactElement } from 'react';

import { icon } from '../types';

export interface ButtonPrimary extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  loading?: boolean;
  icon?: icon;
  variant?: 'name' | 'icon' | 'icon-only';
  outlined?: boolean;
}

export interface ButtonPromotion extends HTMLProps<HTMLDivElement> {
  name: string;
  heading: string;
  iconName: 'FaApple' | 'BiLogoPlayStore';
}

export interface SidebarButtonProps extends HTMLProps<HTMLDivElement> {
  name: string;
  icon: JSX;
  path?: string;
}

export interface ServerWrapper extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactElement;
}
