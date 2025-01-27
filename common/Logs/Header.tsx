'use client';

import { ExportButton } from '@common';
import Filters from './Filters';

import type { ClientComponentProps } from '@types';
import type { LogsDataProps } from '@types';

const Header: ClientComponentProps<{ data: LogsDataProps[] }> = ({ data }) => {
  return (
    <div className="mt-8 flex w-full items-center justify-end gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <ExportButton
        data={data.map((el) => ({
          name: `${el.user.first_name} ${el.user.last_name}`,
          role: el.user.role,
          email: el.user.email,
          method: el.method,
          module: el.module,
          platform: el.platform,
          createdOn: new Date(el.created_at).toISOString(),
        }))}
        headers={[
          {
            label: 'Name',
            key: 'name',
          },
          {
            label: 'Role',
            key: 'role',
          },
          {
            label: 'Email',
            key: 'email',
          },
          {
            label: 'Method',
            key: 'method',
          },
          {
            label: 'Module',
            key: 'module',
          },
          {
            label: 'Platform',
            key: 'platform',
          },
          {
            label: 'Created On',
            key: 'createdOn',
          },
        ]}
        filename="Log Data"
      />
      <Filters />
    </div>
  );
};

export default Header;
