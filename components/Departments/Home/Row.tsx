'use client';

import { useState } from 'react';
import type { ClientComponentProps } from '@types';
import EditModal from './EditModal';

const Row: ClientComponentProps<any> = ({ ...el }) => {
  const [open, setOpen] = useState(false);
  return (
    <tr
      key={el.id}
      className="cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200"
    >
      <th
        scope="row"
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
      >
        {el.title}
      </th>
      <td className="px-20 py-4">{el.description}</td>
      {/* <td className="px-6 py-4">{el?.location?.address ?? 'N/A'}</td>
      <td className="px-6 py-4">{el.location.city.country.name ?? 'N/A'}</td> */}
      {/* <td className="px-6 py-4">{el.location.city.name ?? 'N/A'}</td> */}
      <td className="px-6 py-4">{el.branch.name ?? 'N/A'}</td>
      <td className="px-6 py-4">{el.doctor.length}</td>
      <td className="px-6 py-4">{el.nurse.length}</td>
      <td className="px-6 py-4">{new Date(el.created_at).toDateString()}</td>
      <td className="px-6 py-4">
        <button
          type="button"
          className="text-primary-600 hover:text-primary-800"
          onClick={() => setOpen(true)}
          title="Edit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97L7.5 19.789 3 21l1.211-4.5 12.651-12.013z" />
          </svg>
        </button>
        <EditModal open={open} onClose={() => setOpen(false)} department={el} />
      </td>
    </tr>
  );
};

export default Row;
