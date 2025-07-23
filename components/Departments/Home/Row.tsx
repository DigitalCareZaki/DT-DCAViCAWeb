'use client';

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
    </tr>
  );
};

export default Row;
