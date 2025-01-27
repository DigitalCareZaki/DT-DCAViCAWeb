'use client';
import { useCallback, useMemo, useState, memo } from 'react';

import { twMerge } from 'tailwind-merge';

import { Icon } from '../Icon';
import type { InputBaseProps } from './types';

export default memo(function InputPrimary({
  iconSize = 16,
  icon,
  password,
  hookProps,
  borderTheme,
  error,
  errorMessage,
  validatorErrors,
  ...props
}: InputBaseProps): JSX.Element {
  const [showText, setShowText] = useState<boolean>(false);

  const showPasswordState: 'show' | 'hide' | 'none' = useMemo(() => {
    if (password === undefined || password === null) return 'none';
    if (showText) return 'show';
    return 'hide';
  }, [password, showText]);

  const toggleTextState = useCallback(() => {
    setShowText((prev) => !prev);
  }, []);

  const showPassword = {
    show: (
      <Icon
        name="FaEye"
        size={18}
        style={{ cursor: 'pointer' }}
        onClick={toggleTextState}
      />
    ),
    hide: (
      <Icon
        name="FaEyeSlash"
        size={18}
        style={{ cursor: 'pointer' }}
        onClick={toggleTextState}
      />
    ),
    none: <></>,
  };

  return (
    <div className={'group relative w-full'}>
      {validatorErrors && validatorErrors.length > 0 && (
        <div className="absolute right-full top-0 z-[99999] mr-5 hidden h-fit w-96 rounded-xl border-2 border-black bg-white p-4 text-black group-focus-within:block">
          <p className="mb-2 text-sm font-bold uppercase text-primary">
            Prompt
          </p>
          <span>
            {validatorErrors.map((item, idx) => (
              <p className="text-xs" key={idx}>{`${idx + 1}. ${item}`}</p>
            ))}
          </span>
        </div>
      )}

      <div className="flex w-full flex-col gap-2">
        <div
          className={twMerge(
            'group flex h-12 w-full items-center rounded-xl border bg-white px-4 font-poppins text-xs shadow-md transition duration-150',
            borderTheme
              ? 'border-[1px] superadmin:focus-within:border-theme-superadmin-primary doctor:focus-within:border-theme-doctor-primary patient:focus-within:border-theme-patient-primary nurse:focus-within:border-theme-nurse-primary '
              : 'input-container',
            error && 'border-rose-500'
          )}
        >
          {icon && <Icon size={iconSize} name={icon} />}
          <input
            {...props}
            {...hookProps}
            type={showText ? 'text' : password ? 'password' : props.type}
            className="h-full w-full select-none rounded-xl p-4 outline-none placeholder:font-normal placeholder:text-gray-300"
          />
          {showPassword[showPasswordState]}
        </div>
        <span className="text-ssx font-medium text-rose-500">
          {errorMessage}
        </span>
      </div>
    </div>
  );
});
