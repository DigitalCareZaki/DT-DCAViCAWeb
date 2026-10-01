import type {
  HTMLProps,
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
} from 'react';

import { DateRangePickerProps } from 'react-date-range';

import type { icon } from '../types';

export interface InputBaseProps extends HTMLProps<HTMLInputElement> {
  iconSize?: number;
  icon?: icon;
  password?: boolean;
  hookProps?: any;
  error?: boolean;
  errorMessage?: string;
  loading?: boolean;
  borderTheme?: boolean;
  labelVariant?: 'tiny' | 'small' | 'medium';
  hideInfo?: boolean;
  iconColor?: string;
  secondaryIcon?: icon;
  defaultBorder?: boolean;
  wrapperClassName?: string;
  inputWrapperClassName?: string;
  inputClassName?: string;
  validatorErrors?: Array<string>;
  labelClassName?: string;
  errorClassName?: string;
  loading?: boolean;
  primaryIconClassName?: string;
  secondaryIconClassName?: string;
  primaryOnClick?: () => void;
  secondaryOnClick?: () => void;
}

export interface InputSelectProps extends HTMLProps<HTMLDivElement> {
  value?: boolean;
  theme?: boolean;
  white?: boolean;
}

export type InputBasicProps = Omit<InputBaseProps, 'password'> & {
  label?: string;
};

export interface InputRadioProps extends HTMLProps<HTMLInputElement> {
  hookProps?: any;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  borderTheme?: boolean;
  labelVariant?: 'tiny' | 'small' | 'medium';
  hideInfo?: boolean;
}

export interface DropdownProps {
  loading?: boolean;
  loadingSpinnerColor?: string;
  children?: ReactElement;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  selected?: string;
  placeholder?: string;
  label: string;
  title: string;
  overrideShow?: number;
  onClear?: () => void;
  labelClassName?: string;
  hideInfo?: boolean;
  inputWrapperClassName?: string;
  inputClassName?: string;
  icon?: icon;
  iconColor?: string;
  dropdownClassName?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean
}

export interface DropdownWithoutStateProps extends DropdownProps {
  externalValue: string;
  setExternalValue: (value: string) => void;
}

export interface DatepickerProps extends DateRangePickerProps {
  loading?: boolean;
  children?: ReactElement;
  title: string;
}

export interface DropdownSecondaryProps {
  iconSize?: number;
  icon?: icon;
  hookProps?: any;
  error?: boolean;
  errorMessage?: string;
  loading?: boolean;
  borderTheme?: boolean;
  labelVariant?: 'tiny' | 'small' | 'medium';
  label?: string;
  hideInfo?: boolean;
  defaultBorder?: boolean;
  inputWrapperClassName?: string;
  disabled?: boolean;
  title?: string;
  iconColor?: string;
  children?: ReactElement;
  selected?: string;
  disableMessage?: string;
  labelClassName?: string;
  titleClassName?: string;
  errorClassName?: string;
}

export interface FilePickerProps {
  src?: string | undefined;
  type?: 'image' | 'file' | string;
  accept?: string;
  handleFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface DateFieldProps {
  placeholder: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface DateFilterProps {
  value?: string; // YYYY-MM-DD, empty when unset
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  placeholder?: string;
}
