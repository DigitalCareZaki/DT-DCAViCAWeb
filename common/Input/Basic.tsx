'use client';

import { twMerge } from 'tailwind-merge';
import { TooltipBasic } from '@common';
import { useUser } from '@selectors';
import { roleColors } from '@constants';
import { Icon } from '../Icon';
import { CircleSpinner } from 'react-spinners-kit';

import type { ClientComponentProps } from '@types';
import type { InputBaseProps } from './types';

const InputBasic: ClientComponentProps<InputBaseProps> = ({
  iconSize = 18, // Increase the default icon size for better readability
  icon,
  password,
  hookProps,
  error,
  errorMessage,
  label,
  borderTheme,
  labelVariant,
  hideInfo,
  iconColor,
  secondaryIcon,
  defaultBorder,
  inputWrapperClassName,
  inputClassName,
  title,
  labelClassName,
  errorClassName,
  loading,
  primaryIconClassName,
  secondaryIconClassName,
  secondaryOnClick,
  primaryOnClick,
  ...props
}) => {
  const [user] = useUser();

  return (
    <div className="flex w-full flex-col gap-3 text-xs sm:text-base md:text-lg">
      {label && (
        <div className="flex items-center gap-2">
          <span
            className={twMerge(
              'font-medium text-gray-500',
              labelVariant === 'tiny' && 'text-sm',
              labelVariant === 'small' && 'text-base',
              labelVariant === 'medium' && 'text-lg',
              'text-gray-600',
              labelClassName
            )}
          >
            {label}
          </span>
          <div
            className={twMerge(
              'theme-bg-color relative flex h-3 w-3 cursor-help items-center justify-center rounded-full text-[10px] font-bold text-white',
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
          'input-wrapper doctor:input-container-doctor flex h-12 w-full items-center rounded-lg border border-transparent px-4 font-poppins text-xs sm:text-sm md:text-base transition duration-150',
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
        {icon && (
          <Icon
            size={iconSize}
            name={icon}
            color={iconColor}
            className={primaryIconClassName}
            onClick={primaryOnClick}
          />
        )}
        <input
          {...props}
          {...hookProps}
          className={twMerge(
            'h-full w-full select-none rounded-lg py-4 text-[12px] sm:text-sm md:text-base font-semibold text-gray-600 outline-none placeholder:font-normal placeholder:text-gray-400 disabled:bg-gray-200/10', // Adjusted placeholder color
            icon ? 'px-4' : 'px-0',
            props?.disabled && 'cursor-not-allowed',
            inputClassName
          )}
          placeholder={props.placeholder || 'Enter text here...'} // Ensure there's a placeholder
        />
        {loading ? (
          <CircleSpinner
            color={
              user.role?.toLowerCase()
                ? roleColors[
                user.role?.toLowerCase() as keyof typeof roleColors
                ]
                : '#000000'
            }
            size={18} // Increased spinner size
          />
        ) : (
          secondaryIcon && (
            <Icon
              size={iconSize}
              name={secondaryIcon}
              color={iconColor}
              className={secondaryIconClassName}
              onClick={secondaryOnClick}
            />
          )
        )}
      </div>
      {errorMessage && (
        <span
          className={twMerge(
            'font-medium text-rose-500',
            errorClassName
          )}
        >
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

export default InputBasic;
