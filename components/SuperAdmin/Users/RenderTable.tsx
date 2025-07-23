'use client';

import { useDispatch, useSelector } from 'react-redux';

import { FaEdit } from '@react-icons/all-files/fa/FaEdit';
import { FaUserNurse } from '@react-icons/all-files/fa/FaUserNurse';
import { FaShieldAlt } from '@react-icons/all-files/fa/FaShieldAlt';

import { disableUser } from '@service';
import { showModalReducer } from '@slice';

import { getName } from '@init-globals';

import type { ClientComponentProps } from '@types';
import type { RenderTableProps } from './types';
import type { ReduxProps, StoreSuperAdminState } from '@store-types';
import { useState } from 'react';
import { CircleSpinner } from 'react-spinners-kit';

const RenderTable: ClientComponentProps<RenderTableProps> = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const { users } = useSelector<ReduxProps, StoreSuperAdminState>(
    (state) => state.superadmin
  );

  console.log('users >>>>>>>>>>> ', users);

  const handleDisable = async (id: string) => {
    try {
      if (loading) return;

      const res = await disableUser(id);

      if (res?.success) {
        dispatch(
          showModalReducer({
            type: 'SUCCESS',
            message: `User ${res?.active ? 'activated' : 'deactivated'} successfully`,
            show: true,
          })
        );
        return;
      }

      dispatch(
        showModalReducer({
          type: 'ERROR',
          message: 'Cannot deactivate user',
          show: true,
        })
      );

    } catch (err) {
      dispatch(
        showModalReducer({
          type: 'ERROR',
          message: 'Something went wrong',
          show: true,
        })
      );
    }
  };

  return (
    <>
      {users.map((el) => (
        <tr
          key={el.id}
          className="cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200"
        >
          <th
            scope="row"
            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
          >           {getName({
            first_name: el.first_name,
            last_name: el.last_name,
            middle_name: el.middle_name,
          })}
          </th>
          <td className="px-6 py-4">{el.email}</td>
          <td className="px-6 py-4">
            {
              el.role === 'DOCTOR' ? el.doctor?.departments?.[0]?.title :
                el.role === 'NURSE' ? el.nurse?.department?.title :
                  el.role === 'PATIENT' ? el.patient?.doctors?.[0]?.departments?.[0]?.title : 'N/A'
            }</td>
          <td className="px-6 py-4">{el.phone_number}</td>
          {/* <td className="px-6 py-4">{el.username}</td> */}
          <td className="px-6 py-4">{el.role}</td>
          <td className="px-6 py-4">{el.gender}</td>
          <td className="px-6 py-4">{el.associated_branches[0]?.name}</td>
          <td className="flex items-center gap-2 px-6 py-4 text-md ">
            {loading ? (
              <CircleSpinner size={20} color="#000000" />
            ) : (
              <FaShieldAlt
                onClick={() => handleDisable(el.id)}
                title={el.active ? "Disable user account" : "Enable user account"}
                className={`${!el.active ? 'text-red-500' : 'text-green-500'} hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-admin-primary`}
              />
            )}
            {el.role === 'PATIENT' && (
              <>
                <FaEdit
                  title="Assign patient to a doctor"
                  className="hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-doctor-primary"
                />
                <FaUserNurse
                  title="Assign patient to a nurse"
                  className="hover:superadmin:text-theme-superadmin-primary hover:admin:text-theme-doctor-primary"
                />
              </>
            )}
          </td>
        </tr>
      ))}
    </>
  );
};

export default RenderTable;
