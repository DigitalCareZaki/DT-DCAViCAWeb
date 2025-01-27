'use client';

import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import type { InputSelectProps } from './types';

export default function Select({
  value,
  theme,
  white,
  ...props
}: InputSelectProps): JSX.Element {
  const [selected, setSelected] = useState<boolean>(!!value);

  useEffect(() => {
    if (value === undefined) return;
    setSelected(!!value);
  }, [value]);

  const handleSelect = (e: unknown) => {
    setSelected((props) => !props);

    props?.onClick && props.onClick(e as any);
  };

  return (
    <div
      onClick={handleSelect}
      {...props}
      className={twMerge(
        'flex h-4 w-4 cursor-pointer items-center justify-center rounded-[5px] border-[1.4px] p-[2px]',
        theme &&
          'doctor:border-theme-doctor-primary nurse:border-theme-nurse-primary',
        white && 'border-t-white',
        !(theme || white) && 'border-secondary'
      )}
    >
      {selected && (
        <div
          className={twMerge(
            'h-full w-full rounded-[2px] bg-secondary',
            theme && 'theme-bg-color',
            white && 'bg-white'
          )}
        />
      )}
    </div>
  );
}
