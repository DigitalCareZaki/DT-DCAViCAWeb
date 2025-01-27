'use client';

import { memo } from 'react';
import { CircleSpinner } from 'react-spinners-kit';

import { Icon } from '../Icon';

import type { InputBaseProps } from './types';

export default memo(function Outlined({
  iconSize = 16,
  icon,
  password,
  hookProps,
  error,
  errorMessage,
  loading,
  ...props
}: InputBaseProps): JSX.Element {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className={`w-full flex bg-white h-11 rounded-md text-xs font-poppins px-4 items-center border border-gray-300 duration-150 transition ${
          error ? 'border-rose-500' : 'input-container'
        } `}
      >
        {icon && <Icon name={icon} size={18} />}
        <input
          {...props}
          {...hookProps}
          className="w-full h-full p-4 px-2 outline-none rounded-md placeholder:text-gray-300 placeholder:font-normal select-none"
        />
        {loading && <CircleSpinner color="#30588d" size={12} />}
      </div>
      <span className="text-ssx text-rose-500 font-medium">{errorMessage}</span>
    </div>
  );
});
