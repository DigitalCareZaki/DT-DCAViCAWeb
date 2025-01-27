'use client';

import { useDispatch } from 'react-redux';

import { ClientTable } from '@common';
import { setBranchesReducer } from '@slice';
import RenderTable from './RenderTable';

import type { ClientComponentProps, BranchesDataProps } from '@types';
import type { TableProps } from './types';
import { useEffect } from 'react';

const Table: ClientComponentProps<TableProps> = ({ data }) => {
  const dispatch = useDispatch();

  const setData = (branches: BranchesDataProps[]) =>
    dispatch(setBranchesReducer({ branches }));

  useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <div className="relative overflow-x-auto pb-28 shadow-md sm:rounded-lg">
      <ClientTable
        heads={[
          'Name',
          'Email',
          'Phone Number',
          'Location',
          'Created By',
          'Action',
        ]}
      >
        <RenderTable />
      </ClientTable>
    </div>
  );
};

export default Table;
