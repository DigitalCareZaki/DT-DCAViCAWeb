'use client';

import Image from 'next/image';

import type { ClientComponentProps } from '@types';
import { getName, getProfilePicture, timeAgo } from '@init-globals';
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
      <td className="px-6 py-4">{el?.user?.email ?? 'N/A'}</td>
      <td className="px-6 py-4">{el?.subject ?? 'N/A'}</td>
      <td className="px-6 py-4">
        <div
          className={twMerge(
            'flex h-fit w-fit items-center justify-center rounded-lg p-2 text-[10px] font-semibold',
            el?.sended
              ? 'bg-green-200 text-green-500'
              : 'bg-rose-200 text-rose-500'
          )}
        >
          <span>{el?.sended ? 'Success' : 'Failed'}</span>
        </div>
      </td>
      <td className="w-32 px-6 py-4">
        <span className="w-32">{el?.error ?? 'None'}</span>
      </td>
      <td className="px-6 py-4">
        {timeAgo(new Date(el?.created_at).getTime())}
      </td>
    </tr>
  );
};

export default Row;
