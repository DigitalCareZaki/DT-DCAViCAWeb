'use client';

import { ClientTable } from '@common';

import RenderTable from './RenderTable';

import type { ClientComponentProps } from '@types';
import type { Props } from './types';

const Table: ClientComponentProps<Props> = ({ data }) => {
  return (
    <div className="relative mt-4 overflow-x-auto pb-28 shadow-md sm:rounded-lg">
      <ClientTable
        heads={[
          'Title',
          'Description',
          'Category',
          'Priority',
          'Video',
          'Created By',
          'Created At',
        ]}
      >
        <RenderTable data={data || []} />
      </ClientTable>
    </div>
  );
};

export default Table;
