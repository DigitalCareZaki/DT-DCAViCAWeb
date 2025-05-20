'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ClientTable } from '@common';
import { setPatientNurseListingReducer } from '@slice';

import RenderTable from './RenderTable';

import type { TableProps } from './types';
import type { ClientComponentProps, PatientNursesProps } from '@types';

const Table: ClientComponentProps<TableProps> = ({ data }) => {
  const dispatch = useDispatch();

  const setData = (nurses: PatientNursesProps[]) =>
    dispatch(setPatientNurseListingReducer({ nurses }));

  useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">
      <ClientTable heads={['Name', 'Department', 'Email', 'Phone']}>
        <RenderTable />
      </ClientTable>
    </div>
  );
};

export default Table;
