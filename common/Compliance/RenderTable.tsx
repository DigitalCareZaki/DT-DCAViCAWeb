'use client';

import { twMerge } from 'tailwind-merge';

import type { ComplianceRenderProps } from './types';
import type { ClientComponentProps } from '@types';

type RenderTableProps = {
  selectedPatient: string;
  setData: (id: string) => void;
} & ComplianceRenderProps;

const RenderTable: ClientComponentProps<any> = ({
  data,
  selectedPatient,
  setData,

}) => {


  return (
    <>
      {data?.data?.map((el: any, i: number) => (
        <tr
          key={i}
          className={twMerge(
            'cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200',
            selectedPatient === el?.patient?.id && 'cursor-default'
          )}
          onClick={() => setData(el?.patient?.id)}
        >
          <th
            scope="row"
            className={twMerge(
              'whitespace-nowrap px-6 py-4 font-medium text-gray-900',
              selectedPatient === el?.patient?.id &&
              'doctor:text-theme-doctor-primary nurse:text-theme-nurse-primary'
            )}
          >
            {`${el?.patient?.first_name || ''} ${el?.patient?.middle_name || ''} ${el?.patient?.last_name || ''}`}
          </th>
          <td className="px-6 py-4">{el?.patient?.email || 'N/A'}</td>
          <td className="px-6 py-4">{el?.emr || 'No EMR'}</td>
        </tr>
      ))}
      {/* old code  */}
      {/* {data?.map((el:any, i:any) => (
        <tr
          key={i}
          className={twMerge(
            'cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200',
            selectedPatient === el?.user?.id && 'cursor-default'
          )}
          onClick={() => setData(el?.user?.id)}
        >
          <th
            scope="row"
            className={twMerge(
              'whitespace-nowrap px-6 py-4 font-medium text-gray-900',
              selectedPatient === el?.user?.id &&
              'doctor:text-theme-doctor-primary nurse:text-theme-nurse-primary'
            )}
          >
            {`${el?.user?.first_name} ${el?.user?.middle_name || ''} ${el?.user?.last_name}`}
          </th>
          <td className="px-6 py-4">{el?.user?.email}</td>
          <td className="px-6 py-4">{el?.emr}</td>
        </tr>
      ))} */}
    </>
  );
};

export default RenderTable;
