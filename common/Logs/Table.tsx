'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ClientTable } from '@common';
import { setLogsReducer } from '@slice';

import RenderTable from './RenderTable';

import type { ClientComponentProps } from '@types';
import type { TableProps } from './types';

const Table: ClientComponentProps<TableProps> = ({ data }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;

    dispatch(setLogsReducer({ data }));
  }, [data, dispatch]);

  return (
    <div className="relative mt-10 overflow-x-auto shadow-md sm:rounded-lg">
      <ClientTable
        heads={[
          'Profile',
          'Name',
          'Role',
          'Email',
          'Method',
          'Module',
          'Platform',
          'Endpoint',
          'Created On',
        ]}
      >
        <RenderTable />
      </ClientTable>
    </div>
  );
};

export default Table;
