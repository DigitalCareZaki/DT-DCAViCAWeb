'use client';

import { useSelector } from 'react-redux';

import { getName } from '@init-globals';

import type { ClientComponent } from '@types';
import type { ReduxProps, StorePatientState } from '@store-types';

const RenderTable: ClientComponent = () => {
  const { setPatientAppointmentsListing } = useSelector<any, any>(
    (state) => state.patients
  );

  console.log('testing Check>>>', setPatientAppointmentsListing);

  return (
    <>
      {setPatientAppointmentsListing?.map((el: any) => {
        const appointment = el?.appointment;
        const organizer = appointment?.organizer;

        return (
          <tr
            key={el?.id}
            className="cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200"
          >
            <td className="px-6 py-4">{appointment?.title}</td>
            <td className="px-6 py-4">{appointment?.description || 'N/A'}</td>
            <td className="px-6 py-4">{appointment?.type}</td>
            <td className="px-6 py-4">
              {new Date(appointment?.start_date).toLocaleDateString()}
            </td>
            <td className="px-6 py-4">
              {new Date(appointment?.end_date).toLocaleDateString()}
            </td>
            <td className="px-6 py-4">{el?.status}</td>
            <td className="px-6 py-4">
              {organizer?.first_name} {organizer?.last_name}
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default RenderTable;
