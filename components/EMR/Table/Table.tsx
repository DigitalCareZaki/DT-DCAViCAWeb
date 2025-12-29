'use client';

import { useSelector } from 'react-redux';
import { ClientGenerator, ClientTable } from '@common';

import Record from './Record';
import { usePathname } from 'next/navigation'
import type { ClientComponent } from '@types';
import type { ReduxProps, StoreEMRState } from '@store-types';

const Table: ClientComponent = () => {

  const pathname = usePathname()

  const { records, searchTerm } = useSelector<ReduxProps, StoreEMRState>((state) => state.emr);

  const filteredRecords = records.filter((record) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const titleMatch = record.title?.toLowerCase().includes(term);
    const descMatch = record.description?.toLowerCase().includes(term);
    const typeMatch = record.type?.toLowerCase().includes(term);
    return titleMatch || descMatch || typeMatch;
  });

  return (
    <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">
      <ClientTable
        heads={[
          '',
          'Title',
          'Description',
          'Report Type',
          'Created At',
          'Actions',
        ]}
      >
        <ClientGenerator data={filteredRecords}>
          <Record />
        </ClientGenerator>
      </ClientTable>
      {/* <table className="min-w-full text-sm text-left text-gray-500">
        <thead className="bg-red-500 text-xs uppercase text-white">
          <tr>
            {showPatientNameColumn && <th className="px-6 py-3">Patient Name</th>}
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Started</th>
            <th className="px-6 py-3">Ended</th>
            <th className="px-6 py-3">Created By</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <Record
              key={index}
              showPatientNameColumn={showPatientNameColumn}
              {...record}
            />
          ))}
        </tbody>
      </table> */}
      {/* <ClientTable
        heads={[
          '',
          'Title',
          'Description',
          'Started',
          'Ended',
          'Created by',
          'Actions',
        ]}
      >
        <ClientGenerator data={records}>
          <Record />
        </ClientGenerator>
      </ClientTable> */}
    </div>
  );
};

export default Table;
