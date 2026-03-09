'use client';

import { useSelector } from 'react-redux';

import { getName } from '@init-globals';

import type { ClientComponent } from '@types';
import type { ReduxProps, StorePatientState } from '@store-types';

const RenderTable: ClientComponent = () => {
  const { patientNurseListing } = useSelector<ReduxProps, StorePatientState>(
    (state) => state.patients
  );

  return (
    <>
      {patientNurseListing.map((el) => (
        <tr
          key={el.user.email}
          className="cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200"
        >
          <th
            scope="row"
            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
          >
            {getName(el.user)}
          </th>
          <td className="px-6 py-4">
            {el.departments?.map((d) => d.title).join(', ')}
          </td>
          <td className="px-6 py-4">{el.user.email}</td>
          <td className="px-6 py-4">{el.user.phone_number}</td>
        </tr>
      ))}
    </>
  );
};

export default RenderTable;
