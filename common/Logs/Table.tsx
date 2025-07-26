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
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="min-w-full shadow-md sm:rounded-lg">
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
      </div>
    </div>
  );
};

export default Table;