import { ServerTable } from '@common';

import RenderTable from './RenderTable';

import type { ServerComponentProps } from '@types';
import type { Props } from './types';

const Table: ServerComponentProps<Props> = async ({ userRole, data }) => {
  return (
    <div className="relative mt-10 overflow-x-auto pb-28 shadow-md sm:rounded-lg">
      <ServerTable
        heads={[
          'Title',
          'Serial',
          'Category',
          'Created By',
          'Status',
          'Created At',
          'Action',
        ]}
      >
        <RenderTable userRole={userRole} data={data} />
      </ServerTable>
    </div>
  );
};

export default Table;
