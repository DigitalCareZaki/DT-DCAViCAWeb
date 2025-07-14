'use client';

import Image from 'next/image';

import type { ClientComponentProps } from '@types';
import { getName, getProfilePicture } from '@init-globals';
import { twMerge } from 'tailwind-merge';

const Row: ClientComponentProps<any> = ({ ...el }) => {
  const name = getName({ ...el?.reciever });

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
            src={getProfilePicture(el?.reciever?.uri)}
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
            el?.reciever?.role === 'DOCTOR' && 'bg-blue-200 text-blue-500',
            el?.reciever?.role === 'PATIENT' && 'bg-rose-200 text-rose-500',
            el?.reciever?.role === 'ADMIN' && ' bg-purple-200 text-purple-400',
            el?.reciever?.role === 'NURSE' && ' bg-orange-200 text-orange-400',
            el?.reciever?.role === 'SUPERADMIN' && 'bg-green-200 text-green-500'
          )}
        >
          {el?.reciever?.role ?? 'N/A'}
        </div>
      </td>
      <td className="px-6 py-4">{el?.reciever?.email ?? 'N/A'}</td>
      <td className="px-6 py-4">{el?.title ?? 'N/A'}</td>
      <td className="px-6 py-4">{el?.description ?? 'N/A'}</td>
      <td className="px-6 py-4">{new Date(el?.created_at).toDateString()}</td>
    </tr>
  );
};

export default Row;
