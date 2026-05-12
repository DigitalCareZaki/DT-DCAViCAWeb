'use client';

import { useEffect, useState } from 'react';

import { ClientGenerator, ClientTable } from '@common';
import Row from './Row';

import type { EmailsHistoryProps, ClientComponentProps } from '@types';
import type { TableProps } from './types';

const Table: ClientComponentProps<any> = ({ data }) => {
  const [sms, setSms] = useState<any>([]);

  useEffect(() => {
    if (!data) return;
    setSms(data);
  }, [data]);

  return (
    <div className="sms-history-table-wrapper relative mt-4 overflow-x-auto overflow-y-visible pb-2 shadow-md sm:rounded-lg">
      <ClientTable
        className="sms-history-table"
        heads={[
          'To',
          'Body',
          'Created At',
        ]}
      >
        <ClientGenerator data={sms ?? []}>
          <Row />
        </ClientGenerator>
      </ClientTable>
    </div>
  );
};
export default Table;
