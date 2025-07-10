'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { twMerge } from 'tailwind-merge';

import { SetSelectedComplianceMedicineReducer } from '@slice';

import { ClientTable } from '@common';

import type { ClientComponent } from '@types';
import { PatientCompliance, PatientCompliancePerPill } from '@types';
import type { ReduxProps, StoreComplianceState } from '@store-types';

type MedicationWithCreatedAt = {
  id: string;
  name: string;
  compliance: PatientCompliance;
  created_at?: string;
};

const RenderTable = ({
  medications,
  selected,
  setMed,
}: {
  medications: MedicationWithCreatedAt[];
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
        {el.created_at ? new Date(el.created_at).toLocaleDateString() : '-'}
      </td>
    </tr>
  ));

const MedicationTable: ClientComponent = () => {
  const { data, selected } = useSelector<ReduxProps, StoreComplianceState>(
    (state) => state.compliance
  );
  const [medications, setMedications] = useState<MedicationWithCreatedAt[]>([]);
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
    // Map medications to include created_at if available from PatientMedicationProps

    console.log('check >>>', data);
    setMedications(
      data.medications.map((med: any) => ({
        ...med,
        created_at: med.created_at,
      }))
    );
  }, [data.user.id]);

  useEffect(() => {
    setSelectedId(selected.id ?? '');
  }, [selected.id]);


  return (
    <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">
      <ClientTable heads={['Medication Name', 'Created At']}>
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
