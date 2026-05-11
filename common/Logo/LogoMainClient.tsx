'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import {
  logoAvicaBlue,
  logoAvicaOrange,
  logoAvicaPatient,
  logoAvicaAdmin,
} from '@assets';
import { useUser } from '@selectors';

import type { LogoPrimaryProps } from './types';

export default function LogoAvicaClient({
  variant = 'small',
  svgColor,
}: LogoPrimaryProps): JSX.Element {
  const [{ type: userType }] = useUser();
  const logoAvicaGreenMask =
    typeof logoAvicaBlue === 'string' ? logoAvicaBlue : logoAvicaBlue.src;

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

  if (userType === 'MASTER') {
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

  if (userType === 'DOCTOR') {
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

  if (userType === 'NURSE') {
    return (
      <div className="relative h-10 w-20">
        <Image
          src={logoAvicaOrange}
          alt="avica"
          fill
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  if (userType === 'PATIENT') {
    return (
      <div className="relative h-10 w-20">
        <Image
          src={logoAvicaPatient}
          alt="avica"
          fill
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  if (userType === 'ADMIN') {
    return (
      <div className="relative h-10 w-20">
        <Image
          src={logoAvicaAdmin}
          alt="avica"
          fill
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  if (userType === 'SUPERADMIN') {
    return (
      <div
        aria-label="avica"
        className="h-10 w-20 bg-theme-superadmin-primary"
        style={{
          WebkitMaskImage: `url(${logoAvicaGreenMask})`,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          WebkitMaskSize: 'contain',
          maskImage: `url(${logoAvicaGreenMask})`,
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          maskSize: 'contain',
        }}
      />
    );
  }

  return <></>;
}
