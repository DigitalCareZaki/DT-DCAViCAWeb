'use client';

import Link from 'next/link';

import { twMerge } from 'tailwind-merge';

import type { FC } from 'react';
import type { CardProps, MeasurementCardType } from './types';

const getLink = (
  cardId: MeasurementCardType,
  userType: string | undefined,
  patient: string | null
): string => {
  if (userType === 'patient' || !patient) {
    return `?type=${cardId}`;
  }

  return `?patient=${patient}&type=${cardId}`;
};

const Card: FC<CardProps> = ({
  id,
  title,
  Icon,
  patient,
  type,
  userType,
}) => {
  return (
    <Link className="w-1/5" href={getLink(id, userType, patient)}>
      <div
        className={twMerge(
          'hover:theme-bg-color flex h-full w-full cursor-pointer flex-row items-center justify-center rounded-lg bg-white p-4 transition duration-150 hover:text-white',
          type == id && 'theme-bg-color text-white'
        )}
      >
        {Icon}
        <span className="ml-4 text-sx font-semibold">{title}</span>
      </div>
    </Link>
  );
};

export default Card;
