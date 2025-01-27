'use client';

import { useEffect, useState } from 'react';
import { ClientGenerator, ClientTable } from '@common';
import Row from './Row';

import type { ClientComponentProps, MasterOrganizationProps } from '@types';
import type { TableProps } from './types';

const Table: ClientComponentProps<TableProps> = ({ data }) => {
  const [organizations, setOrganizations] =
    useState<MasterOrganizationProps[]>(data);

  useEffect(() => {
    setOrganizations(data);
  }, [data]);

  return (
    <div className="relative mt-10 overflow-x-hidden overflow-y-hidden shadow-md sm:rounded-lg">
      <ClientTable
        heads={[
          'logo',
          'Name',
          'Email',
          'Phone Number',
          'Website',
          'Address',
          'City',
          'Country',
          'Created On',
        ]}
      >
        <ClientGenerator data={organizations}>
          <Row />
        </ClientGenerator>
      </ClientTable>
    </div>
  );
};

export default Table;
