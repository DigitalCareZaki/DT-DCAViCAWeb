'use client';

import { useSelector } from 'react-redux';
import { ClientGenerator, ClientTable } from '@common';

import Record from './Record';
import { usePathname } from 'next/navigation'
import type { ClientComponent } from '@types';
import type { ReduxProps, StoreContactState } from '@store-types';

const Table: ClientComponent = () => {

  const pathname = usePathname()
  console.log('pathName >>', pathname);

  const { contacts } = useSelector<ReduxProps, StoreContactState>((state) => state.contacts);

  return (
    <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">
      <ClientTable
        heads={[
          '',
          'Name',
          'Email',
          'Number',
          'Relation Ship',
          'Created by'
        ]}
      >
        <ClientGenerator data={contacts}>
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
