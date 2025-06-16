'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { Icon } from '../Icon';
import { AnimatePresence, motion } from 'framer-motion';

import type { ClientComponentProps } from '@types';
import type { DropdownSecondaryProps } from './types';

const DropdownSecondary: ClientComponentProps<any> = ({
  labelVariant,
  label,
  hideInfo,
  error,
  borderTheme,
  defaultBorder,
  inputWrapperClassName,
  disabled,
  title,
  iconSize,
  icon,
  iconColor,
  children,
  errorMessage,
  selected,
  disableMessage,
  labelClassName,
  titleClassName,
  errorClassName,
  dropdownContentClassName, // add new prop
}) => {
  const [show, setShow] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShow(false);
  }, [selected]);

  const handleShow = useCallback(() => {
    if (disabled) return;

    setShow((prev) => !prev);
  }, [disabled]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      title={disabled ? disableMessage : title}
      className="relative flex w-full flex-col gap-2 text-lg"
    >
      {label && (
        <div className="flex items-center gap-2">
          <span
            className={twMerge(
              'text-sx font-medium text-gray-500',
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
              'theme-bg-color flex h-3 w-3 items-center justify-center rounded-full text-[10px] font-bold text-white',
              hideInfo && 'hidden'
            )}
          >
            <span>!</span>
          </div>
        </div>
      )}
      <div
        onClick={handleShow}
        className={twMerge(
          'input-wrapper doctor:input-container-doctor flex h-10 w-full cursor-pointer items-center  gap-2 rounded-lg border border-transparent px-4 font-poppins text-xs transition duration-150 hover:bg-gray-200',
          error
            ? 'superadmin:border-rose-500 doctor:border-rose-500 nurse:border-rose-500'
            : 'input-container',
          borderTheme &&
          'border-[1px] superadmin:focus-within:border-theme-superadmin-primary doctor:focus-within:border-theme-doctor-primary nurse:focus-within:border-theme-nurse-primary',
          disabled ? 'cursor-not-allowed bg-gray-200/10' : 'bg-white',
          defaultBorder && 'border-[1px] border-gray-300',
          inputWrapperClassName
        )}
        ref={dropdownRef}
      >
        <>
          {icon && <Icon size={iconSize || 20} name={icon} color={iconColor} />}
          <div className="flex w-full items-center justify-between">
            <span className={twMerge('text-gray-500 text-lg', titleClassName)}>
              {selected ? selected : title}
            </span>
            <Icon
              size={iconSize || 20}
              name={'IoIosArrowForward'}
              color={iconColor}
            />
          </div>
        </>
      </div>
      {errorMessage && (
        <span
          className={twMerge(
            'text-ssx font-medium text-rose-500',
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
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{
              height: 0,
              top: 100,
              opacity: 1,
            }}
            animate={{
              height: 750, // Increased height for more visible cities
              top: 80,
              opacity: 1,
            }}
            exit={{
              top: 100,
              opacity: 0,
              height: 180,
            }}
            className={twMerge(
              "hidescrollbar absolute z-[99999] flex h-[200px] w-full flex-col gap-4 overflow-y-scroll rounded-xl bg-background p-4",
              dropdownContentClassName // merge custom class
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownSecondary;
