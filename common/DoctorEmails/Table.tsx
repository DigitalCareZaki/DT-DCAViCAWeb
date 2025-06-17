'use client';

import { useEffect, useState } from 'react';

import { ClientGenerator, ClientTable } from '@common';
import Row from './Row';

import type { EmailsHistoryProps, ClientComponentProps } from '@types';
import type { TableProps } from './types';

const Table: ClientComponentProps<TableProps> = ({ data }) => {
  const [emails, setEmails] = useState<EmailsHistoryProps[]>([]);

  useEffect(() => {
    if (!data) return;
    setEmails(data);
  }, [data]);

  return (
    <div className="relative mt-10 overflow-x-hidden overflow-y-hidden shadow-md sm:rounded-lg">
      <ClientTable
        heads={[
          'Profile',
          'Name',
          'Email',
          'Subject',
          'Sent',
          'Error',
          'Created On',
        ]}
      >
        <ClientGenerator data={emails ?? []}>
          <Row />
        </ClientGenerator>
      </ClientTable>
    </div>
  );
};
export default Table;
