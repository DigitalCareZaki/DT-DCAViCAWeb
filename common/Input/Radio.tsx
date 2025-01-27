'use client';

import { twMerge } from 'tailwind-merge';

import type { ClientComponentProps } from '@types';
import type { InputRadioProps } from './types';

const InputRadio: ClientComponentProps<InputRadioProps> = ({
  hookProps,
  error,
  errorMessage,
  label,
  borderTheme,
  labelVariant,
  hideInfo,
  ...props
}) => {
  return (
    <div className="flex w-full flex-col gap-2 text-xs">
      {label && (
        <div className="flex items-center gap-2">
          <span
            className={twMerge(
              'text-sx font-medium text-gray-500',
              labelVariant === 'tiny' && 'text-sx',
              labelVariant === 'small' && 'text-sx',
              labelVariant === 'medium' && 'text-base',
              'text-gray-600'
            )}
          >
            {label}
          </span>
          <div
            className={twMerge(
              'flex h-3 w-3 items-center justify-center rounded-full bg-t-color-secondary text-[10px] font-bold text-white',
              hideInfo && 'hidden'
            )}
          >
            <span>!</span>
          </div>
        </div>
      )}
      <div
        className={twMerge(
          'input-wrapper flex h-10 w-full items-center rounded-lg border border-transparent px-4 font-poppins text-xs transition duration-150',
          error ? 'border-rose-500' : 'input-container',
          borderTheme && 'input-container-doctor',
          props.disabled ? 'bg-gray-200/10' : 'bg-white'
        )}
      >
        <input
          {...props}
          {...hookProps}
          type="radio"
          className={twMerge(
            'h-4 w-4 border-transparent py-4 accent-t-color-secondary ring-transparent disabled:bg-gray-200/10',
            props?.disabled && 'cursor-not-allowed'
          )}
        />
      </div>
      {errorMessage && (
        <span className="text-ssx font-medium text-rose-500">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default InputRadio;
