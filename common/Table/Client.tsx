'use client';

import { useState } from 'react';

import type { ClientComponentProps } from '@types';
import type { TableProps } from './types';
import { twMerge } from 'tailwind-merge';

const Client: ClientComponentProps<TableProps> = ({
  heads,
  children,
  className,
}) => {
  return (
    <table
      className={twMerge('min-w-full w-full text-left text-xs text-gray-500', className)}
    >
      <thead className={twMerge('theme-bg-color text-xs uppercase text-white')}>
        <tr>
          {heads.map((el, i) => (
            <th key={i} scope="col" className="px-6 py-3 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              {el}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
        {children}
      </tbody>
    </table>
  );
};

export default Client;