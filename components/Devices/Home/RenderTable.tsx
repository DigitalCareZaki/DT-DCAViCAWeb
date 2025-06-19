'use server';

import { IoMedical } from '@react-icons/all-files/io5/IoMedical';

import Link from 'next/link';

import { getName } from '@init-globals';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const RenderTable: ServerComponentProps<Props> = async ({ userRole, data }) => {

  console.log('RenderTable data:', data);

  return (
    <>
      {data.map((el) => (
        <tr
          key={el.id}
          className="cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200"
        >
          <th
            scope="row"
            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
          >
            <Link
              passHref
              href={`/${userRole}/devices/edit?id=${el.id}`}
              className="hover:underline hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-admin-primary hover:doctor:text-theme-doctor-primary hover:nurse:text-theme-nurse-primary"
            >
              {el.title}
            </Link>
          </th>
          <td className="px-6 py-4">{el.serial_number}</td>
          <td className="px-6 py-4">{el.description}</td>
          <td className="px-6 py-4">{el.category}</td>
          <td className="px-6 py-4">
            {getName({
              ...el.created_by,
            })}
          </td>
          <td className="px-6 py-4">{el.assigned ? 'Assigned' : 'Not Assigned'}</td>
          <td className="px-6 py-4">
            {new Date(el.created_at).toLocaleString()}
          </td>
          <td className="px-6 py-4">
            {el.assigned ? (
              <IoMedical
                title="Already Assigned"
                className="text-gray-400 cursor-not-allowed"
                style={{ pointerEvents: 'none', opacity: 0.5 }}
              />
            ) : (
              <Link passHref href={`/${userRole}/devices/assign/?id=${el.id}`}>
                <IoMedical
                  title="Manage Patients"
                  className="hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-admin-primary hover:doctor:text-theme-doctor-primary hover:nurse:text-theme-nurse-primary"
                />
              </Link>
            )}
          </td>
        </tr>
      ))}
    </>
  );
};

export default RenderTable;
