'use client';

import { FaEdit } from '@react-icons/all-files/fa/FaEdit';
import { FaPencilAlt } from '@react-icons/all-files/fa/FaPencilAlt';

import Link from 'next/link';

import { getName } from '@init-globals';

import type { ClientComponentProps } from '@types';
import type { Props } from './types';

const RenderTable: ClientComponentProps<Props> = ({ userRole, data }) => {
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
              href={`/${userRole}/tablets/edit?id=${el.id}`}
              className="hover:underline hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-admin-primary hover:doctor:text-theme-doctor-primary hover:nurse:text-theme-nurse-primary"
            >
              {el.title}
            </Link>
          </th>
          <td className="px-6 py-4">{el.serial_number}</td>
          {/* <td className="px-6 py-4">{el.category}</td> */}
          <td className="px-6 py-4">
            {getName({
              ...el.created_by,
            })}
          </td>
          <td className="px-6 py-4">{el.branch.name}</td>
          <td className="px-6 py-4">{el?.patient_tablets[0]?.issued_to ? 'Assigned' : 'Not Assigned'}</td>
          <td className="px-6 py-4">
            {new Date(el.created_at).toLocaleString()}
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              {/* Edit Accessories Icon */}
              <Link passHref href={`/${userRole}/tablets/edit-accessory?id=${el.id}`}>
                <FaPencilAlt
                  title="Edit Accessories"
                  className="text-lg hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-admin-primary hover:doctor:text-theme-doctor-primary hover:nurse:text-theme-nurse-primary"
                />
              </Link>

              {/* Assign Tablet Icon */}
              <Link passHref href={`/${userRole}/tablets/assign/?id=${el.id}`}>
                <FaEdit
                  title="Assign Tablet"
                  className="hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-admin-primary hover:doctor:text-theme-doctor-primary hover:nurse:text-theme-nurse-primary"
                />
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default RenderTable;
