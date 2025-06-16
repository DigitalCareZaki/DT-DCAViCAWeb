'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setNotificationsReducer, setNotificationsReadReducer } from '@slice';
import { ClientTable } from '@common';

import RenderTable from './RenderTable';

import type { ClientComponentProps } from '@types';
import type { TableProps } from './types';

const Table: ClientComponentProps<TableProps> = ({ data }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;

    // Dispatch actions to set the notifications and mark them as read
    dispatch(setNotificationsReducer({ data }));
    dispatch(setNotificationsReadReducer());
  }, [data, dispatch]);

  return (
    <div className="relative mt-10 overflow-x-auto shadow-md sm:rounded-lg">
      {/* ClientTable is the wrapper for rendering the table */}
      <ClientTable
        heads={[
          'Profile',
          'Name',
          'Role',
          'Email',
          'Notification title',
          // 'Description',
          'Created On',
        ]}
      >
        {/* Pass the dynamic data to RenderTable */}
        <RenderTable />
      </ClientTable>
    </div>
  );
};

export default Table;
