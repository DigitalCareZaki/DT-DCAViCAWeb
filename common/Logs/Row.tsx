'use client';

import Image from 'next/image';

import type { ClientComponentProps } from '@types';
import { getName, getProfilePicture } from '@init-globals';
import { twMerge } from 'tailwind-merge';

const Row: ClientComponentProps<any> = ({ ...el }) => {
  const name = getName({ ...el?.user });

  return (
    <tr
      key={el.id}
      className="cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200"
    >
      <th
        scope="row"
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
      >
        <div className="relative h-10 w-10 rounded-full">
          <Image
            src={getProfilePicture(el?.user?.uri)}
            alt="profile-picture"
            className="h-full w-full rounded-full object-cover"
            fill
          />
        </div>
      </th>
      <td className="px-6 py-4">{name?.length ? name : 'Guest'}</td>
      <td className="px-6 py-4">
        <div
          className={twMerge(
            'h-fit w-fit rounded-lg p-2 text-center text-xs font-semibold text-white',
            el?.user?.role === 'DOCTOR' && 'bg-blue-200 text-blue-500',
            el?.user?.role === 'PATIENT' && 'bg-rose-200 text-rose-500',
            el?.user?.role === 'ADMIN' && ' bg-purple-200 text-purple-400',
            el?.user?.role === 'NURSE' && ' bg-orange-200 text-orange-400',
            el?.user?.role === 'MASTER' && 'bg-black text-white',
            el?.user?.role === 'SUPERADMIN' && 'bg-green-200 text-green-500',
            !el?.user?.role && 'bg-gray-200 text-gray-500'
          )}
        >
          {el?.user?.role ?? 'Guest'}
        </div>
      </td>
      <td className="px-6 py-4">{el?.user?.email ?? 'N/A'}</td>
      <td className="px-6 py-4">{el?.method ?? 'N/A'}</td>
      <td className="px-6 py-4">{el?.module ?? 'N/A'}</td>
      <td className="px-6 py-4">{el?.platform}</td>
      <td className="px-6 py-4">{el?.endpoint?.slice(0, 41)}</td>
      <td className="px-6 py-4">
        {new Date(el?.created_at).toDateString() +
          '-' +
          new Date(el?.created_at).toLocaleTimeString('en', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
      </td>
    </tr>
  );
};

export default Row;
