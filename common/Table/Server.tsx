'use server';

import type { ServerComponentProps } from '@types';
import type { TableProps } from './types';
import { twMerge } from 'tailwind-merge';

const Server: ServerComponentProps<TableProps> = async ({
  heads,
  children,
  className,
}) => {
  return (
    <table className="w-full text-left text-xs sm:text-sm md:text-base text-gray-700">
      <thead
        className={twMerge(
          'text-xs sm:text-sm md:text-base uppercase text-white superadmin:bg-theme-superadmin-primary admin:bg-theme-admin-primary doctor:bg-theme-doctor-primary patient:bg-theme-patient-primary nurse:bg-theme-nurse-primary',
          className
        )}
      >
        <tr>
          {heads.map((el, i) => (
            <th
              key={i}
              scope="col"
              className="px-3 py-2 sm:px-6 sm:py-4 md:px-6 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xls"
            >
              {el}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl '>{children}</tbody>
    </table>
  );
};

export default Server;
