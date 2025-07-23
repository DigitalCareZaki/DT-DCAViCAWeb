'use client';
import Link from 'next/link';
import { MdCheck } from '@react-icons/all-files/md/MdCheck';
import type { Props } from './types';

import { getName } from '@init-globals';

const RenderTable = ({ data, userType }: Props) => {
  return (
    <>
      {data.map((el, i) => (
        <tr
          key={i}
          className="cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200"
        >
          <th
            scope="row"
            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
          >
            <Link
              passHref
              href={`/${userType}/patient/profile?patient=${el?.id}`}
              className="hover:underline hover:admin:text-theme-admin-primary hover:nurse:text-theme-nurse-primary"
            >
              {getName({
                first_name: el?.first_name as string,
                last_name: el?.last_name as string,
                middle_name: el?.middle_name as string,
              })}
            </Link>
          </th>
          <td className="px-6 py-4">{el?.email}</td>
          <td className="px-6 py-4">{el?.patient.emr}</td>
          <td className="px-6 py-4">
            {getName({
              first_name: el?.patient?.first_assigned_doctor?.user.first_name as string,
              last_name: el?.patient?.first_assigned_doctor?.user.last_name as string,
              middle_name: el?.patient?.first_assigned_doctor?.user?.middle_name as string,
            })}
          </td>
          <td className="px-6 py-4">{el.patient?.doctors?.[0]?.departments?.[0]?.title}</td>

          {/* <td className="px-6 py-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full text-white admin:bg-theme-admin-primary nurse:bg-theme-nurse-primary">
              <MdCheck size={14} color="purple" />
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full text-white admin:bg-theme-admin-primary nurse:bg-theme-nurse-primary">
              <MdCheck size={14} color="purple" />
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full text-white admin:bg-theme-admin-primary nurse:bg-theme-nurse-primary">
              <MdCheck size={14} color="purple" />
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full text-white admin:bg-theme-admin-primary nurse:bg-theme-nurse-primary">
              <MdCheck size={14} color="purple" />
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full text-white admin:bg-theme-admin-primary nurse:bg-theme-nurse-primary">
              <MdCheck size={14} color="purple" />
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full text-white admin:bg-theme-admin-primary nurse:bg-theme-nurse-primary">
              <MdCheck size={14} color="purple" />
            </div>
          </td> */}
          <td className="px-6 py-4">{el?.patient.height}</td>
          <td className="px-6 py-4">{el?.patient.weight}</td>
        </tr>
      ))}
    </>
  );
};

export default RenderTable;
