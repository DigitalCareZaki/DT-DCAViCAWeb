'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ClientTable } from '@common';
import { setDepartmentsReducer } from '@slice';

import RenderTable from './RenderTable';

import type { ClientComponentProps } from '@types';
import type { TableProps } from './types';

const Table: ClientComponentProps<TableProps> = ({ data }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;

    dispatch(setDepartmentsReducer({ data }));
  }, [data]);

  return (
    <div className="relative mt-10 overflow-x-auto pb-28 shadow-md sm:rounded-lg">
      <ClientTable
        heads={[
          'Title',
          'Description',
          // 'Address',
          // 'Country',
          // 'City',
          'Branch',
          'Doctors',
          'Nurses',
          'Created On',
        ]}
      >
        <RenderTable />
      </ClientTable>
    </div>
  );
};

export default Table;
