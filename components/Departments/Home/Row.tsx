'use client';

import Link from 'next/link';
import type { ClientComponentProps } from '@types';
import { FaEdit } from '@react-icons/all-files/fa/FaEdit';

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
      <td className="px-6 py-4">
        <Link href={`/admin/departments/${el.id}/edit`} className="text-primary-600 hover:text-primary-800" title="Edit">
          <FaEdit
            title="Edit Department"
            className="hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-admin-primary hover:doctor:text-theme-doctor-primary hover:nurse:text-theme-nurse-primary"
          />
        </Link>
      </td>
    </tr>
  );
};

export default Row;
