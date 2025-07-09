'use client';

import { useDispatch } from 'react-redux';

import { ClientTable } from '@common';
import { setPatientMedicationListingReduer } from '@slice';

import RenderTable from './RenderTable';

import type { ClientComponentProps, PatientMedicationProps } from '@types';
import type { TableProps } from './types';
import { useEffect } from 'react';

const MedicationTable: ClientComponentProps<TableProps> = ({ data }) => {
  const dispatch = useDispatch();

  const setData = (medications: PatientMedicationProps[]) =>
    dispatch(setPatientMedicationListingReduer({ medications }));

  useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">
      <ClientTable
        heads={[
          'Name',
          'Start',
          'End',
          'Time',
          'Frequency',
          'Dosage',
          'Unit',
          'Prescribed By',
          'Created',
          // 'Action',
        ]}
      >
        <RenderTable />
      </ClientTable>
    </div>
  );
};

export default MedicationTable;
