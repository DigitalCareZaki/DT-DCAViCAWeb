'use client';

import { useSelector } from 'react-redux';

import { IoEye } from '@react-icons/all-files/io5/IoEye';

import type { ClientComponent } from '@types';
import type { ReduxProps, StoreSuperAdminState } from '@store-types';

const RenderTable: ClientComponent = () => {
  const { branches } = useSelector<ReduxProps, StoreSuperAdminState>(
    (state) => state.superadmin
  );

  return (
    <>
      {branches.map((el) => (
        <tr
          key={el.id}
          className="cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200"
        >
          <th
            scope="row"
            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
          >
            {el.name}
          </th>
          <td className="px-6 py-4">{el.email}</td>
          <td className="px-6 py-4">{el.phone_number}</td>
          <td className="px-6 py-4">{el.location.address}</td>
          <td className="px-6 py-4">{el.created_by}</td>
          <td className="px-6 py-4">
            <IoEye title="View Branch" className="theme-text-color" size={18} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default RenderTable;
