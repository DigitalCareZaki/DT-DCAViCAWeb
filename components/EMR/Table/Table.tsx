'use client';

import { useSelector } from 'react-redux';
import { ClientGenerator, ClientTable } from '@common';

import Record from './Record';

import type { ClientComponent } from '@types';
import type { ReduxProps, StoreEMRState } from '@store-types';

const Table: ClientComponent = () => {
  const { records } = useSelector<ReduxProps, StoreEMRState>(
    (state) => state.emr
  );

  console.log('records: ', records);

  return (
    <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">
      <ClientTable
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
      </ClientTable>
    </div>
  );
};

export default Table;
