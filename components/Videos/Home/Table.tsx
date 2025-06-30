import { ServerTable } from '@common';

import RenderTable from './RenderTable';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const Table: ServerComponentProps<Props> = async ({ data }) => {
  return (
    <div className="relative mt-10 overflow-x-auto pb-28 shadow-md sm:rounded-lg">
      <ServerTable
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
      </ServerTable>
    </div>
  );
};

export default Table;
