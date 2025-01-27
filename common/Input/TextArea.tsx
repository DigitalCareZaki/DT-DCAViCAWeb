'use client';

import { twMerge } from 'tailwind-merge';
import { TooltipBasic } from '@common';

import { Icon } from '../Icon';

import type { ClientComponentProps } from '@types';
import type { InputBaseProps } from './types';

const TextArea: ClientComponentProps<InputBaseProps> = ({
  iconSize = 15,
  icon,
  hookProps,
  error,
  errorMessage,
  label,
  borderTheme,
  labelVariant,
  hideInfo,
  iconColor,
  defaultBorder,
  inputWrapperClassName,
  className,
  title,
  inputClassName,
  ...props
}) => {
  return (
    <div className="flex w-full flex-col gap-2 text-xs">
      {label && (
        <div className="flex items-center gap-2">
          <span
            className={twMerge(
              'text-xs font-medium text-gray-500',
              labelVariant === 'tiny' && 'text-xs',
              labelVariant === 'small' && 'text-sx',
              labelVariant === 'medium' && 'text-base',
              'text-gray-600'
            )}
          >
            {label}
          </span>
          <div
            className={twMerge(
              'theme-bg-color items-centere relative flex h-3 w-3 cursor-help justify-center rounded-full text-[10px] font-bold text-white',
              hideInfo && 'hidden'
            )}
          >
            <TooltipBasic
              title={title ?? ''}
              className="tooltip-theme-background left-[20px]"
            >
              <span>!</span>
            </TooltipBasic>
          </div>
        </div>
      )}
      <div
        className={twMerge(
          'input-wrapper doctor:input-container-doctor flex h-10 w-full  items-center rounded-lg border border-transparent px-4 font-poppins text-xs transition duration-150',
          error
            ? 'superadmin:border-rose-500 doctor:border-rose-500 nurse:border-rose-500'
            : 'input-container',
          borderTheme &&
            'border-[1px] superadmin:focus-within:border-theme-superadmin-primary doctor:focus-within:border-theme-doctor-primary patient:focus-within:border-theme-patient-primary nurse:focus-within:border-theme-nurse-primary ',
          props.disabled ? 'bg-gray-200/10' : 'bg-white',
          defaultBorder && 'border-[1px] border-gray-300',
          inputWrapperClassName
        )}
      >
        {icon && <Icon size={iconSize} name={icon} color={iconColor} />}
        <textarea
          {...props}
          {...hookProps}
          className={twMerge(
            'h-full w-full select-none rounded-lg py-4 text-[11px] font-semibold text-gray-600 outline-none placeholder:font-normal placeholder:text-gray-300 disabled:doctor:bg-gray-200/10',
            icon ? 'px-4' : 'px-0',
            props?.disabled && 'cursor-not-allowed',
            inputClassName
          )}
        />
      </div>
      {errorMessage && (
        <span className="text-ssx font-medium text-rose-500">
          {errorMessage === '&' ? (
            <span className="text-transparent">{errorMessage}</span>
          ) : (
            errorMessage
          )}
        </span>
      )}
    </div>
  );
};

export default TextArea;
