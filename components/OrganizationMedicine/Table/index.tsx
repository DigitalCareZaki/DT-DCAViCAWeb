'use server';

import { ServerTable } from '@common';

import RenderTable from './RenderTable';

import type { ServerComponentProps } from '@types';
import type { TableProps } from './types';

const Table: ServerComponentProps<TableProps> = async ({ data }) => {
  return (
    <div className="relative mt-10 overflow-x-auto shadow-md sm:rounded-lg">
      <ServerTable heads={['Name', 'Created On']}>
        <RenderTable data={data} />
      </ServerTable>
    </div>
  );
};

export default Table;
