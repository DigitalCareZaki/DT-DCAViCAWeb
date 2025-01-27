'use client';

import { useEffect, useState } from 'react';
import { ClientGenerator, ClientTable } from '@common';
import Row from './Row';

import type { ClientComponentProps, GetSuperAdminProps } from '@types';
import type { TableProps } from './types';

const Table: ClientComponentProps<TableProps> = ({ data }) => {
  const [superadminds, setSuperadmins] = useState<GetSuperAdminProps[]>(
    data ?? []
  );

  useEffect(() => {
    if (!data) return;
    setSuperadmins(data);
  }, [data]);

  return (
    <div className="relative mt-10 overflow-x-hidden overflow-y-hidden shadow-md sm:rounded-lg">
      <ClientTable
        heads={[
          'Profile',
          'First Name',
          'Last Name',
          'Middle Name',
          'Email',
          'Phone Number',
          'Username',
          'Organization',
          'City',
          'Created On',
        ]}
      >
        <ClientGenerator data={superadminds}>
          <Row />
        </ClientGenerator>
      </ClientTable>
    </div>
  );
};

export default Table;
