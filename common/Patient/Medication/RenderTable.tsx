'use client';

import { useSelector } from 'react-redux';

import { RiEditCircleFill } from '@react-icons/all-files/ri/RiEditCircleFill';
import { RiDeleteBin4Fill } from '@react-icons/all-files/ri/RiDeleteBin4Fill';

import type { ClientComponent } from '@types';
import type { ReduxProps, StorePatientState } from '@store-types';

import { getName } from '@init-globals';

const RenderTable: ClientComponent = () => {
  const { patientMedicationListing } = useSelector<
    ReduxProps,
    StorePatientState
  >((state) => state.patients);

  return (
    <>
      {patientMedicationListing?.map((el) => (
        <tr
          key={el.id}
          className="cursor-pointer border-b transition duration-150 odd:bg-white even:bg-gray-50 hover:bg-gray-100"
        >
          <th
            scope="row"
            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
          >
            {el.name}
          </th>
          <td className="px-6 py-4">
            {new Date(el.start_date).toDateString()}
          </td>
          <td className="px-6 py-4">{new Date(el.end_date).toDateString()}</td>
          <td className="px-6 py-4">
            {new Date(el.time).toLocaleTimeString()}
          </td>
          <td className="px-6 py-4">{el.dosage}</td>
          <td className="px-6 py-4">{el.frequency} per day</td>
          <td className="px-6 py-4">{el.unit}</td>
          <td className="px-6 py-4">
            {'Dr. ' +
              getName({
                first_name: el.doctor.user.first_name,
                middle_name: el.doctor.user.middle_name,
                last_name: el.doctor.user.last_name,
              })}
          </td>
          <td className="px-6 py-4">
            {new Date(el.created_at).toLocaleString()}
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center gap-4 bg-transparent font-medium">
              <>
                <RiEditCircleFill size={18} title="Edit medication" />
                <RiDeleteBin4Fill size={18} title="Delete medication" />
              </>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default RenderTable;
