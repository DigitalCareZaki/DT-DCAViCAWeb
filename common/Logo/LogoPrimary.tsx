'use server';

import { logoPrimary } from '@assets';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import type { LogoPrimaryProps } from './types';

export default async function LogoPrimary({
  variant = 'large',
  svgColor,
}: LogoPrimaryProps): Promise<JSX.Element> {
  if (variant === 'small') {
    return (
      <div className="w-28 h-[52px] relative">
        <Image
          src={logoPrimary}
          alt="logo-primary"
          className={twMerge(
            'w-full h-full object-cover',
            svgColor === 'white' && 'svg-white'
          )}
          fill
        />
      </div>
    );
  }

  if (variant === 'large') {
    return (
      <div className="w-40 h-32 relative">
        <Image
          src={logoPrimary}
          alt="logo-primary"
          className={twMerge(
            'w-full h-full object-contain',
            svgColor === 'white' && 'svg-white'
          )}
          fill
        />
      </div>
    );
  }

  return <></>;
}
