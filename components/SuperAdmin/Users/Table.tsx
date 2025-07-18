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
          data={data.map((el) => ({
            full_name: `${el.first_name} ${el.last_name}`,
            branch: el.associated_branches[0].name,
            ...el,
          }))}
          headers={[
            {
              label: 'Name',
              key: 'full_name',
            },
            {
              label: 'Username',
              key: 'username',
            },
            {
              label: 'Email',
              key: 'email',
            },
            {
              label: 'Phone',
              key: 'phone_number',
            },
            {
              label: 'Role',
              key: 'role',
            },
            {
              label: 'Gender',
              key: 'gender',
            },
            {
              label: 'Branch',
              key: 'branch',
            },
          ]}
          filename="User Data"
        />
      </div>
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <ClientTable
          heads={[
            'Name',
            'Email',
            'Phone',
            'Username',
            'Role',
            'Gender',
            'Branch',
            'Action',
          ]}
        >
          <RenderTable />
        </ClientTable>
      </div>
    </div>
  );
};

export default Table;
