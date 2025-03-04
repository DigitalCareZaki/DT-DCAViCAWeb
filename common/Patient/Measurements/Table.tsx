'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ClientTable } from '@common';
import { setPatientMeasurementListingReducer } from '@slice';

import RenderTable from './RenderTable';

import type { TableProps } from './types';
import type { ClientComponentProps, PatientMeasurementProps } from '@types';

const Table: ClientComponentProps<TableProps> = ({ data, user }) => {
  const dispatch = useDispatch();

  console.log('data  Table ClientComponentProps>>', data);

  const setData = (measurements: PatientMeasurementProps[]) =>
    dispatch(setPatientMeasurementListingReducer({ measurements }));

  useEffect(() => {
    setData(data);
  }, [data]);


  return (
    <>
      <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">
        <ClientTable
          heads={[
            'Title',
            'Date',
            'Time',
            'Measurement Type',
            'Status',
            'Update',
            'Log',
            'Mode',
            'Values',
            'Unit',
            'Source',
            'Patient',
            'Created By',
          ]}
        >
          <RenderTable user={user} />
        </ClientTable>
      </div>


    </>
  );
};

export default Table;
