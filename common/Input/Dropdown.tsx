'use client';

import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleSpinner } from 'react-spinners-kit';
import { twMerge } from 'tailwind-merge';

import { useUser } from '@selectors';
import { roleColors } from '@constants';

import InputBasic from './Basic';

import type { ClientComponentProps } from '@types';
import type { DropdownProps } from './types';

const Dropdown: ClientComponentProps<DropdownProps> = ({
  loading,
  loadingSpinnerColor,
  children,
  onChange,
  selected,
  placeholder,
  label,
  title,
  overrideShow,
  onClear,
  labelClassName,
  hideInfo,
  inputClassName,
  inputWrapperClassName,
  icon,
  iconColor,
  dropdownClassName,
  error,
  errorMessage,
}) => {
  const [user] = useUser();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (selected === undefined) return;

    setValue(selected);
  }, [selected]);

  useEffect(() => {
    if (overrideShow === 0) return;

    setShow(!overrideShow);
  }, [overrideShow]);

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

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length) setShow(true);
      if (!event.target.value.length) {
        onClear?.call(this);
        setShow(false);
      }

      setValue(event.target.value);

      return onChange?.call(this, event);
    },
    [onChange, onClear]
  );

  return (
    <div className="relative flex w-full flex-col gap-4">
      <div ref={dropdownRef}>
        <InputBasic
          label={label}
          placeholder={placeholder}
          borderTheme
          labelVariant="medium"
          title={title}
          defaultBorder
          onChange={handleChange}
          value={value}
          labelClassName={labelClassName}
          hideInfo={hideInfo}
          inputClassName={inputClassName}
          inputWrapperClassName={inputWrapperClassName}
          icon={icon}
          iconColor={iconColor}
          error={error}
          errorMessage={errorMessage}
        />
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 1,
            }}
            exit={{
              y: 10,
              opacity: 0,
            }}
            className={twMerge(
              'hidescrollbar absolute top-20 z-50 flex h-80 w-full flex-col gap-2 overflow-y-scroll rounded-lg bg-gray-100 p-2',
              loading && 'items-center justify-center',
              dropdownClassName
            )}
          >
            {loading ? (
              <CircleSpinner
                size={20}
                color={
                  loadingSpinnerColor ??
                  roleColors[
                  user.role?.toLowerCase() as keyof typeof roleColors
                  ] ??
                  '#d946ef'
                }
              />
            ) : (
              children
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
