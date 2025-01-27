'use client';

import { ClientTable } from '@common';

import RenderTable from './RenderTable';

import type { TableProps } from './types';
import type { ClientComponentProps } from '@types';

const Table: ClientComponentProps<TableProps> = ({ data }) => {
  return (
    <div className="relative overflow-x-auto pb-12 shadow-md sm:rounded-lg">
      <ClientTable
        heads={[
          'Name',
          'Start Date',
          'End Date',
          'Time',
          'Dosage',
          'Frequency',
          'Status',
          'Created At',
        ]}
      >
        <RenderTable data={data} />
      </ClientTable>
    </div>
  );
};

export default Table;
