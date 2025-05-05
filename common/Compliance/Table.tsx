'use client';

import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { SetComplianceReducer } from '@slice';
import { getCompliancePerPill } from '@service';

import { CircleSpinner } from 'react-spinners-kit';

import RenderTable from './RenderTable';

import { ClientTable } from '@common';

import type { ComplianceRenderProps } from './types';
import type { ClientComponentProps } from '@types';

const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <CircleSpinner size={20} color="#000" />
    </div>
  );
};

const Table: ClientComponentProps<ComplianceRenderProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string>('');

  const dispatch = useDispatch();

  const setPatient = useCallback(
    async (id: string) => {
      try {
        if (id === selectedPatient) return;

        setLoading(true);

        const res = await getCompliancePerPill(id);

        if (res.success) {
          dispatch(
            SetComplianceReducer({
              data: res.data,
            })
          );
          setSelectedPatient(id);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    },
    [selectedPatient]
  );

  return (
    <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">
      {loading ? (
        <Loading />
      ) : (
        <ClientTable heads={['Patient Name', 'Patient Email', 'PHR']}>
          <RenderTable
            data={data}
            selectedPatient={selectedPatient}
            setData={setPatient}
          />
        </ClientTable>
      )}
    </div>
  );
};

export default Table;
