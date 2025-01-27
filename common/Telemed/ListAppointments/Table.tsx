'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ClientTable } from '@common';
import { setAppointmentsListReducer } from '@slice';

import RenderTable from './RenderTable';

import type { ClientComponentProps, AppointmentProps } from '@types';
import type { TableProps } from './types';

const Table: ClientComponentProps<TableProps> = ({ appointments }) => {
  const dispatch = useDispatch();

  const setAppointments = (appointments: AppointmentProps[]) => {
    return dispatch(setAppointmentsListReducer({ appointments }));
  };

  useEffect(() => {
    setAppointments(appointments);
  }, [appointments]);

  return (
    <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">
      <ClientTable
        heads={[
          '',
          'Title',
          'Patient Name',
          'Scheduled at',
          'Status',
          'Type',
          'End at',
          'Details',
          'Actions',
        ]}
      >
        <RenderTable />
      </ClientTable>
    </div>
  );
};

export default Table;
