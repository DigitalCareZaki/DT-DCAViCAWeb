'use client';

import type { ClientComponentProps } from '@types';
import type { TableProps } from './types';

const RenderTable: ClientComponentProps<any> = ({ data }: any) => {
  return (
    <>
      {data.map((el: any) =>
        el.patient_medication_alerts.map((item: any) => (
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
              {new Date(el.start_date).toLocaleDateString()}
            </td>
            <td className="px-6 py-4">
              {new Date(el.end_date).toLocaleTimeString()}
            </td>
            <td className="px-6 py-4">
              {' '}
              {new Date(el.time).toLocaleTimeString()}
            </td>
            <td className="px-6 py-4">{el.dosage}</td>
            <td className="px-6 py-4">{el.frequency}</td>
            <td className="px-6 py-4">{item.taken}</td>
            <td className="px-6 py-4">
              {new Date(el.created_at).toLocaleString()}
            </td>
          </tr>
        ))
      )}
    </>
  );
};

export default RenderTable;
