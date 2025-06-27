'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ClientTable } from '@common';
import { setPatientDoctorListReducer } from '@slice';

import RenderTable from './RenderTable';

import type { TableProps } from './types';
import type { ClientComponentProps, PatientDoctorsProps } from '@types';

const Table: ClientComponentProps<TableProps> = ({ data }) => {
  const dispatch = useDispatch();

  const setData = (data: PatientDoctorsProps[]) =>
    dispatch(
      setPatientDoctorListReducer({
        doctors: data,
      })
    );

  useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">
      <ClientTable
        // heads={['Name', 'Speciality', 'Department', 'Email', 'Phone']}
        heads={['Name', 'Specialty', 'Email', 'Phone',
          // 'Action'
        ]}
      >
        <RenderTable />
      </ClientTable>
    </div>
  );
};

export default Table;
