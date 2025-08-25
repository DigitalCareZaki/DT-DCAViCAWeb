'use client';

import { useDispatch, useSelector } from 'react-redux';

import { FaEdit } from '@react-icons/all-files/fa/FaEdit';
import { FaUserNurse } from '@react-icons/all-files/fa/FaUserNurse';
import { FaShieldAlt } from '@react-icons/all-files/fa/FaShieldAlt';

import { disableUser } from '@service';
import { showModalReducer, updateUserStatusReducer } from '@slice';

import { getName } from '@init-globals';

import type { ClientComponentProps } from '@types';
import type { RenderTableProps } from './types';
import type { ReduxProps, StoreSuperAdminState } from '@store-types';
import { useState } from 'react';
import { CircleSpinner } from 'react-spinners-kit';

const RenderTable: ClientComponentProps<RenderTableProps> = () => {
  const dispatch = useDispatch();
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<{ id: string; active: boolean; name: string } | null>(null);

  const { users } = useSelector<ReduxProps, StoreSuperAdminState>(
    (state) => state.superadmin
  );

  console.log('users >>>>>>>>>>> ', users);

  const handleDisable = async (id: string) => {
    try {
      if (loadingUserId === id) return;

      setLoadingUserId(id);
      const res = await disableUser(id);

      if (res?.success) {
        // Update the user status in Redux store
        dispatch(
          updateUserStatusReducer({
            userId: id,
            active: res.active,
          })
        );

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
    } finally {
      setLoadingUserId(null);
    }
  };

  const handleConfirmationClick = (user: any) => {
    setSelectedUser({
      id: user.id,
      active: user.active,
      name: getName({
        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name,
      })
    });
    setShowConfirmation(true);
  };

  const handleConfirmAction = async () => {
    if (selectedUser) {
      await handleDisable(selectedUser.id);
      // Close modal and reset state after successful action
      setShowConfirmation(false);
      setSelectedUser(null);
    }
  };

  const handleCancelAction = () => {
    setShowConfirmation(false);
    setSelectedUser(null);
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
            {loadingUserId === el.id ? (
              <CircleSpinner size={20} color="#000000" />
            ) : (
              <FaShieldAlt
                onClick={() => handleConfirmationClick(el)}
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

      {/* Confirmation Modal */}
      {showConfirmation && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedUser.active ? 'Deactivate User' : 'Activate User'}
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedUser.active
                  ? `Do you want to deactivate user "${selectedUser.name}"?`
                  : `Do you want to activate user "${selectedUser.name}"?`
                }
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleCancelAction}
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAction}
                  className={`px-4 py-2 text-white rounded-lg transition-colors ${selectedUser.active
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                    }`}
                >
                  {selectedUser.active ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RenderTable;
