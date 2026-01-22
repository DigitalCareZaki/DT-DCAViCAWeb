'use client';

import { FaEdit } from '@react-icons/all-files/fa/FaEdit';

import Link from 'next/link';

import { getName } from '@init-globals';
import { updateDevice } from '@service';
import { useDispatch } from 'react-redux';
import { showModalReducer } from '@slice';
import { useState } from 'react';
import { MdSync } from '@react-icons/all-files/md/MdSync';

import type { ClientComponentProps } from '@types';
import type { Props } from './types';

const RenderTable: ClientComponentProps<Props> = ({ userRole, data }) => {
  const dispatch = useDispatch();
  return (
    <>
      {data.map((el: any) => (
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
          <td className="px-6 py-4">{el.branch.name}</td>
          <td className="px-6 py-4">{el.assigned ? 'Assigned' : 'Not Assigned'}</td>
          <td className="px-6 py-4">
            {new Date(el.created_at).toLocaleString()}
          </td>
          <td className="px-6 py-4 flex items-center gap-3">
            <Link passHref href={`/${userRole}/devices/assign/?id=${el.id}`}>
              <FaEdit
                title="Manage Patients"
                className="hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-admin-primary hover:doctor:text-theme-doctor-primary hover:nurse:text-theme-nurse-primary cursor-pointer"
              />
            </Link>
            {(el.cardiac_monitoring === 'No' || el.cardiac_monitoring === 'Later') && (
              <button
                onClick={async () => {
                  try {
                    const res = await updateDevice(
                      btoa(
                        JSON.stringify({
                          ...el,
                          cardiac_monitoring: 'Yes',
                        })
                      ),
                      el.id
                    );
                    if (res.success) {
                      dispatch(showModalReducer({
                        type: 'SUCCESS',
                        message: 'Sync successful or The device successfully added.',
                        show: true,
                      }));
                      window.location.reload();
                    } else {
                      dispatch(showModalReducer({
                        type: 'ERROR',
                        message: 'Sync failed. Please check the connection.',
                        show: true,
                      }));
                    }
                  } catch (err) {
                    dispatch(showModalReducer({
                      type: 'ERROR',
                      message: 'Sync failed. Please check the connection.',
                      show: true,
                    }));
                  }
                }}
                title="Add to Vivalink"
                className="hover:text-blue-600 transition-colors"
              >
                <MdSync className="w-5 h-5" />
              </button>
            )}
          </td>
        </tr>
      ))}
    </>
  );
};

export default RenderTable;
