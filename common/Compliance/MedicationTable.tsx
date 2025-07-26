'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { twMerge } from 'tailwind-merge';

import { SetSelectedComplianceMedicineReducer } from '@slice';

import { ClientTable } from '@common';

import type { ClientComponent } from '@types';
import { PatientCompliance, PatientCompliancePerPill } from '@types';
import type { ReduxProps, StoreComplianceState } from '@store-types';

type MedicationWithComplianceDates = {
  id: string;
  name: string;
  compliance: PatientCompliance;
  created_at?: string;
  startDate: string;
  endDate: string;
};

// Helper function to extract start and end dates from compliance data
const getComplianceDateRange = (compliance: PatientCompliance): { startDate: string; endDate: string } => {
  const dates = Object.keys(compliance).sort();

  if (dates.length === 0) {
    return { startDate: '-', endDate: '-' };
  }

  const startDate = dates[0];
  const endDate = dates[dates.length - 1];

  return {
    startDate: new Date(startDate).toLocaleDateString(),
    endDate: new Date(endDate).toLocaleDateString(),
  };
};

const RenderTable = ({
  medications,
  selected,
  setMed,
}: {
  medications: MedicationWithComplianceDates[];
  selected: string;
  setMed: (id: string, data: PatientCompliance) => void;
}) =>
  medications.map((el) => (
    <tr
      key={el.id}
      className={twMerge(
        'cursor-pointer border-b odd:bg-white even:bg-gray-50 hover:bg-gray-200',
        selected === el.id ? 'bg-blue-400' : ''
      )}
      onClick={() => setMed(el.id, el.compliance)}
    >
      <th
        scope="row"
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
      >
        {el.name}
      </th>
      <td className="whitespace-nowrap px-6 py-4 text-gray-900">
        {el.startDate}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-gray-900">
        {el.endDate}
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-gray-900">
        {el.created_at ? new Date(el.created_at).toLocaleString() : '-'}
      </td>

    </tr>
  ));

const MedicationTable: ClientComponent = () => {
  const { data, selected } = useSelector<ReduxProps, StoreComplianceState>(
    (state) => state.compliance
  );
  const [medications, setMedications] = useState<MedicationWithComplianceDates[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');

  const dispatch = useDispatch();

  const setMed = useCallback((id: string, data: PatientCompliance) => {
    dispatch(
      SetSelectedComplianceMedicineReducer({
        data: {
          id,
          data,
        },
      })
    );
  }, []);

  useEffect(() => {
    // Map medications to include created_at and start/end dates from compliance data
    setMedications(
      data.medications.map((med: any) => {
        const { startDate, endDate } = getComplianceDateRange(med.compliance);
        return {
          ...med,
          created_at: med.created_at,
          startDate,
          endDate,
        };
      })
    );
  }, [data.user.id]);

  useEffect(() => {
    setSelectedId(selected.id ?? '');
  }, [selected.id]);

  return (
    <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">
      <ClientTable heads={['Medication Name', 'Start Date', 'End Date', 'Created At']}>
        <RenderTable
          medications={medications}
          setMed={setMed}
          selected={selectedId ?? ''}
        />
      </ClientTable>
    </div>
  );
};

export default MedicationTable;
