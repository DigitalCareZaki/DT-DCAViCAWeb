'use client';

import type { ReduxProps, StorePatientState } from '@store-types';

import { RiEditCircleFill } from '@react-icons/all-files/ri/RiEditCircleFill';
import { RiDeleteBin4Fill } from '@react-icons/all-files/ri/RiDeleteBin4Fill';

import { useSelector } from 'react-redux';

export default function RenderTable(): JSX.Element {
  const { patientsContactsListings } = useSelector<
    ReduxProps,
    StorePatientState
  >((state) => state.patients);

  return (
    <>
      {patientsContactsListings.map((contact, i) => (
        <tr key={contact.id} className="border-b odd:bg-white even:bg-gray-50">
          <th
            scope="row"
            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
          >
            {contact.name}
          </th>
          <td className="px-6 py-4">{contact.email ?? 'N/A'}</td>
          <td className="px-6 py-4">{contact.number}</td>
          <td className="px-6 py-4">{contact.relationship}</td>
          <td className="px-6 py-4">
            <div className="theme-div flex items-center gap-4 bg-transparent font-medium doctor:bg-transparent nurse:bg-transparent">
              <>
                <RiEditCircleFill size={18} title="Edit contact" />
                <RiDeleteBin4Fill size={18} title="Delete contact" />
              </>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
