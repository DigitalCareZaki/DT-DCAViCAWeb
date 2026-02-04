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
    <div className="w-full overflow-x-auto rounded-lg shadow-sm border border-gray-100">
      <table
        className={twMerge(
          'min-w-full w-full text-left text-sx text-gray-600 border-collapse',
          className
        )}
      >
        <thead className="bg-[#0070FA] text-xs uppercase text-white font-bold sticky top-0 z-10">
          <tr>
            {heads.map((el, i) => (
              <th
                key={i}
                scope="col"
                className="px-6 py-4 whitespace-nowrap tracking-wider font-semibold"
              >
                {el}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Client;
