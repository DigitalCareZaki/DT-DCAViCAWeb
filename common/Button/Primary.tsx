'use client';

import { twMerge } from 'tailwind-merge';
import { CircleSpinner } from 'react-spinners-kit';

import { Icon } from '../Icon';

import type { ButtonPrimary as Props } from './types';

export default function ButtonPrimary({
  name,
  loading,
  variant = 'name',
  icon,
  outlined,
  ...props
}: Props): JSX.Element {
  const render = {
    loading: <CircleSpinner size={20} color="#fff" />,
    name,
    icon: (
      <div className="flex items-center gap-2">
        <span className="">{name}</span>
        <Icon
          name={icon ?? 'IoIosArrowForward'}
          size={30}
          style={{ color: '#fff' }}
        />
      </div>
    ),
    'icon-only': (
      <Icon
        name={icon ?? 'IoIosArrowForward'}
        size={16}
        style={{ color: '#fff' }}
      />
    ),
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={twMerge(
        'theme-bg-color flex h-11 w-full items-center justify-center rounded-lg text-xs font-semibold text-white transition duration-300 hover:shadow-xl',
        props.className,
        outlined && 'bg-white doctor:bg-white patient:bg-white nurse:bg-white'
      )}
    >
      {render[loading ? 'loading' : variant]}
    </button>
  );
}
