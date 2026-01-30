'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ClientTable, ExportButton } from '@common';
import { setOrganizationUsersReducer } from '@slice';

import RenderTable from './RenderTable';

import type { ClientComponentProps, OrganizationUsersProps } from '@types';
import type { TableProps } from './types';

const Table: ClientComponentProps<TableProps> = ({ data }) => {
  const dispatch = useDispatch();

  const setData = (payload: { users: OrganizationUsersProps[] }) =>
    dispatch(setOrganizationUsersReducer(payload));

  useEffect(() => {
    setData({ users: data });
  }, [data]);

  return (
    <div className="flex w-full flex-col items-end gap-4 pb-28">
      <div className="w-fit">
        <ExportButton
          data={data?.map((el) => ({
            full_name: `${el?.first_name} ${el?.last_name}`,
            branch: el?.associated_branches[0]?.name,
            department: el?.doctor?.departments[0]?.title || el.patient?.doctors[0]?.departments[0]?.title,
            monitoring: el.role === 'DOCTOR' ? el.doctor?.avicardia_monitoring : el.role === 'PATIENT' ? el.patient?.cardiac_monitoring : 'N/A',
            ...el,
          }))}
          headers={[
            { label: 'Name', key: 'full_name' },
            { label: 'Email', key: 'email' },
            { label: 'Department', key: 'department' },
            { label: 'Phone', key: 'phone_number' },
            { label: 'Role', key: 'role' },
            { label: 'Gender', key: 'gender' },
            { label: 'Branch', key: 'branch' },
            { label: 'Monitoring', key: 'monitoring' },
          ]}
          filename="User Data"
        />
      </div>
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <ClientTable
          heads={[
            'Name',
            'Email',
            'Department',
            'Phone',
            // 'Username',
            'Role',
            'Gender',
            'Branch',
            'Monitoring',
            'Sync',
            'Status',
          ]}
        >
          <RenderTable />
        </ClientTable>
      </div>
    </div>
  );
};

export default Table;
