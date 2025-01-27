'use client';

import Image from 'next/image';

import { getProfilePicture } from '@init-globals';

import type { ClientComponentProps } from '@types';

const Row: ClientComponentProps<any> = ({ ...el }) => {
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
            src={getProfilePicture(el?.uri)}
            alt="profile-picture"
            className="h-full w-full rounded-full object-cover"
            fill
          />
        </div>
      </th>
      <td className="px-6 py-4">{el?.name}</td>
      <td className="px-6 py-4">{el?.email ?? 'N/A'}</td>
      <td className="px-6 py-4">{el?.phone_number ?? 'N/A'}</td>
      <td className="px-6 py-4">{el?.website ?? 'N/A'}</td>
      <td className="px-6 py-4">{el?.location?.address ?? 'N/A'}</td>
      <td className="px-6 py-4">{el?.location?.city?.name ?? 'N/A'}</td>
      <td className="px-6 py-4">
        {el?.location?.city?.country?.name ?? 'N/A'}
      </td>
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
