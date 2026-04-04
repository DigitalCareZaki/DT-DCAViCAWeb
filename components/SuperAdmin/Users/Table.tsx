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
            site:
              el?.role === 'DOCTOR'
                ? el?.doctor?.site?.name ?? el?.doctor?.site?.title
                : el?.role === 'NURSE'
                  ? el?.nurse?.site?.name ?? el?.nurse?.site?.title
                  : el?.role === 'PATIENT'
                    ? el?.patient?.site?.name ?? el?.patient?.site?.title
                    : 'N/A',
            department:
              el?.role === 'DOCTOR'
                ? el?.doctor?.departments?.[0]?.title
                : el?.role === 'NURSE'
                  ? el?.nurse?.departments?.[0]?.title
                  : el?.role === 'PATIENT'
                    ? el?.patient?.doctors?.[0]?.departments?.[0]?.title
                    : 'N/A',
            monitoring:
              el?.role === 'DOCTOR'
                ? el?.doctor?.avicardia_monitoring
                : el?.role === 'PATIENT'
                  ? el?.patient?.cardiac_monitoring
                  : 'N/A',
            ...el,
          }))}
          headers={[
            { label: 'Name', key: 'full_name' },
            { label: 'Email', key: 'email' },
            { label: 'Department', key: 'department' },
            { label: 'Phone', key: 'phone_number' },
            { label: 'Role', key: 'role' },
            { label: 'Username', key: 'username' },
            { label: 'Gender', key: 'gender' },
            { label: 'Branch', key: 'branch' },
            { label: 'Site', key: 'site' },
            { label: 'Monitoring', key: 'monitoring' },
          ]}
          filename="User Data"
        />
      </div>
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <ClientTable
          className="mb-24"
          heads={[
            'Name',
            'Email',
            'Department',
            'Phone',
            'Username',
            'Role',
            'Gender',
            'Branch',
            'Site',
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
