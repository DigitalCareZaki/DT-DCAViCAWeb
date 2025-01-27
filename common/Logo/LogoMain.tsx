'use server';

import Image from 'next/image';
import { logoAvicaBlue } from '@assets';
import { twMerge } from 'tailwind-merge';

import type { LogoPrimaryProps } from './types';

export default async function LogoAvica({
  variant = 'small',
  svgColor,
}: LogoPrimaryProps): Promise<JSX.Element> {
  if (variant === 'xl') {
    return (
      <div className="relative h-52 w-52">
        <Image
          src={logoAvicaBlue}
          alt="avica"
          fill
          className={twMerge(
            'h-full w-full object-contain',
            svgColor === 'white' && 'svg-white'
          )}
        />
      </div>
    );
  }

  if (variant === 'large') {
    return (
      <div className="relative h-40 w-40">
        <Image
          src={logoAvicaBlue}
          alt="avica"
          fill
          className={twMerge(
            'h-full w-full object-contain',
            svgColor === 'white' && 'svg-white'
          )}
        />
      </div>
    );
  }

  return (
    <div className="relative h-10 w-20">
      <Image
        src={logoAvicaBlue}
        alt="avica"
        fill
        className="h-full w-full object-contain"
      />
    </div>
  );
}
